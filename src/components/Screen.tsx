import { Box, BoxProps } from "@mui/material";
import React, { ReactNode } from "react";

interface ScreenProps {
  children: ReactNode | ReactNode[];
  title?: string;
  metaComponent?: () => ReactNode | ReactNode;
}

const Screen = ({
  title = "Untitled Page",
  metaComponent,
  children,
  ...boxProps
}: BoxProps & ScreenProps) => {
  return (
    <Box {...boxProps}>
      <title>{title}</title>
      {metaComponent && metaComponent()}
      {children}
    </Box>
  );
};

export default Screen;
