import React from "react";
import PopupButton from "../../../components/PopupButton";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import BannerForm from "./BannerForm";
import { useCreateBanner } from "../../../api/banner";
import { useTranslation } from "react-i18next";

const AddBanner = () => {
  const createBanner = useCreateBanner();
  const { t } = useTranslation();
  return (
    <PopupButton
      title={t("addBanner.button")}
      DialogRender={({ props, handleClose }) => {
        return (
          <Dialog {...props}>
            <DialogTitle>
              {t("create_pop.title", {
                slug: t("slugs.banner"),
              })}
            </DialogTitle>
            <DialogContent>
              <BannerForm
                loadingButtonProps={{
                  loading: createBanner.isPending,
                }}
                initialValues={{
                  image: null,
                }}
                onSubmit={async (values) => {
                  await createBanner.mutateAsync(values);
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

export default AddBanner;
