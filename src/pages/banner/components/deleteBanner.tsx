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
import { BannerModel } from "../../../tables-def/banner";
import { LoadingButton } from "@mui/lab";
import { useDeleteBanner } from "../../../api/banner";
import { useTranslation } from "react-i18next";

const DeleteBanner = ({ banner }: { banner: BannerModel }) => {
  const deleteBanner = useDeleteBanner();
  const { t } = useTranslation();
  return (
    <PopupButton
      title="delete banner"
      ButtonComponentRender={({ handleOpen }) => {
        return (
          <IconButton onClick={handleOpen} color="error">
            <MdDeleteSweep />
          </IconButton>
        );
      }}
      DialogRender={({ props, handleClose }) => {
        return (
          <Dialog {...props}>
            <DialogTitle>
              {t("delete_pop.title", {
                slug: t("slugs.banner"),
              })}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t("delete_pop.desc", {
                  slug: t("slugs.banner"),
                })}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="outlined" color="error">
                {t("delete_pop.cancel")}
              </Button>
              <LoadingButton
                onClick={async () => {
                  await deleteBanner.mutateAsync(banner.id);
                  handleClose();
                }}
                variant="outlined"
                loading={deleteBanner.isPending}
                color="primary"
              >
                {t("delete_pop.confirm")}
              </LoadingButton>
            </DialogActions>
          </Dialog>
        );
      }}
    />
  );
};

export default DeleteBanner;
