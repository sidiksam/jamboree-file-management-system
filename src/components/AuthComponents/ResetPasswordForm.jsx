import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/actionCreators/authActionCreator";

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [resetEmail, setResetEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Submit function for reset password
  const handleResetPassword = (e) => {
    setLoading(true);
    e.preventDefault();
    if (!resetEmail) {
      return setLoading(false);
    }

    dispatch(resetPassword(resetEmail, setSuccess, setLoading));
  };

  useEffect(() => {
    if (success) {
      navigate("/resetpending");
    }
  }, [success, navigate]);

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
            onSubmitCapture={handleResetPassword}
          >
            <Form.Item
              name="email"
              label="Email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input size="large" placeholder="Email" />
            </Form.Item>

            <div className="mt-8">
              <Form.Item>
                <>
                  <Button
                    loading={loading}
                    className="w-full bg-blue-700"
                    size="large"
                    type="primary"
                    htmlType="submit"
                  >
                    Reset Password
                  </Button>
                </>
              </Form.Item>
              <div className="text-center text-sm">
                Have an account?{"  "}
                <Link to="/signin" className="text-blue-600 font-bold text-sm">
                  Sign In
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
