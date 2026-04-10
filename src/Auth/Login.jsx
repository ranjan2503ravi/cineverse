import React from "react";
import { useForm } from "react-hook-form";

const Login = ({ switchMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login:", data);
  };

  return (
    <div>
      <h2 className="text-white text-xl mb-4 font-semibold">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

        <input
          {...register("email", { required: "Email required" })}
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}

        <input
          type="password"
          {...register("password", { required: "Password required" })}
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

        <button className="w-full bg-red-500 py-2 rounded text-white hover:bg-red-600">
          Login
        </button>
      </form>

      <p className="text-gray-400 text-sm mt-3">
        Don’t have account?{" "}
        <span onClick={switchMode} className="text-red-400 cursor-pointer">
          Signup
        </span>
      </p>
    </div>
  );
};

export default Login;