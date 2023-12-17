// RegistrationForm.tsx

import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const RegistrationForm: React.FC = () => {
  console.log(" registration form");
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const register = async()=>{
   try{
    let response =  await fetch('http://localhost:3000/api/user/register',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        
        },
        body: JSON.stringify(formData), 
      })
     return await response.json();

   }catch(error){
     console.error(error);
   }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

   
    let isValid = true;
    const newErrors = { username: '', email: '', password: '' };

    if (!formData.username.trim()) {
      isValid = false;
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      isValid = false;
      newErrors.email = 'Email is required';
    }

    if (!formData.password.trim()) {
      isValid = false;
      newErrors.password = 'Password is required';
    }

    if (isValid) {
      const {message} = await register();
      alert(message);
      setFormData({email:"",username:"",password:""});
    setTimeout(()=>{
       navigate("/login")
    },500);

    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.username ? 'border-red-500' : ''
            }`}
            id="username"
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? 'border-red-500' : ''
            }`}
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? 'border-red-500' : ''
            }`}
            id="password"
            type="password"
            placeholder="********"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register You
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        Already have an account? <Link to ="/login" className="text-blue-500">Login</Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
