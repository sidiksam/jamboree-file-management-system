import { FaFileUpload } from "react-icons/fa";
import { Button, Modal, Form, Input } from "antd";
import { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { uploadFile } from "../../../redux/actionCreators/fileFoldersActionCreator";

import { useEffect } from "react";
import { toast } from "react-toastify";

const UploadFile = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setfile] = useState(null);
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
      currentFolderData: state.fileFolders.userFolders.find(
        (folder) => folder.docId === state.fileFolders.currentFolder
      ),
    }),
    shallowEqual
  );

  useEffect(() => {
    if (success) {
      setfile("");
      setSuccess(false);
      setOpen(false);
      setLoading(false);
    }
  }, [success]);

  const dispatch = useDispatch();

  const checkFileAlreadyExist = (name) => {
    const filePresent = userFiles
      .filter((file) => file.data.parent === currentFolder)
      .find((fldr) => fldr.data.name === name);
    if (filePresent) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (file) {
      if (!checkFileAlreadyExist(file.name)) {
        const data = {
          createdAt: new Date(),
          name: file.name,
          userId: user.uid,
          createdBy: user.displayName,
          path:
            currentFolder === "root"
              ? []
              : [...currentFolderData?.data.path, currentFolder],
          parent: currentFolder,
          lastAccessed: null,
          updatedAt: new Date(),
          extention: file.name.split(".")[1],
          data: null,
          url: "",
        };
        form.resetFields();
        dispatch(uploadFile(file, data, setSuccess, setLoading));
      } else {
        toast.error("File already present");
        setLoading(false);
      }
    } else {
      toast.error("File name can not be empty ");
      setLoading(false);
    }
  };
  return (
    <>
      <FaFileUpload />

      <Button className="border-none  text-gray-700" onClick={showModal}>
        Upload File
      </Button>

      <Modal
        open={open}
        title="Upload File"
        onCancel={handleCancel}
        footer={[
          <Button
            loading={loading}
            key="submit"
            type="primary"
            className=" bg-blue-600 w-full"
            onClickCapture={handleSubmit}
          >
            {loading ? "File Uploading ..." : "Upload File"}
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
            name="file"
            vlaue={file}
            onChange={(e) => setfile(e.target.files[0])}
            // rules={[
            //   { required: true, message: "Please input your email!" },
            //   { type: "email", message: "Please enter a valid email" },
            // ]}
          >
            <Input type="file" className="my-5" size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UploadFile;
