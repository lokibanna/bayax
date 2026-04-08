import React from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Link, useNavigate } from 'react-router-dom'
import { logInUser } from '../apiFrontend/authHandler'
import logo from '../assets/logo.jpg'
import Input from '../components/Input'
import {
  userLoginState,
  authMessageState,
  userProfileState,
  protectedRoutesState,
} from '../recoil/createUser.recoil'
import { useEffect } from 'react'

const Authsignin = () => {
  const [logInData, setlogInData] = useRecoilState(userLoginState);
  const navigate = useNavigate();
  const [authMessage, setAuthMessage] = useRecoilState(authMessageState);
  const setUserProfile = useSetRecoilState(userProfileState);
  const setUserAuthenticated = useSetRecoilState(protectedRoutesState);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setlogInData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await logInUser(logInData);

      if (!user) {
        setAuthMessage(true);
        return;
      }

      localStorage.setItem("username", user.username);
      setUserProfile(true);
      setUserAuthenticated(true);

      setlogInData({ email: "", password: "" });

      navigate("/dashboard");
    } catch (error) {
      console.log(`something went wrong ${error}`);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthMessage(false);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, [authMessage]);

  const signinAnimation = {
    initial: { opacity: 0, y: -20 },
    inView: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background elements if needed, but ParticleBackground handles global bg */}

      <motion.div
        initial="initial"
        whileInView="inView"
        variants={signinAnimation}
        className="relative z-10 w-full max-w-md p-8"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-8 shadow-2xl dark:shadow-black/50 bg-slate-50 dark:bg-transparent">
          <Link to="/" className="flex justify-center mb-6">
            <img src={logo} className="h-20 w-20 rounded-full border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20" alt="" />
          </Link>
          <h1 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100 mb-2">Welcome Back</h1>
          <p className="text-slate-500 dark:text-slate-400 text-center text-sm mb-8">Sign in to access your dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              icon={<FontAwesomeIcon icon={faEnvelope} className="text-cyan-400" />}
              onChange={handleInput}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              icon={<FontAwesomeIcon icon={faLock} className="text-cyan-400" />}
              onChange={handleInput}
            />

            <div className="flex justify-end">
              <Link to="/auth/password" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all duration-200"
            >
              Sign In
            </button>

            <div className="text-center mt-6">
              <p className="text-slate-400 text-sm">
                Don't have an account?{" "}
                <Link to="/auth/signup" className="text-cyan-400 hover:text-cyan-300 font-medium ml-1">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
      {authMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-10 bg-red-500/90 text-white px-6 py-3 rounded-xl shadow-lg backdrop-blur-sm"
        >
          Invalid Credentials, please try again.
        </motion.div>
      )}
    </div>
  );
};

export default Authsignin;
