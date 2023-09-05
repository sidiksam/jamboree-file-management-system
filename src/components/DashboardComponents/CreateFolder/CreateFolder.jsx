import { FaFolderPlus } from "react-icons/fa";
import { Button, Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { createFolder } from "../../../redux/actionCreators/fileFoldersActionCreator";
import { toast } from "react-toastify";
const CreateFolder = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { currentFolder, userFolders, user, currentFolderData,} = useSelector(
    (state) => ({
      userFolders: state.fileFolders.userFolders,
      user: state.auth.user,
      currentFolder: state.fileFolders.currentFolder,
      currentFolderData: state.fileFolders?.getAllFolders.find(
        (folder) => folder.docId == state.fileFolders.currentFolder
      ),
      
    }),
    shallowEqual
  );
  useEffect(() => {
    if (success) {
      setFolderName("");
      setSuccess(false);
      setOpen(false);
      setLoading(false);
    }
  }, [success]);

  const dispatch = useDispatch();

  const checkFolderAlreadyExist = (name) => {
    const folderPresent = userFolders
      .filter((folder) => folder.data.parent == currentFolder)
      .find((fldr) => fldr.data.name == name);
    if (folderPresent) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (folderName) {
      if (folderName.length > 3) {
        if (!checkFolderAlreadyExist(folderName)) {
          const data = {
            createdAt: new Date(),
            name: folderName,
            userId: user.uid,
            createdBy: user.displayName,
            path:   currentFolder == "root"
                ? []
                : [...currentFolderData?.data.path, currentFolder],
            parent: currentFolder,
            lastAccessed: null,
            updatedAt: new Date(),
          };
          form.resetFields();
          return dispatch(createFolder(data, setSuccess, setLoading));
        } else {
          toast.error("Folder already present");
          setLoading(false);
        }
      } else {
        toast.error("Folder must be at least 4 charecter long");
        setLoading(false);
      }
    } else {
      toast.error("Folder name can not be empty ");
      setLoading(false);
    }
  };

  return (
    <>
      <FaFolderPlus />

      <Button className="border-none bord text-gray-700" onClick={showModal}>
        Create Folder
      </Button>

      <Modal
        open={open}
        title="Create Folder"
        onCancel={handleCancel}
        footer={[
          <Button
            loading={loading}
            key="submit"
            type="primary"
            className=" bg-blue-600 w-full"
            onClickCapture={handleSubmit}
          >
            Create Folder
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onSubmitCapture={handleSubmit}
        >
          <Form.Item
            name="folder"
            vlaue={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            // rules={[
            //   { required: true, message: "Please input your email!" },
            //   { type: "email", message: "Please enter a valid email" },
            // ]}
          >
            <Input className="my-5" size="large" placeholder="Create Folder" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default CreateFolder;
