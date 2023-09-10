import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/DashboardComponents/Navbar/Navbar";
import Subbar from "../../components/DashboardComponents/SubBar/Subbar";
import HomeComponent from "../../components/DashboardComponents/HomeComponent/HomeComponent";
import { getAllFiles, getAllFolders, getFiles, getFolders } from "../../redux/actionCreators/fileFoldersActionCreator";
import FolderComponent from "../../components/DashboardComponents/FolderComponent/FolderComponent";
import FileComponent from "../../components/DashboardComponents/FileComponent/FileComponent";

const DashboardPage = () => {
  const [showSubBar, setShowSubBar] = useState(true)
  const {pathname} = useLocation()
  const { isLoggedin, isLoading, userId } = useSelector(
    (state) => ({
      isLoggedin: state?.auth?.isAuthenticated,
      isLoading: state.fileFolders.isLoading,
      userId: state.auth.user.uid,
    }),
    shallowEqual
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoggedin && !isLoading) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);
  

  useEffect(() => {
    if (isLoading && userId) {
      dispatch(getFolders(userId));
      dispatch(getAllFolders());

      dispatch(getFiles(userId));
      dispatch(getAllFiles());

    }
  }, [isLoading, userId, dispatch]);

  useEffect(()=>{
    if (pathname.includes(("/file/"))) {
      setShowSubBar(false)
    }
  },[pathname]
  )
  return (
    <>
      <Navbar />
      {showSubBar &&(

      <Subbar />
      )}
      <Routes>
        <Route path="" element={<HomeComponent />} />
        <Route path="folder/:folderId" element={<FolderComponent />} />
        <Route path="file/:fileId" element={<FileComponent/>} />
      </Routes>
    </>
  );
};

export default DashboardPage;
