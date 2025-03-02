import { alpha, Box, IconButton, Stack } from "@mui/material";
import React, { ReactNode } from "react";
import ModeSwitch from "../../components/ModeSwitch";
import Sidebar from "../../components/Navigations";
import { CgMenuLeftAlt } from "react-icons/cg";
import { useSidebar } from "../../store/sidebarStore";
import { LogoIcon } from "../../components/Logo";
import { MenuItemObject } from "../../menu-items";
import { MdFullscreen } from "react-icons/md";
import ProfileSection from "./ProfileSection";
import LanguageSwitch from "../../components/LanguageSwitch";

const DashboardLayout = ({
  children,
  sidebarItems = [],
}: {
  children: ReactNode | ReactNode[];
  sidebarItems?: MenuItemObject[];
}) => {
  const { handelSwitch } = useSidebar();
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Sidebar items={sidebarItems} />
      <Box
        sx={{
          minHeight: "100vh",
          width: "calc(100% - 260px)",
          flexGrow: 1,
        }}
      >
        <Box
          component={"header"}
          sx={{
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{ mr: 1, display: { xs: "none", lg: "flex" } }}
              onClick={handelSwitch}
            >
              <CgMenuLeftAlt />
            </IconButton>
            <LogoIcon logoWidth="30px" />
          </Box>
          <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
            <IconButton
              sx={{ mr: 1, display: { xs: "inline-flex", lg: "none" } }}
              onClick={handelSwitch}
            >
              <CgMenuLeftAlt />
            </IconButton>

            <IconButton
              onClick={() => {
                const root = document.getElementById("root");
                if (root?.requestFullscreen) {
                  root.requestFullscreen();
                } else if ((root as any)?.webkitRequestFullscreen) {
                  (root as any)?.webkitRequestFullscreen();
                } else if ((root as any)?.msRequestFullscreen) {
                  (root as any)?.msRequestFullscreen();
                }
              }}
            >
              <MdFullscreen />
            </IconButton>
            <ModeSwitch />
            <LanguageSwitch />
            <ProfileSection />
          </Stack>
        </Box>
        <Box
          component={"main"}
          sx={{
            p: { xs: 2, sm: 3 },
            minHeight: "calc(100vh - 70px)",
            backgroundColor: (theme) =>
              alpha(
                theme.palette.mode === "dark"
                  ? theme.palette.common.white
                  : theme.palette.common.black,
                0.02
              ),
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
