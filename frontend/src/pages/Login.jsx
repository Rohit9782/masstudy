import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loginUser } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/user/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { user, token, message } = res.data;

      loginUser(user, token);
      toast.success(message);
      navigate("/");

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-pink-200 py-12 flex items-center justify-center">
      <div className="w-full bg-white max-w-md p-5 shadow-md">
        <h1 className="text-lg font-bold text-center text-gray-700">
          Login into your Account!
        </h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-5 mt-5">

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            placeholder="Your Email Here"
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            placeholder="Your Password Here"
            className="w-full p-2 border rounded"
            required
          />

          <button className="bg-orange-600 text-white py-2 cursor-pointer">
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-4">
          Don&apos;t have an Account?{" "}
          <Link to="/register" className="text-orange-600">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;