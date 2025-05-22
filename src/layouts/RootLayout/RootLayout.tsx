import { Box } from "@mui/material";
import { Outlet } from "react-router";
import useMount from "../../hooks/useMount";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { AuthContextProvider } from "../../providers/AuthProvider";
import ChatProvider from "../../providers/ChatProvider";

const RootLayout = () => {
  const mount = useMount();

  if (!mount) {
    return <ProgressBar />;
  }

  return (
    <Box>
      <AuthContextProvider>
        <ChatProvider>
          <Outlet />
        </ChatProvider>
      </AuthContextProvider>
    </Box>
  );
};

export default RootLayout;
