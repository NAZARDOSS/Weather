import React, { useState } from "react";
import { useForm } from "react-hook-form";
import user from "../assets/user.png";
import locker from "../assets/padlock.png";
// import email_icon from "../assets/email.png";

function SignUp({ setShowSignUp }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    validate: (values) => {
      const password = values.password;
      const confirm_password = values.confirm_password;
      if (password !== confirm_password) {
        return {
          confirm_password: {
            message: "Passwords do not match",
          },
        };
      }
      return {};
    },
  });

  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      console.log("Data to be sent to the server:", data);
  
      const response = await fetch("http://localhost:3000/auth/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
      console.log("Response from the server:", responseData);
  
      if (!response.ok) {
        throw new Error(responseData.message);
      }
  
      // Registration successful, navigate to another page or show success message
    } catch (error) {
      setError(error.message);
    }
  };
  

  const handleSignInClick = (e) => {
    e.preventDefault();
    setShowSignUp(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p>{error}</p>}
      <div className="input-container">
        <span>
          <img className="input-icon" src={user} alt="" />
        </span>
        <input
          name="username"
          placeholder="Enter username"
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
        {/* <span>
          <img className="input-icon" src={email_icon} alt="" />
        </span> */}
        {/* <input
          name="email"
          placeholder="Enter email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
              message: "Email is incorrect",
            },
          })}
        />
      </div>

      <div className="error-container">
        {errors.email && <p> {errors.email.message}</p>}
      </div> */}

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

      <div className="input-container">
        <span>
          <img className="input-icon" src={locker} alt="" />
        </span>
        <input
          name="confirm_password"
          type={"password"}
          placeholder="confirm_password"
          {...register("confirm_password", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
            message: "",
          })}
        />
      </div>

      <div className="error-container">
        {errors.confirm_password && <p> {errors.confirm_password.message}</p>}
      </div>

      <button name="submit">Submit</button>
      <p>Are you already registered?</p>
      <button onClick={handleSignInClick}>Sign In</button>
    </form>
  );
}

export default SignUp;
