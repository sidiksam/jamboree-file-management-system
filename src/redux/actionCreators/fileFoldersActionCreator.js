import * as types from "../actionsTypes/fileFoldersActionTypes";
import fire from "../../config/firebase";
import { toast } from "react-toastify";

// action

const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});

const addFolders = (payload) => ({
  type: types.ADD_FOLDERS,
  payload,
});

const setFolderData = (payload) => ({
  type: types.RENAME_FOLDER,
  payload,
});

const addAllFolders = (payload) => ({
  type: types.GET_ALL_FOLDERS,
  payload,
});

const setloading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});

const setChangeFolder = (payload) => ({
  type: types.CHANGE_FOLDER,
  payload,
});

// Delete folder
const setDeleteFolder = (payload) => ({
  type: types.DELETE_FOLDER,
  payload,
});

// Files

const addFiles = (payload) => ({
  type: types.ADD_FILES,
  payload,
});

const setUpdateData = (payload) => ({
  type: types.RENAME_FILE,
  payload,
});

const addAllFiles = (payload) => ({
  type: types.GET_ALL_FILES,
  payload,
});
const addFile = (payload) => ({
  type: types.CREATE_FILE,
  payload,
});

const setFileData = (payload) => ({
  type: types.SET_FILE_DATA,
  payload,
});

const setRoleData = (payload) => ({
  type: types.SET_USERS_ROLE,
  payload,
});

// Delete files
const setDeleteFile = (payload) => ({
  type: types.DELETE_FILE,
  payload,
});

// Users
const setUsers = (payload) => ({
  type: types.SET_USERS,
  payload,
});

// const setUser = (payload) => ({
//   type: types.SET_USER,
//   payload,
// });

// actionCreators

export const createFolder = (data, setSuccess, setLoading) => (dispatch) => {
  fire
    .firestore()
    .collection("folders")
    .add(data)
    .then(async (folder) => {
      const folderData = await (await folder.get()).data();
      const folderId = folder.id;
      toast.success("Folder Created Successfully");
      dispatch(addFolder({ data: folderData, docId: folderId }));
      window.location.reload(); // Reload the page
      setSuccess(true);
    })
    .catch((error) => {
      toast.error(`${error}`);
      setLoading(false);
    });
};

// Fetch folders
export const getFolders = (userId) => (dispatch) => {
  dispatch(setloading(true));
  fire
    .firestore()
    .collection("folders")
    .where("userId", "==", userId)
    .get()
    .then(async (folders) => {
      const foldersData = await folders.docs.map((folder) => ({
        data: folder.data(),
        docId: folder.id,
      }));

      dispatch(setloading(false));
      dispatch(addFolders(foldersData));
    })
    .catch((error) => {
      toast.error(error);
    })
    .catch((error) => {
      toast.error(`${error}`);
    });
};

// fetac all folder in the database

export const getAllFolders = () => (dispatch) => {
  dispatch(setloading(true));
  fire
    .firestore()
    .collection("folders")
    .get()
    .then(async (folders) => {
      const foldersData = await folders.docs.map((folder) => ({
        data: folder.data(),
        docId: folder.id,
      }));

      dispatch(setloading(false));
      dispatch(addAllFolders(foldersData));
    })
    .catch((error) => {
      toast.error(error);
    })
    .catch((error) => {
      toast.error(`${error}`);
    });
};

// Delete Folder
export const deleteFolder = (userId) => (dispatch) => {
  dispatch(setloading(true));
  fire
    .firestore()
    .collection("folders")
    .doc(userId)
    .delete()
    .then(async (userId) => {
      await dispatch(setDeleteFolder(userId));
      toast.success("Folder deleted successfully!");
      dispatch(setloading(false));
    })
    .catch(() => {
      toast.error("Somthing went wrong");
    });
};
//  get users

export const getUsers = () => (dispatch) => {
  dispatch(setloading(true));
  fire
    .firestore()
    .collection("users")
    .get()
    .then(async (users) => {
      const userData = await users.docs.map((user) => ({
        data: user.data(),
      }));

      dispatch(setloading(false));
      dispatch(setUsers(userData));
    })
    .catch((error) => {
      toast.error(error);
    })
    .catch((error) => {
      toast.error(`${error}`);
    });
};

// update user role
export const updateUser =
  (roleId, role, setSuccess, setLoading) => (dispatch) => {
    fire
      .firestore()
      .collection("users")
      .doc(roleId)
      .update({ role })
      .then(() => {
        dispatch(setRoleData({ roleId, role }));
        toast.success(`${role} added successfully!`);
        window.location.reload(); // Reload the page
        setSuccess(true);
      })
      .catch((error) => {
        toast.error(error);
        setLoading(false);
      });
  };
// change folder
export const changeFolder = (folderId) => (dispatch) => {
  dispatch(setChangeFolder(folderId));
};

// Rename folder
export const updateFolder =
  (folderId, name, setSuccess, setLoading) => (dispatch) => {
    fire
      .firestore()
      .collection("folders")
      .doc(folderId)
      .update({ name })
      .then(() => {
        dispatch(setFolderData({ folderId, name }));
        toast.success(`Folder rename successfully!`);
        window.location.reload(); // Reload the page
        setSuccess(true);
      })
      .catch((error) => {
        toast.error(error);
        setLoading(false);
      });
  };
// All files to a particular user
export const getFiles = (userId) => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .where("userId", "==", userId)
    .get()
    .then(async (files) => {
      const filesData = await files.docs.map((files) => ({
        data: files.data(),
        docId: files.id,
      }));

      dispatch(addFiles(filesData));
    })
    .catch((error) => {
      toast.error(`${error}`);
    });
};

// Get all files

export const getAllFiles = () => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .get()
    .then(async (files) => {
      const filesData = await files.docs.map((files) => ({
        data: files.data(),
        docId: files.id,
      }));

      dispatch(addAllFiles(filesData));
    })
    .catch((error) => {
      toast.error(`${error}`);
    });
};

// Rename folder
export const updateFile =
  (fileId, name, extention, setSuccess, setLoading) => (dispatch) => {
    fire
      .firestore()
      .collection("files")
      .doc(fileId)
      .update({ name, extention })
      .then(() => {
        dispatch(setUpdateData({ fileId, name }));
        toast.success(`File rename successfully!`);
        window.location.reload(); // Reload the page

        setSuccess(true);
      })
      .catch((error) => {
        toast.error(error);
        setLoading(false);
      });
  };

// Create and fetch file
export const createFile = (data, setSuccess, setLoading) => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .add(data)
    .then(async (file) => {
      const fileData = await (await file.get()).data();
      const fileId = file.id;
      toast.success("File created Successfully!");
      dispatch(addFile({ data: fileData, docId: fileId }));
      window.location.reload(); // Reload the page
      setSuccess(true);
      setLoading(true);
    })
    .catch((error) => {
      setSuccess(false);
      toast.error(`${error}`);
      setLoading(false);
    });
};

export const updateFileData = (fileId, data) => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .doc(fileId)
    .update({ data })
    .then(() => {
      dispatch(setFileData({ fileId, data }));
      toast.success("File save successfully!");
    })
    .catch((error) => {
      toast.error(error);
    });
};

export const uploadFile =
  (file, data, setSuccess, setLoading) => (dispatch) => {
    const uploadFileRef = fire
      .storage()
      .ref(`files/${data.userId}/${data.name}`);

    uploadFileRef.put(file).on(
      "state_change",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`upload is ${progress}% done`);
      },
      (error) => {
        toast.error(`${error}`);
        setLoading(false);
      },
      async () => {
        const fileUrl = await uploadFileRef.getDownloadURL();
        const fullData = { ...data, url: fileUrl };
        fire
          .firestore()
          .collection("files")
          .add(fullData)
          .then(async (file) => {
            const fileData = await (await file.get()).data();
            const fileId = file.id;
            toast.success("File uploaded successfully!");
            dispatch(addFile({ data: fileData, docId: fileId }));
            window.location.reload(); // Reload the page
            setSuccess(true);
          })
          .catch((error) => {
            toast.error(`${error}`);
            setLoading(false);
          });
      }
    );
  };

// Delete File

export const deleteFile = (userId) => (dispatch) => {
  dispatch(setloading(true));
  fire
    .firestore()
    .collection("files")
    .doc(userId)
    .delete()
    .then(async (userId) => {
      await dispatch(setDeleteFile(userId));
      toast.success("File deleted successfully!");
      dispatch(setloading(false));
    })
    .catch(() => {
      toast.error("Somthing went wrong");
    });
};
