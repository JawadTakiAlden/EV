import React from "react";
import { MenuItemObject } from "../../menu-items";
import { Box, Typography } from "@mui/material";
import NavGroup from "./NavGroup";
import NavItem from "./NavItem";
import CollapseItem from "./CollapseItem";

const NavItemsRenderer = ({ items }: { items: MenuItemObject[] }) => {
  const testItems = items.map((item, i) => {
    switch (item.type) {
      case "group": {
        return <NavGroup key={i} item={item} />;
      }
      case "item": {
        return <NavItem key={i} item={item} />;
      }
      case "coollabse": {
        return <CollapseItem key={i} item={item} />;
      }
      default: {
        return (
          <Typography key={i}>type of item {item.type} is wrong</Typography>
        );
      }
    }
  });

  return <Box>{testItems}</Box>;
};

export default NavItemsRenderer;
