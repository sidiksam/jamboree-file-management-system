import * as types from "../actionsTypes/authActionTypes";
import fire from "../../config/firebase";
import { toast } from "react-toastify";
const loginUser = (payload) => {
  return {
    type: types.SIGN_IN,
    payload,
  };
};

const checkloginUser = (payload) => {
  return {
    type: types.CHECK_SIGN_IN,
    payload,
  };
};
const setUser = (payload) => {
  return {
    type: types.SET_USER,
    payload,
  };
};
const signupUser = (payload) => {
  return {
    type: types.SIGN_UP,
    payload,
  };
};
const logoutOutUser = () => {
  return {
    type: types.SIGN_OUT,
  };
};

// Delete user
const setDeleteUser = (payload) => ({
  type: types.SET_DELETE_USER,
  payload,
});

const setloading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});

// action creators

// Loggin a user
export const signInUser =
  (email, password, setSuccess, setLoading) => (dispatch) => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        fire
          .firestore()
          .collection("users")
          .where("userId", "==", user.user.uid)
          .get();
        dispatch(
          loginUser({
            uid: user.user.uid,
            email: user.user.email,
            displayName: user.user.displayName,
            emailVerified: user.user.emailVerified,
            user: user.user,
          })
        );
        setSuccess(true);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(`${error}`);
        setLoading(false);
      });
  };

export const registerUser =
  (name, email, password, setSuccess, setLoading) => (dispatch) => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((cerd) => {
        fire
          .auth()
          .currentUser.updateProfile({
            displayName: name,
          })
          .then(() => {
            const currentUser = fire.auth().currentUser;
            dispatch(
              signupUser({
                uid: currentUser.uid,
                name: currentUser.displayName,
                email: currentUser.email,
                role: currentUser.role,
              }),
              fire
                .firestore()
                .collection("users")
                .doc(cerd.user.uid)
                .set({
                  uid: currentUser.uid,
                  name: currentUser.displayName,
                  email: currentUser.email,
                  role: "user",
                })
                .then(() => {
                  cerd.user.sendEmailVerification();
                })
            );

            setSuccess(true);
          });
      })
      .catch((error) => {
        toast.error(` ${error}`);
        setLoading(false);
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
        checkloginUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: user.role,
        })
      );
    }
  });
};

// Get single user
export const getUser = () => (dispatch) => {
  dispatch(setloading(true));
  // const uid = fire.auth().currentUser.uid ;
  const authPromise = () => {
    return new Promise(() => {
      if (fire.auth().currentUser?.uid != null) {
        const user = fire.auth().currentUser?.uid;
        fire
          .firestore()
          .collection("users")
          .where("uid", "==", user)
          .get()
          .then(async (users) => {
            const userData = users.docs.map((user) => ({
              data: user.data(),
            }));

            dispatch(setloading(false));
            dispatch(setUser(userData));
          })
          .catch((error) => {
            toast.error(error);
          })
          .catch((error) => {
            toast.error(`${error}`);
          });
      } else {
        dispatch(setloading(false));
      }
    });
  };

  setTimeout(authPromise, 0);
};

// DELETE USER
export const deleteUserFunc = (userId) => (dispatch) => {
  dispatch(setloading(true));

  fire
    .firestore()
    .collection("users")
    .doc(userId)
    .delete()

    .then(() => {
      dispatch(setDeleteUser(userId));
      dispatch(setloading(false));
      toast.success("User deleted successfully");
      window.location.reload();
    })
    .catch(() => {
      toast.error("Somthing went wrong");
    });
};
