import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../features/authSlice";


import {Button, Input, Logo} from "./index"

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();

  const create = async(data) => {
    setError("")
    try {
      const userData = await authService.createAccount(data);
      console.log("userData: ", userData);
      if (userData) {
        const currentUserData = await authService.getCurrentUser();
        if (currentUserData) dispatch(login(currentUserData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <Input
            type="text"
            label="Full Name: "
            placeholder="Enter your full name..."
            {...register("name", {
              required: true,
            })}
          />

          <Input
            label="Email: "
            placeholder="Enter your email..."
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />

          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password..."
            {...register("password", {
              required: true,
            })}
          />

          <Button className="w-full bg-blue-400 hover:bg-blue-600 duration-200" type="submit">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
