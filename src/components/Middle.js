import React,{useState,useEffect} from 'react';
import {InputGroup,FormControl,Button,Card,Modal,Form,ProgressBar} from 'react-bootstrap'
import { SendFill,FileArrowUp,TrashFill } from 'react-bootstrap-icons';
import { getDatabase, ref, set,onValue,push,remove } from "firebase/database";
import { getAuth  } from "firebase/auth";
import { useSelector } from 'react-redux';

const Middle = () => {
  const data = useSelector((id)=> id.activeuserid.id)
  

  

  const auth =  getAuth()
 
  let handleMsg = () => {
    console.log(auth.currentUser.uid, data)
  }


  return (
    <div className="middle">
      <div className="msgbox">
       <>
       <h2 className="username"> username</h2>

            <Card className="mt-2" style={{ width: '28rem' }}>
            <Card.Body>
              <Card.Title>Username</Card.Title>
              <Card.Text>
                  msg
              </Card.Text>
            </Card.Body>
          </Card>
   
       </>
      
      </div>
      <InputGroup>
        <FormControl 
          placeholder="Write Your Message"
          aria-label="Recipient's username with two button addons"
        />
        <Button variant="info" onClick={handleMsg}>
          <SendFill/>
        </Button>
        <Button variant="info">
          <FileArrowUp/>

        </Button>
      </InputGroup>



     
    </div>
  );
};

export default Middle;
