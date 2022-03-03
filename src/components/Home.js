import React,{useState} from 'react';
import { getAuth, onAuthStateChanged,signOut  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap'
import Leftside from './Leftside';
import Rightside from './Rightside';
import Middle from './Middle';

const Home = () => {


  const [email,setEmail]=useState(false)
  const [username,setUsername]=useState("")
  const [url,setUrl]=useState("")
  const [id,setId]=useState("")
  const [creationTime,setCreationTime]=useState("")
    const auth = getAuth();
  
    let navigate = useNavigate();
onAuthStateChanged(auth, (user) => {
     
  if (user) {

    setId(user.uid)
    setEmail(true)
    setUsername(user.displayName)
    setUrl(user.photoURL)
    setCreationTime(user.metadata.creationTime)
    
  
  } else {
    navigate("/login",{state:"Please Login"})
  }
});

  return (
    <>
    <div className="main">
          <Leftside username={username} url={url} id={id}/>
          <Middle />
          <Rightside creationTime={creationTime}/>
        </div>
    {/* {email?
      <>
        <div className="main">
          <Leftside username={username} url={url}/>
          <Middle/>
          <Rightside creationTime={creationTime}/>
        </div>
      </>
      :
      <>
        <Button variant="dark">Please Check your Email and varify It</Button>
     
      </>

    } */}
    </>
    
  );
};

export default Home;
