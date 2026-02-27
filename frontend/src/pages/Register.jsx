import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",

  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://masstudy.onrender.com/user/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res.data.message);
      navigate("/login");

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full bg-pink-200 py-12 mx-auto flex items-center justify-center'>
      <div className='w-full bg-white max-w-md p-5 mx-auto py-6 border border-gray-200 shadow-md'>
        <h1 className='text-lg font-bold text-center text-gray-700'>Create your Account!</h1>
        <form onSubmit={submitHandler}
          className='flex flex-col gap-5 mt-5 w-full'>

            <input 
              onChange={onChangeHandler}
              type="text" name='name'
              value={formData.name}
              placeholder='Enter Your Name Here'
              className='w-full p-2 border border-gray-300 rounded outline-none' required  />

            <input 
              onChange={onChangeHandler}
              type="email" name='email'
              value={formData.email}
              placeholder='Enter Your Email Here'
              className='w-full p-2 border border-gray-300 rounded outline-none' required  />

            <input 
              onChange={onChangeHandler}
              type="password" name='password'
              value={formData.password}
              placeholder='Enter Your Password Here'
              className='w-full p-2 border border-gray-300 rounded outline-none' required  />

            <button className='bg-orange-600 text-white px-6 py-2 w-full cursor-pointer'>SignUp</button>
          </form>
          <p className='text-center mt-4'>Already have an Account? <Link to={'/login'} className='text-orange-600 cursor-pointer'>Login Here</Link></p>
      </div>
    </div>
  )
}

export default Register;
