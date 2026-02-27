import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [blogData, setBlogData] = useState([]);

  /* =========================
     LOAD USER + TOKEN ON REFRESH
  ========================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));

      // 🔥 IMPORTANT: Set token globally
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  /* =========================
     FETCH ALL BLOGS
  ========================= */
  useEffect(() => {
    const allBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/blog/all");
        setBlogData(res.data.blogs);
      } catch (error) {
        console.log("Error in all blogs api", error);
      }
    };

    allBlogs();
  }, []);

  /* =========================
     LOGIN
  ========================= */
  const loginUser = (userData, token) => {

    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    // 🔥 SET TOKEN GLOBALLY
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  /* =========================
     LOGOUT
  ========================= */
  const logoutUser = () => {
    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Remove token from axios
    delete axios.defaults.headers.common["Authorization"];
  };

  const contextValue = {
    blogData,
    user,
    loginUser,
    logoutUser
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;