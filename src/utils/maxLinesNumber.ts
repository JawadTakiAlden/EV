import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

export const numberOfLines: (numberOfLines: number) => SxProps<Theme> = (
  numberOfLines
) => {
  return {
    overflow: "hidden",
    textOverflow: "ellipsis",
    boxOrient: "vertical",
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
    WebkitLineClamp: numberOfLines,
    lineClamp: numberOfLines,
  };
};
