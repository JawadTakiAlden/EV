import {
  ButtonProps,
  TooltipProps,
  Button,
  Tooltip,
  Dialog,
  DialogProps,
} from "@mui/material";
import React, { ReactNode, useState } from "react";
import Transition from "./Dialog/Transtion";

export interface PopupButtonProps {
  title: string;
  tooltipTitle?: string;
  buttonProps?: ButtonProps;
  tooltipProps?: TooltipProps;
  ButtonComponentRender?: ({
    handleClose,
    handleOpen,
  }: {
    handleOpen: () => void;
    handleClose: () => void;
  }) => ReactNode;
  DialogRender?: ({
    handleClose,
    handleOpen,
    props,
  }: {
    handleOpen: () => void;
    handleClose: () => void;
    props: DialogProps;
  }) => ReactNode | ReactNode[];
}

const PopupButton = ({
  title,
  buttonProps,
  tooltipProps,
  tooltipTitle,
  ButtonComponentRender,
  DialogRender,
}: PopupButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const props: DialogProps = {
    open: open,
    TransitionComponent: Transition,
    onClose: handleClose,
  };
  return (
    <>
      {ButtonComponentRender ? (
        ButtonComponentRender({ handleClose, handleOpen })
      ) : (
        <Tooltip title={tooltipTitle} {...tooltipProps}>
          <Button variant="outlined" onClick={handleOpen} {...buttonProps}>
            {title}
          </Button>
        </Tooltip>
      )}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        {DialogRender
          ? DialogRender({ handleClose, handleOpen, props })
          : undefined}
      </Dialog>
    </>
  );
};

export default PopupButton;
