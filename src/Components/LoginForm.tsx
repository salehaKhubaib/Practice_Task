
import { useContextUser } from '../Context/UserAuthContextProvider';
import React, { useState } from 'react';
import {  Link,useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  console.log("login form");
  const {setUser} = useContextUser();  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const login = async()=>{
    try{
     let response =  await fetch('http://localhost:3000/api/user/auth',{
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

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

 
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email.trim()) {
      isValid = false;
      newErrors.email = 'Email is required';
    }

    if (!formData.password.trim()) {
      isValid = false;
      newErrors.password = 'Password is required';
    }

    if (isValid) {
      
       const {id,name} = await login();
       localStorage.setItem("id",id);
      
       setUser({id,name});
       navigate("/");

    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            Login
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginForm;
