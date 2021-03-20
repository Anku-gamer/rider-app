import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router';
import { useState } from 'react';



const Login = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

   

    const [newUser, setNewUSer] = useState(false);
    const [user, setUser] = useState({
      isSignedIn: false,
      name: '',
      email: '',
      password: '',
      image: '',
      error: '',
      success: false
    });

    const handleGoogleSignIn = () => {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const  {displayName, email} = result.user;
                const  signedInUser = {name: displayName,  email}
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {     
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    }
    
      const handleSignOut = () => {
        firebase.auth().signOut()
          .then(res => {
            const signedOutUser = {
              isSignedIn: false,
              name: '',
              email: '',
              image: ''
            }
            setUser(signedOutUser);
          })
          .catch(err => {
            console.log(err);
          })
      }
      const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
          isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
          const isPasswordValid = e.target.value.length > 6;
          const passwordHasNumber = /\d{1}/.test(e.target.value);
          isFieldValid = (isPasswordValid && passwordHasNumber);
        }
        if (isFieldValid) {
          const newUserInfo = { ...user };
          newUserInfo[e.target.name] = e.target.value;
          setUser(newUserInfo);
        }
      }
      const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
          firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
              const newUserInfo = { ...user };
              newUserInfo.error = '';
              newUserInfo.success = true;
              setUser(newUserInfo);
              updateUserName(user.name);
            })
            .catch(error => {
              const newUserInfo = { ...user }
              newUserInfo.error = error.message;
              newUserInfo.success = false;
              setUser(newUserInfo);
            });
        }
    
        if (!newUser && user.email && user.password) {
          firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
              const newUserInfo = { ...user };
              newUserInfo.error = '';
              newUserInfo.success = true;
              setUser(newUserInfo);
              setLoggedInUser(newUserInfo);
              history.replace(from);
              console.log(res.user);
            })
            .catch((error) => {
              const newUserInfo = { ...user }
              newUserInfo.error = error.message;
              newUserInfo.success = false;
              setUser(newUserInfo);
            });
        }
        e.preventDefault();
      }
    
      const updateUserName = name => {
        const user = firebase.auth().currentUser;
    
        user.updateProfile({
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function () {
          console.log('User name updated successfully');
        }).catch(function (error) {
          console.log(error);
        });
      }
      
    return (
        <div>
            <div style={{textAlign: 'center'}}>
        {
          user.isSignedIn && <div>
            <h3>Welcome, {user.name}</h3>
            <p>Your Email: {user.email}</p>
            <img src={user.image} alt="" />
          </div>
        }
  
        <h1 style={{textAlign: 'center' , color: 'Blue'}}>We need to Know about you</h1>
        <div className= "border row m-5">
        <form  onSubmit={handleSubmit}>
          <div className="form-group">
          <p>{loggedInUser.email}</p>
          {newUser && <input type="text" className="form-control" name="name" onBlur={handleBlur} placeholder="Your name" id="" />}
          </div>
          <br />
          <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" name="email" onBlur={handleBlur} placeholder="Your email" required />
          </div>
          <br />
          <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" onBlur={handleBlur} placeholder="Your password" required />
          </div>
          <br />
          <input type="checkbox" onChange={() => setNewUSer(!newUser)} name="newUser" id="" />
          <label htmlFor="newUser">Don't have an account? sign up</label>
          <br/>
          <div className="btn btn-info btn-block" >
          <input  className="btn btn-info btn-block" type="submit" value={newUser ? 'Sign Up' : 'Log In'} />
          </div>
          <br/>
          {
          user.isSignedIn ? 
          <button className="btn btn-dark btn-lg btn-block" onClick={handleSignOut}> Google Sign out</button>
        :
         <div>
             <button style={{marginTop:'10px'}} className="btn btn-outline-info btn-lg btn-block" onClick={handleGoogleSignIn}> Google Sign in</button>
         </div>
        }
        <br/>
        </form>
        </div>

       

        <p style={{ color: 'red' }}>{user.error}</p>
        {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logged in'} successfully</p>}
      </div>
        </div>
    );
};
export default Login;