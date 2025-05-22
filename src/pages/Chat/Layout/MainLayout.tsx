import { Outlet } from "react-router";
import { useChat } from "../Store/chatStore";
import { useEffect } from "react";

const MainLayout = () => {
  const { unSelectChat } = useChat();
  useEffect(() => {
    return () => {
      unSelectChat();
    };
  }, []);
  return <Outlet />;
};

export default MainLayout;
