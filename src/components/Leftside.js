import React,{useState,useEffect} from 'react';
import {Dropdown,Button,ButtonGroup,ListGroup} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { getAuth,signOut  } from "firebase/auth";
import { getDatabase, ref, set,onValue,push,remove } from "firebase/database";
import { useDispatch } from 'react-redux';

const Leftside = (props) => {
  let dispatch = useDispatch()
  const db = getDatabase()
    const auth = getAuth();
    let navigate = useNavigate();
    let [users,setUsers] = useState([])
    let [activeuser,setActiveuser] = useState("")
    let handleLogOut = ()=>{
        signOut(auth).then(() => {
            navigate("/login",{state:"You Are Log Out"})
          }).catch((error) => {
            console.log(error)
          });
    }
    const usersRef = ref(db, 'users/');

    let usersarr = []
    useEffect(()=>{
      onValue(usersRef, (snapshot) => {
        snapshot.forEach(user=>{
          console.log(props.id)
          console.log(user.key !== props.id)
          if(user.key !== props.id){
            let userinfo = {
              ...user.val(),
              id: user.key
            }
            usersarr.push(userinfo)
          }
        })
      });
      setUsers(usersarr)
      
    },[props])


    let handleUser = (id) =>{
      setActiveuser(id)
      dispatch({ type: "ACTIVE_USER",payload:id })
    }
  return (
      <div className="leftside">
          <img src={props.url} width="100"/> <br/>
          <Dropdown as={ButtonGroup}>
            <Button variant="success">{props.username}</Button>

            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

            <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            <h2 className='mt-5 friends'>Friends</h2>

            <ListGroup className="flistgroup" variant="flush">
              {users.map(item=>(

              <ListGroup.Item style={activeuser == item.id ? activecss : activecss2} className="user" onClick={()=>handleUser(item.id)}>{item.username}</ListGroup.Item>
              ))}
              
          </ListGroup>
      </div>
  );
};

let activecss = {
  color: "red"
}
let activecss2 = {
  color: "black"
}

export default Leftside;
