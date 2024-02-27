import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./signin.css";
import user from "../assets/user.png";
import locker from "../assets/padlock.png";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const responseData = await response.json();
      // Assuming your server responds with a token upon successful login
      const { token } = responseData;
      // Do something with the token, such as storing it in local storage

      setFormData(data);
      console.log(data);
      setError(null); // Reset error state
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form>
      {error && <p>{error}</p>}
      <div className="input-container">
        <span>
          <img className="input-icon" src={user} alt="" />
        </span>
        <input
          name="username"
          placeholder="Enter Username or Email"
          {...register("username", {
            required: "Username is required",
            minLength: { value: 3, message: "Enter more than 2 symbols" },
          })}
        />
      </div>
      <div className="error-container">
        {errors.username && <p> {errors.username.message}</p>}
      </div>

      <div className="input-container">
        <span>
          <img className="input-icon" src={locker} alt="" />
        </span>
        <input
          name="password"
          type={"password"}
          placeholder="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Enter more than 5 symbols" },
          })}
        />
      </div>
      <div className="error-container">
        {errors.password && <p> {errors.password.message}</p>}
      </div>

      <button type="button" onClick={handleSubmit(onSubmit)}>Submit</button>
      <p>Do not have an account?</p>
      <button>registration</button>
    </form>
  );
}

export default SignIn;
