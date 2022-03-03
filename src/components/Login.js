import React,{useState} from 'react';
import {Form,Container,Alert,Button,Badge,Spinner,Modal} from 'react-bootstrap'
import firebaseConfig from '../firebaseconfig';
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail  } from "firebase/auth";
import { Link,useLocation,useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = (props) => {

    const state = useLocation();
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let [err,setErr]=useState("")
    let [passerr,setPasserr]=useState("")
    let [resetpas,setResetpas]=useState("")
    let [loading,setLoading]=useState(false)
    const [show, setShow] = useState(false);


    let navigate = useNavigate();
    const auth = getAuth();
    const notify = () => toast(state.state);
    if(state.state){
        notify()
        state.state=""
    }
   let handleEmailChange = (e) =>{
       setEmail(e.target.value)
   }
   let handlePasswordChange = (e) =>{
        setPassword(e.target.value)
   }


   let handleSubmit = (e)=>{
        e.preventDefault()

        if(!email || !password){
            setErr("Please Fill The All Field")
        }else if (password.length < 8){
            setErr("Password Must Be Greater Than 8 Characters")
        }else{
            setLoading(true)
            
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                setLoading(false)
                navigate("/",)
              })
              .catch((error) => {
                console.log(error.code)
              });
        }

   }

   let handlePasswordReset = (e)=>{
        setResetpas(e.target.value)
   }

   const handleCloseButton=()=>{

          setShow(false)
   }

   const handleClose = () => {
       if(resetpas){
        sendPasswordResetEmail(auth, resetpas)
        .then(() => {
            console.log("Geci")
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        });
    }else{
        setPasserr("Please Enter An Email")
    }
    };
  const handleShow = () => setShow(true);


  return (
    <Container>
      <ToastContainer />
    <Alert className='mt-5 mb-5' variant="primary">
      <h3 className='text-center'>Login For MERN ADDA</h3>
      
  </Alert>
  <Form>
      <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control  onChange={handleEmailChange} type="email" placeholder="Write Your E-mail" value={email}/>
      </Form.Group>
      <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control style={err.includes("Password") ? errmsg : errmsg2} onChange={handlePasswordChange} type="password" placeholder="Password" value={password}/>
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
        
                 " Sign In"
             }   
          
          
     </Button>
      <br/>
      <div className='text-center mt-3'>
      <Form.Text id="passwordHelpBlock" muted>
          Don't Have an Account? <Badge bg="dark"><Link className='text-white' to="/registration">Registration</Link></Badge> 
      </Form.Text>
      </div>
   
  </Form>
  

  <Button variant="danger" onClick={handleShow}>
  Forgot Password
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control onChange={handlePasswordReset}  type="email" placeholder="Write Your Email" />
            </Form.Group>
            </Form>
            {passerr
            ?
            <Alert variant="danger" className='mt-5 text-center'>
                {passerr}
            </Alert>
            :
            ""
            }
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseButton}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
</Container>
  );
};
let errmsg = {
    border: "1px solid red"
}
let errmsg2 = {
    borderSize: "1px"
}
export default Login;
