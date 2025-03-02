import { Box, Button, Typography } from "@mui/material";
import Logo, { LogoIcon } from "../../components/Logo";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../providers/AuthProvider";
import { homepageMap } from "../../router/homepageMap";
import { useTranslation } from "react-i18next";

const NotFound404 = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const redirectHandeler = () => {
    navigate(homepageMap[user?.role as string]);
  };
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Logo logoWidth="100px" textLogowidth="200px" mb={3} />
      <Typography
        sx={{
          fontSize: "calc(30px + 1vw)",
          letterSpacing: "5px",
          "& .o": {
            color: "primary.main",
          },
        }}
      >
        4<span className="o">0</span>4
      </Typography>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {t("error.404.title")} <LogoIcon logoWidth="30px" />
      </Typography>
      <Button onClick={redirectHandeler} variant="outlined">
        {t("error.404.action")}
      </Button>
    </Box>
  );
};

export default NotFound404;
