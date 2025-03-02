import React, { useEffect } from "react";
import { useSidebar } from "../../store/sidebarStore";
import MiniDrawerStyled from "./MiniDrawerStyled";
import { Box, SwipeableDrawer, useMediaQuery, useTheme } from "@mui/material";
import { drawerWidth } from "../../config";
import SidebarHeader from "./SidebarHeader";
import NavItemsRenderer from "../NavItems";
import { MenuItemObject } from "../../menu-items";
import { useTranslation } from "react-i18next";

const Sidebar = ({ items = [] }: { items?: MenuItemObject[] }) => {
  const { open, handelClose, handelOpen } = useSidebar();
  const theme = useTheme();
  const matchDonwLg = useMediaQuery(theme.breakpoints.down("lg"));

  const { i18n } = useTranslation();

  useEffect(() => {
    if (matchDonwLg) {
      handelClose();
    } else {
      handelOpen();
    }
  }, [handelClose, handelOpen, matchDonwLg]);

  return (
    <>
      <Box
        component={"nav"}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        sx={{
          display: { xs: "none", lg: "initial" },
        }}
      >
        <MiniDrawerStyled
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          anchor={"left"}
          variant="permanent"
          open={open}
          onClose={handelClose}
          PaperProps={{
            sx: {
              "&::-webkit-scrollbar": {
                width: "0px", // Width of the scrollbar
                height: "10px", // Height of the scrollbar for horizontal scrolling
              },
            },
          }}
        >
          <SidebarHeader />
          <Box
            sx={{
              maxWidth: "100%",
            }}
          >
            <NavItemsRenderer items={items} />
          </Box>
        </MiniDrawerStyled>
      </Box>
      <Box dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <SwipeableDrawer
          anchor={"left"}
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          open={open && matchDonwLg}
          variant="temporary"
          onClose={handelClose}
          onOpen={handelOpen}
          swipeAreaWidth={matchDonwLg ? 50 : 0}
          sx={{
            display: { lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "1px solid",
              borderRightColor: "divider",
              backgroundImage: "none",
              boxShadow: "inherit",
            },
          }}
        >
          <Box
            sx={{ maxWidth: drawerWidth }}
            role="presentation"
            onClick={handelClose}
          >
            <SidebarHeader />
            <Box
              sx={{
                maxWidth: "100%",
              }}
            >
              <NavItemsRenderer items={items} />
            </Box>
          </Box>
        </SwipeableDrawer>
      </Box>
    </>
  );
};

export default Sidebar;
