import React from "react";
import { FaFolder } from "react-icons/fa";
import { FileIcon, defaultStyles } from "react-file-icon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeFolder } from "../../../redux/actionCreators/fileFoldersActionCreator";

const ShowiItems = ({ title, items, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDoubleClick = (itemId) => {
    if (type === "folder") {
      dispatch(changeFolder(itemId));
      navigate(`/dashboard/folder/${itemId}`);
    } else {
      navigate(`/dashboard/file/${itemId}`);
    }
  };

  return (
    <div className="">
      <div className="text-center text-2xl font-bold border-b-2">{title}</div>
      <div className="py-5 flex flex-wrap -mx-5 ">
        {items.map((item, index) => {
          return (
            <div className="p-5 w-56">
              <div
                key={index * 55}
                className=" p-2 text-center flex-col flex-wrap flex items-center border rounded-sm
                 shadow-sm font-medium font-serif  text-sm cursor-pointer"
                onDoubleClick={() => handleDoubleClick(item.docId)}
              >
                {type === "folder" ? (
                  <FaFolder className="text-6xl text-yellow-400 m-2 " />
                ) : (
                  <div style={{ width: "40px", margin: "2px" }}>
                    <FileIcon
                      extension={item?.data?.extention}
                      {...defaultStyles[item?.data?.extention]}
                    />
                  </div>
                )}
                {item?.data?.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowiItems;
