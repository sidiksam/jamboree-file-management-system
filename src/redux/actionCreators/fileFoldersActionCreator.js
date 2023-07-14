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

const setloading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});

const setChangeFolder = (payload) => ({
  type: types.CHANGE_FOLDER,
  payload,
});

// Files

const addFiles = (payload) => ({
  type: types.ADD_FILES,
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

// change folder
export const changeFolder = (folderId) => (dispatch) => {
  dispatch(setChangeFolder(folderId));
};

// All files

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

export const uploadFile = (file, data, setSuccess,setLoading) => (dispatch) => {
  const uploadFileRef = fire.storage().ref(`files/${data.userId}/${data.name}`);

  uploadFileRef.put(file).on(
    "state_change",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log("Uploading " + progress + "%");
    },
    (error) => {
      toast.error(`${error}`)
      setLoading(false)
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
          setSuccess(true);
          
        })
        .catch((error) => {
          toast.error(`${error}`);
          setLoading(false)
        });
    }
  );
};
