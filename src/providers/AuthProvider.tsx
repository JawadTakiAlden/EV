import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router";
import { Stack, Typography } from "@mui/material";
import { request } from "../api/baseRequest";
import { homepageMap } from "../router/homepageMap";
import { useTranslation } from "react-i18next";

interface AuthUser {
  id: number;
  email: string;
  phone: string;
  role: string;
}

export interface AuthContextProps {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  base: string;
  logout: (() => void) | null;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: false,
  base: "",
  isLoggedIn: true,
  logout: null,
});

export const AuthContextProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("fitnesstoken");

    const getMe = async () => {
      try {
        setIsLoading(true);
        const res = await request({
          url: "/profile/me",
        });
        const user = res.data;
        setUser(user);
        setIsLoggedIn(true);

        const availbleRoles = ["admin", "kitchen_staff", "coach"];

        if (!availbleRoles.includes(user.role)) {
          throw new Error(
            "you are not have permission to get access to the dashboard"
          );
        }
        const pathname =
          location.pathname === "/"
            ? homepageMap[user.role]
            : location.pathname;
        navigate(`${pathname}`);
      } catch (err) {
        setIsLoggedIn(false);
        navigate("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    if (!token) {
      setIsLoggedIn(false);
      navigate("/auth/login");
    }

    getMe();
  }, [navigate]);

  if (isLoading) {
    return (
      <Stack
        height={"100vh"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography
          textAlign={"center"}
          sx={{
            fontSize: "calc(0.15vw + 20px)",
            fontWeight: "600",
          }}
        >
          {t("authContext.waiting")}
        </Typography>
        <Typography
          textAlign={"center"}
          sx={{
            fontSize: "calc(0.15vw + 16px)",
            fontWeight: "400",
            color: "grey.500",
          }}
        >
          {t("authContext.desc")}
        </Typography>
      </Stack>
    );
  }

  const role: any = user?.role;

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isLoading: false,
        isLoggedIn: isLoggedIn,
        base: role!,
        logout: () => {
          localStorage.removeItem("fitnesstoken");
          setIsLoggedIn(false);
          navigate("/auth/login");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
