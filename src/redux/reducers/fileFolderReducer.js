import * as types from "../actionsTypes/fileFoldersActionTypes";

const initialState = {
  isLoading: true,
  currentFolder: "root",
  userFolders: [],
  userFiles: [],
  adminFolders: [],
  adminFiles: [],
  adminUsers: [],
  adminUser: [],
  adminUserRole: [],
  deleteFolder: [],
  userRole: [],
  getAllFolders: [],
  renameFolder: [],
  renameFile: [],
  getAllFiles: [],
  collectionUser: [],
};

const fileFoldersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_FOLDER:
      return {
        ...state,
        userFolders: [...state.userFolders, action.payload],
      };

    case types.ADD_FOLDERS:
      return {
        ...state,
        userFolders: action.payload,
      };

      case types.RENAME_FOLDER:
        return {
          ...state,
          renameFolder: action.payload,
        };

    case types.GET_ALL_FOLDERS:
      return {
        ...state,
        getAllFolders: action.payload,
      };

    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case types.CHANGE_FOLDER:
      return {
        ...state,
        currentFolder: action.payload,
      };
    case types.DELETE_FOLDER:
      return {
        ...state,
        currentFolder: action.payload,
      };
    case types.SEARCH_FOLDER:
      return {
        ...state,
        currentFolder: action.payload,
      };

    // flies reducer

    case types.ADD_FILES:
      return {
        ...state,
        userFiles: action.payload,
      };

      case types.RENAME_FILE:
        return {
          ...state,
          renameFile: action.payload,
        };

      case types.GET_ALL_FILES:
      return {
        ...state,
        getAllFiles: action.payload,
      };
    case types.CREATE_FILE:
      return {
        ...state,
        userFiles: [...state.userFiles, action.payload],
      };

    case types.SET_FILE_DATA:
      const { fileId, data } = action.payload;
      const allFiles = state.userFiles;
      const currentFile = allFiles.find((file) => file.docId == fileId);
      currentFile.data.data = data;
      return {
        ...state,
        userFiles: state.userFiles.map((file) =>
          file.docId == fileId ? currentFile : file
        ),
      };

    // Delete file
    case types.DELETE_FILE:
      return {
        ...state,
        userFiles: [...state.userFiles, action.payload],
      };
    case types.SEARCH_FILE:
      return {
        ...state,
        userFiles: [...state.userFiles, action.payload],
      };

    // Users Reducers

    case types.SET_USERS:
      return {
        ...state,
        adminUsers: [...state.adminUsers, action.payload],
      };

      case types.SET_USER:
        return {
          ...state,
          collectionUser: [...state.collectionUser, action.payload],
        };

    case types.SET_USERS_ROLE:
      return {
        ...state,
        adminUserRole: [...state.adminUserRole, action.payload],
      };
    default:
      return state;
  }
};

export default fileFoldersReducer;
