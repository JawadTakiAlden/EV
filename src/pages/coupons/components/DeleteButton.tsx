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
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useDeleteCoupons } from "../../../api/coupons";
import { Coupon } from "../../../tables-def/coupons";

const DeleteButton = ({ coupon }: { coupon: Coupon }) => {
  const deleteCoupon = useDeleteCoupons();
  const { t } = useTranslation();
  return (
    <PopupButton
      ButtonComponentRender={({ handleOpen }) => (
        <IconButton color="error" onClick={handleOpen}>
          <MdOutlineDeleteSweep />
        </IconButton>
      )}
      title="delete"
      DialogRender={({ props, handleClose }) => {
        return (
          <Dialog {...props}>
            <DialogTitle>
              {t("delete_pop.title", { slug: t("slugs.coupon") })}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t("delete_pop.desc", {
                  slug: coupon.code,
                })}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="error" variant="outlined">
                {t("delete_pop.cancel")}
              </Button>
              <Button
                onClick={() => {
                  deleteCoupon.mutateAsync(coupon.id);
                  handleClose();
                }}
                loading={deleteCoupon.isPending}
                color="primary"
                variant="contained"
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

export default DeleteButton;
