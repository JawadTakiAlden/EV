import React from "react";
import PopupButton from "../../../components/PopupButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { MdDeleteSweep } from "react-icons/md";

import { DeliveryTime } from "../../../tables-def/delivery-times";
import { useDeleteDeliveryTime } from "../../../api/delivery-times";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../../../utils/useGetTranslation";

const DeleteDeliveryTime = ({
  deliveryTime,
}: {
  deliveryTime: DeliveryTime;
}) => {
  const deleteDeliveryTime = useDeleteDeliveryTime();
  const { t } = useTranslation();
  const { getTranslation2 } = useGetTranslation();
  return (
    <PopupButton
      title="delete delivery time"
      ButtonComponentRender={({ handleOpen }) => {
        return (
          <IconButton onClick={handleOpen} color={"error"}>
            <MdDeleteSweep />
          </IconButton>
        );
      }}
      DialogRender={({ props, handleClose }) => {
        return (
          <Dialog {...props}>
            <DialogTitle>
              {t("delete_pop.title", { slug: t("slugs.deliveryTime") })}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t("delete_pop.desc", {
                  slug: getTranslation2(deliveryTime, "title"),
                })}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color={"error"}>
                {t("delete_pop.cancel")}
              </Button>
              <Button
                onClick={async () => {
                  await deleteDeliveryTime.mutateAsync(deliveryTime.id);
                  handleClose();
                }}
                loading={deleteDeliveryTime.isPending}
                variant="outlined"
                color={"success"}
              >
                {t("delete_pop.confirm")}
              </Button>
            </DialogActions>
          </Dialog>
        );
      }}
    />
  );
};

export default DeleteDeliveryTime;
