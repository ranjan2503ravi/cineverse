import React from "react";
import { useForm } from "react-hook-form";

const Signup = ({ switchMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Signup:", data);
  };

  return (
    <div>
      <h2 className="text-white text-xl mb-4 font-semibold">Signup</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

        <input
          {...register("name", { required: "Name required" })}
          placeholder="Name"
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}

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
          Signup
        </button>
      </form>

      <p className="text-gray-400 text-sm mt-3">
        Already have account?{" "}
        <span onClick={switchMode} className="text-red-400 cursor-pointer">
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;