import React,{useState} from 'react';
import {Form,Container,Alert,Button,Badge,Spinner} from 'react-bootstrap'
import firebaseConfig from '../firebaseconfig';
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,updateProfile,GoogleAuthProvider,signInWithPopup   } from "firebase/auth";
import { getDatabase,set,ref } from "firebase/database";

import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const db  = getDatabase();
    let [username,setUsername]=useState("")
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let [cpassword,setCpassword]=useState("")
    let [err,setErr]=useState("")
    let [loading,setLoading]=useState(false)
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    let navigate = useNavigate();

   let handleUserChange = (e) =>{
    setUsername(e.target.value)
   }

   let handleEmailChange = (e) =>{
       setEmail(e.target.value)
   }
   let handlePasswordChange = (e) =>{
        setPassword(e.target.value)
   }
   let handleCpasswordChange = (e) =>{
        setCpassword(e.target.value)
   }

   let handleSubmit = (e)=>{
        e.preventDefault()

        if(!username || !email || !password || !cpassword){
            setErr("Please Fill The All Field")
        }else if (password.length < 8 || cpassword.length < 8){
            setErr("Password Must Be Greater Than 8 Characters")
        }else if(password !== cpassword){
            setErr("Password Not Match")

        }else{
            setLoading(true)
            
            createUserWithEmailAndPassword(auth, email, password).then((user)=>{
               

                updateProfile(auth.currentUser, {

                    
                    displayName: username, 
                    photoURL: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"

                  }).then(()=>{
                    set(ref(db, 'users/'+user.user.uid), {
                        username: username,
                        email: email,
                        img: user.user.photoURL,
                        id: user.user.uid
                        
                    })
                  }).then(() => {
                    
                    setUsername("")
                    setEmail("")
                    setPassword("")
                    setCpassword("")
                    setErr("")
                    setLoading(false)
                    navigate("/login",{state:"account Created Successfully. Please Login to Continue"})
                    const email = user.user;
                    sendEmailVerification(email)
                  }).catch((error) => {
                    const errorCode = error.code;
                    if(errorCode.includes("auth/email-already-in-use")){
                        setErr("Email Already In USe")
                    }
                  });
                 
                
            }).catch(error=>{
                const errorCode = error.code;
                if(errorCode.includes("auth/email-already-in-use")){
                    setErr("Email Already In USe")
                }
            })
        }

   }

   let handelGoogleSignIn = (e) => {
        e.preventDefault()
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(error)
            });
   }

  return(
  <Container>

      <Alert className='mt-5 mb-5' variant="primary">
        <h3 className='text-center'>Registration For MERN ADDA</h3>
    </Alert>
    
    <Form>
        <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control onChange={handleUserChange} type="text" placeholder="Write Your Full Name" value={username}/>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control  onChange={handleEmailChange} type="email" placeholder="Write Your E-mail" value={email}/>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control style={err.includes("Password") ? errmsg : errmsg2} onChange={handlePasswordChange} type="password" placeholder="Password" value={password}/>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control style={err.includes("Match") ? errmsg : errmsg2}  onChange={handleCpasswordChange} type="password" placeholder="Confirm Password" value={cpassword}/>
        </Form.Group>
        {err?
            <Alert variant="danger">
                <h4>{err}</h4>
            </Alert>
        :
            ""
        }
        
        <Button onClick={handleSubmit} type="submit" variant="info">
            {loading
             ?
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
             :
        
                 " Sign Up"
             }
        </Button >
        <Button onClick={handelGoogleSignIn} className='ms-4' type="submit" variant="success">Google Sign In</Button>
        <br/>
        <div className='text-center mt-3'>
        <Form.Text id="passwordHelpBlock" muted>
            Already Have an Account? <Badge bg="dark"><Link className='text-white' to="/login">Login</Link></Badge> 
        </Form.Text>
        </div>
     
    </Form>
  </Container>
  )
};

let errmsg = {
    border: "1px solid red"
}
let errmsg2 = {
    borderSize: "1px"
}

export default Registration;
