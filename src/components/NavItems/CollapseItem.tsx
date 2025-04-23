import React from "react";
import { MenuItemObject } from "../../menu-items";
import {
  Accordion,
  accordionClasses,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

import NavItemsRenderer from ".";
import { MdExpandMore } from "react-icons/md";
import { useTranslation } from "react-i18next";

const CollapseItem = ({ item }: { item: MenuItemObject }) => {
  const { t } = useTranslation();
  return (
    <Accordion
      disableGutters
      elevation={0}
      slotProps={{ transition: { unmountOnExit: true } }}
      sx={{
        backgroundColor: "transparent",
        backgroundImage: "none",
        boxShadow: "none",
        [`&.${accordionClasses.root}`]: {
          ":before": {
            display: "none",
          },
        },
      }}
    >
      <AccordionSummary
        onClick={(e) => {
          e.stopPropagation();
        }}
        expandIcon={<MdExpandMore size={20} />}
      >
        {t("sidebar." + item.title)}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: "transparent",
          p: 0,
        }}
      >
        <NavItemsRenderer items={item.children!} />
      </AccordionDetails>
    </Accordion>
  );
};

export default CollapseItem;
