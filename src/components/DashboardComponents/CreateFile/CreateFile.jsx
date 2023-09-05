import { FaFileAlt } from "react-icons/fa";
import { Button, Modal, Form, Input } from "antd";
import { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { createFile } from "../../../redux/actionCreators/fileFoldersActionCreator";
import { useEffect } from "react";
import { toast } from "react-toastify";

const CreateFile = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { currentFolder, userFiles, user, currentFolderData } = useSelector(
    (state) => ({
      userFiles: state.fileFolders.userFiles,
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
      setfileName("");
      setSuccess(false);
      setOpen(false);
      setLoading(false);
    }
  }, [success]);

  const dispatch = useDispatch();

  const checkFileAlreadyExist = (name, ext) => {
    if (!ext) {
      name = name + ".txt";
    }
    const filePresent = userFiles
      .filter((file) => file.data.parent == currentFolder)
      .find((fldr) => fldr.data.name == name);
    if (filePresent) {
      return true;
    } else {
      return false;
    }
  };
  const [fileName, setfileName] = useState("");
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (fileName) {
      if (fileName.length > 3) {
        // check file extention
        let extention = false;
        if (fileName.split(".").length > 1) {
          extention = true;
        }
        if (!checkFileAlreadyExist(fileName, extention)) {
          const data = {
            createdAt: new Date(),
            name: extention ? fileName : `${fileName}.txt`,
            userId: user.uid,
            createdBy: user.displayName,
            path:
              currentFolder == "root"
                ? []
                : [...currentFolderData?.data.path, currentFolder],
            parent: currentFolder,
            lastAccessed: null,
            updatedAt: new Date(),
            extention: extention ? fileName.split(".")[1] : "txt",
            data: "",
            url: null,
          };
          form.resetFields();
          dispatch(createFile(data, setSuccess, setLoading));
         
        } else {
          toast.error("File already present");
          setLoading(false);
        }
      } else {
        toast.error("File must be at least 4 charecter long");
        setLoading(false);
      }
    } else {
      toast.error("File name can not be empty ");
      setLoading(false);
    }
  };
  return (
    <>
      <FaFileAlt />

      <Button className="border-none bord text-gray-700" onClick={showModal}>
        {loading ? "Creating File" : "Create File"}
      </Button>

      <Modal
        open={open}
        title="Create File"
        onCancel={handleCancel}
        footer={[
          <Button
            loading={loading}
            key="submit"
            type="primary"
            className=" bg-blue-600 w-full"
            onClickCapture={handleSubmit}
          >
            Create File
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
            name="fileName"
            vlaue={fileName}
            onChange={(e) => setfileName(e.target.value)}
            // rules={[
            //   { required: true, message: "Please input your email!" },
            //   { type: "email", message: "Please enter a valid email" },
            // ]}
          >
            <Input
              className="my-5"
              size="large"
              placeholder="File Name e,g. file.txt,  index.html, index.js, index.php, index.ts"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default CreateFile;
