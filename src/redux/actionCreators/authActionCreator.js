import * as types from "../actionsTypes/authActionTypes";
import fire from "../../config/firebase";
import { toast } from "react-toastify";
const loginUser = (payload) => {
  return {
    type: types.SIGN_IN,
    payload,
  };
};

const logoutOutUser = () => {
  return {
    type: types.SIGN_OUT,
  };
};

// action creators

// Loggin a user
export const signInUser = (email, password, setSuccess,setLoading ) => (dispatch) => {
  fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(
        loginUser({
          uid: user.user.uid,
          email: user.user.email,
          displayName: user.user.displayName,
        })
      );
      setSuccess(true);
      setLoading(false)
      
    })
    .catch((error) => {
      toast.error(`${error}`);
     setLoading(false)
      
    });
};

// Register A new user

export const registerUser =
  (name, email, password, setSuccess,setLoading) => (dispatch) => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        fire
          .auth()
          .currentUser.updateProfile({
            displayName: name,
          })
          .then(async () => {
            const currentUser = await fire.auth().currentUser;
            dispatch(
              loginUser({
                uid: currentUser.uid,
                name: currentUser.displayName,
                email: currentUser.email,
              })
            );
            setSuccess(true);
           
            
          })
          
      }).catch((error) => {
        toast.error(` ${error}`);
        setLoading(false)
        });
  };

// User Sign out function
export const signOutUser = () => (dispatch) => {
  fire
    .auth()
    .signOut()
    .then(() => {
      dispatch(logoutOutUser());
    });
};

// Check if the user has logged in function

export const checkIsLoggedIn = () => (dispatch) => {
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        loginUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
    }
  });
};
