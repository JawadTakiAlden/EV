import { useTheme } from "@mui/material";

const useGetGetDarkValue = () => {
  const theme = useTheme();

  const getVlaue = (darkValue: any, lightValue: any) => {
    return theme.palette.mode === "dark" ? darkValue : lightValue;
  };

  return { getVlaue };
};

export default useGetGetDarkValue;
