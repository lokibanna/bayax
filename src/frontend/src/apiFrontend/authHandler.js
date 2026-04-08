import axios from "axios";

// axios.defaults.baseURL = 'http://localhost:3004/api/v1'

const axiosAuth = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:3004/api/v1"}/user`,
  withCredentials: true,
});
const createUser = async ({ email, username, password }) => {
  try {
    const response = await axiosAuth.post("/signup", {
      email,
      username,
      password,
    });

    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(`error while creating the user : ${error}`);
  }
};

const logInUser = async ({ email, password }) => {
  const response = await axiosAuth.post("/signin", {
    email,
    password,
  });

  // console.log(response.data);

  return response.data;
};

const LogOutUser = async () => {
  try {
    await axiosAuth.get("/api/logOut", { withCredentials: true });
  } catch (error) {
    console.log("logOut failed");
  }
};

export { createUser, logInUser, LogOutUser };
