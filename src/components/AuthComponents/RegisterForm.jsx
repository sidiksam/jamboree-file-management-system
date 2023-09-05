import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { registerUser } from "../../redux/actionCreators/authActionCreator";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    if (
      (!name,
      !email || !password,
      !passwordConfirmation && password.length < 6,
      passwordConfirmation.length < 6)
    ) {
      return setLoading(false);
    }

    if (password !== passwordConfirmation) {
      toast.error("Password do not match ");
      return setLoading(false);
    }

    dispatch(registerUser(name, email, password, setSuccess, setLoading));
  };

  React.useEffect(() => {
    if (success) {
      navigate("/pending");
    } else {
      return setLoading(false);
    }
  }, [success, navigate]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  return (
    <div className="flex h-screen login-bg justify-center items-center">
      <div className="md:w-3/12">
        <div className="bg-white p-10 rounded-md border">
          <div className="flex items-center flex-col">
            <img src="/logo.jpeg" alt="logo" className="w-40 h-14 " />
            <h2 className="text-xl font-semibold text-center mb-5 leading-tight mt-8">
              Welcome to Jamboree File Management System
            </h2>
          </div>

          <Form
            layout="vertical"
            autoComplete="off"
            onSubmitCapture={handleSubmit}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                size="large"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                size="large"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="passwordConfirmation"
              label="Confirm Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </Form.Item>
            <div className="mt-8">
              <Form.Item>
                <Button
                  loading={loading}
                  className="w-full bg-blue-700"
                  size="large"
                  type="primary"
                  htmlType="submit"
                >
                  Sign Up
                </Button>
              </Form.Item>
            </div>
          </Form>
          <div className="text-center text-sm">
            Alerady have an account?{"  "}
            <Link to="/signin" className="text-blue-600 font-bold text-sm">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
