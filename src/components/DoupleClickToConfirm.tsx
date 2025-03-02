import { styled, Typography, TypographyProps } from "@mui/material";
import React, { useState } from "react";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { useTranslation } from "react-i18next";

interface MotionTypographyProps extends TypographyProps {
  open: boolean;
}

const MotionTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "open",
})<MotionTypographyProps>(({ theme, open }) => ({
  transition: theme.transitions.create("opacity", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shortest,
  }),
  opacity: !open ? 0 : 1,
  textShadow: `3px 3px 15px ${theme.palette.primary.main}`,
}));

const DoupleClickToConfirm = ({
  onClick,
  children,
  ...buttonProps
}: LoadingButtonProps) => {
  const [clickTimes, setClickTimes] = useState<number>(0);

  const { t } = useTranslation();

  const handleClickIncress = () => {
    setClickTimes((prev) => prev + 1);
  };

  if (!onClick) {
    throw new Error(
      "DoupleClickToConfirm component take onClick handeler but the onClick now is null"
    );
  }

  buttonProps.variant = buttonProps.variant || "outlined";

  return (
    <>
      <LoadingButton
        {...buttonProps}
        onClick={(e) => {
          if (clickTimes === 0) {
            handleClickIncress();
            return;
          }
          onClick(e);
          setClickTimes(0);
        }}
      >
        {children}
      </LoadingButton>
      <MotionTypography
        open={clickTimes !== 0}
        variant="caption"
        sx={{ ml: 1 }}
      >
        {t("click-tw")}
      </MotionTypography>
      <MotionTypography
        open={buttonProps.loading || false}
        variant="caption"
        sx={{ ml: 1 }}
      >
        {t("gbtn.deleting")}...
      </MotionTypography>
    </>
  );
};

export default DoupleClickToConfirm;
