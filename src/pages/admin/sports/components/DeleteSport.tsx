import React from "react";
import { Sport } from "../../../../tables-def/sport";
import PopupButton from "../../../../components/PopupButton";
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
import { LoadingButton } from "@mui/lab";
import { useDeleteSport } from "../../../../api/sports";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../../../../utils/useGetTranslation";

const DeleteSport = ({ sport }: { sport: Sport }) => {
  const deleteSport = useDeleteSport();
  const { t } = useTranslation();
  const { getTranslation2 } = useGetTranslation();
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
              {t("delete_pop.title", { slug: t("slugs.sport") })}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t("delete_pop.desc", {
                  slug: getTranslation2(sport, "title"),
                })}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="error" variant="outlined">
                {t("delete_pop.cancel")}
              </Button>
              <LoadingButton
                onClick={() => {
                  deleteSport.mutateAsync(sport.id);
                  handleClose();
                }}
                loading={deleteSport.isPending}
                color="primary"
                variant="contained"
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

export default DeleteSport;
