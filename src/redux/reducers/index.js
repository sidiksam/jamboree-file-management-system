import authReducer from "./authReducer";
import fileFoldersReducer from "./fileFolderReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  auth: authReducer,
  fileFolders: fileFoldersReducer,
});

export default rootReducer;
