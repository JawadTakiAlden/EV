import React from "react";
import { Sport } from "../../../../tables-def/sport";
import PopupButton from "../../../../components/PopupButton";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { MdModeEditOutline } from "react-icons/md";
import SportForm from "./SportForm";
import { useUpdateSport } from "../../../../api/sports";
import { useTranslation } from "react-i18next";

const UpdateSport = ({ sport }: { sport: Sport }) => {
  const updateSport = useUpdateSport();
  const { t } = useTranslation();
  return (
    <PopupButton
      ButtonComponentRender={({ handleOpen }) => (
        <IconButton color="warning" onClick={handleOpen}>
          <MdModeEditOutline />
        </IconButton>
      )}
      title="update"
      DialogRender={({ props, handleClose }) => {
        return (
          <Dialog {...props}>
            <DialogTitle>
              {t("edit_pop.title", { slug: t("slugs.sport") })}
            </DialogTitle>
            <DialogContent>
              <SportForm
                initialValues={{
                  title: sport.title,
                  title_ar: sport.title_ar,
                  image: sport.image,
                }}
                task="update"
                ButtonProps={{
                  loading: updateSport.isPending,
                }}
                onSubmit={async (values) => {
                  await updateSport.mutateAsync({ data: values, id: sport.id });
                  handleClose();
                }}
              />
            </DialogContent>
          </Dialog>
        );
      }}
    />
  );
};

export default UpdateSport;
