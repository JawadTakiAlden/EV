import React from "react";
import { Faq } from "../../../../tables-def/faq";
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
import { useDeleteFaq } from "../../../../api/faqs";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../../../../utils/useGetTranslation";

const DeleteFaq = ({ faq }: { faq: Faq }) => {
  const deleteFaq = useDeleteFaq();
  const { t } = useTranslation();
  const { getTranslation } = useGetTranslation();
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
              {t("delete_pop.title", { slug: t("slugs.faq") })}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t("delete_pop.desc", {
                  slug: faq[getTranslation("question")],
                })}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="error" variant="outlined">
                {t("delete_pop.cancel")}
              </Button>
              <Button
                onClick={() => {
                  deleteFaq.mutateAsync(faq.id);
                  handleClose();
                }}
                loading={deleteFaq.isPending}
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

export default DeleteFaq;
