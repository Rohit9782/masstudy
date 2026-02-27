import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";

const TopLoader = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [location.pathname]);

  return null;
};

export default TopLoader;