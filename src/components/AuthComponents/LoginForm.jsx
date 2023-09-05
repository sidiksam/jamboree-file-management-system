import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../redux/actionCreators/authActionCreator";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const verifyEmail = useSelector((state) => state.auth.user.emailVerified);
  // const adminUser = useSelector((state) => state.auth);

  // const collectionUsers = useSelector(
  //   (state) => state.fileFolders.collectionUser
  // );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Submit function for login
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (!email || !password) {
      return setLoading(false);
    }
    if (password.length < 6) {
      setLoading(false);
      toast.error("Password should be at least 6 character long");
      return;
    }

    dispatch(signInUser(email, password, setSuccess, setLoading));
  };

  useEffect(() => {
    if (success && verifyEmail == true) {
      navigate("/dashboard");
    }
  }, [success, navigate, verifyEmail]);

  useEffect(() => {
    if (verifyEmail == false) {
      toast.error("Please verify your email");
    }
    // if (adminUser.adminUser.map((user) => user.data.role) == null) {
    //   toast.error("you are not a user");
    // }

  }, [verifyEmail]);

  return (
    <div className="flex h-screen login-bg justify-center items-center">
      <div className="md:w-3/12 ">
        <div className="bg-white p-10 rounded-md border">
          <div className="flex items-center flex-col">
            <img src="/logo.jpeg" alt="logo" className="w-40 h-14 " />
            <h2 className="md:text-xl font-semibold text-center mb-5 leading-tight mt-8">
              Welcome to Jamboree File Management System
            </h2>
          </div>

          <Form
            layout="vertical"
            autoComplete="off"
            onSubmitCapture={handleSubmit}
          >
            <Form.Item
              name="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input size="large" placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password size="large" placeholder="Password" />
            </Form.Item>
            <div className="mt-8">
              <Form.Item>
                {verifyEmail == false ? (
                  <>
                    <Button
                      disabled
                      loading={loading}
                      className="w-full bg-blue-700"
                      size="large"
                      type="primary"
                      htmlType="submit"
                    >
                      Sign In
                    </Button>
                  </>
                ) : (
                  <Button
                    loading={loading}
                    className="w-full bg-blue-700"
                    size="large"
                    type="primary"
                    htmlType="submit"
                  >
                    Sign In
                  </Button>
                )}
              </Form.Item>
            </div>
          </Form>
          <div className="text-center text-sm">
            Don&#39;t have an account?{"  "}
            <Link to="/signup" className="text-blue-600 font-bold text-sm">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
