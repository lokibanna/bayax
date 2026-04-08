import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import Input from "../components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  usersignupState,
  authMessageState,
  userProfileState,
  protectedRoutesState,
} from "../recoil/createUser.recoil";
import { useRecoilState, useSetRecoilState } from "recoil";
import { createUser } from "../apiFrontend/authHandler";
import PasswordStrength from "../components/PasswordStrength";

const AuthSignup = () => {
  const [user, setUser] = useRecoilState(usersignupState);
  const [authMessage, setAuthMessage] = useRecoilState(authMessageState);
  const setUserProfile = useSetRecoilState(userProfileState);
  const setuserAuthenticated = useSetRecoilState(protectedRoutesState);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCreated = await createUser(user);

      if (!userCreated) {
        setAuthMessage(true);
        return;
      }

      localStorage.setItem("username", userCreated.username);
      setUserProfile(true);
      setuserAuthenticated(true);

      navigate("/dashboard");
      setUser({ email: "", password: "", username: "" });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthMessage(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [authMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const signUpanimation = {
    initial: { opacity: 0, y: -20 },
    inView: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        initial="initial"
        whileInView="inView"
        variants={signUpanimation}
        className="relative z-10 w-full max-w-md p-8"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-8 shadow-2xl dark:shadow-black/50 bg-slate-50 dark:bg-transparent">
          <Link to="/" className="flex justify-center mb-6">
            <img src={logo} className="h-20 w-20 rounded-full border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20" alt="" />
          </Link>
          <h1 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100 mb-2">Create Account</h1>
          <p className="text-slate-500 dark:text-slate-400 text-center text-sm mb-8">Join the future of lesson planning</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email Address"
              onChange={handleInputChange}
              name="email"
              icon={<FontAwesomeIcon icon={faEnvelope} className="text-cyan-400" />}
            />
            <Input
              type="text"
              placeholder="Username"
              onChange={handleInputChange}
              name="username"
              icon={<FontAwesomeIcon icon={faUser} className="text-cyan-400" />}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={handleInputChange}
              name="password"
              icon={<FontAwesomeIcon icon={faLock} className="text-cyan-400" />}
            />

            <button
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all duration-200 mt-4"
              type="submit"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-4">
            {user.password && <PasswordStrength password={user.password} />}
          </div>

          <div className="text-center mt-6">
            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <Link to="/auth/signin" className="text-cyan-400 hover:text-cyan-300 font-medium ml-1">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
      {authMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-10 bg-red-500/90 text-white px-6 py-3 rounded-xl shadow-lg backdrop-blur-sm"
        >
          Invalid Credentials or User exists!
        </motion.div>
      )}
    </div>
  );
};

export default AuthSignup;
