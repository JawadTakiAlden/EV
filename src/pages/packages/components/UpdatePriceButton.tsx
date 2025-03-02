import React from "react";
import PopupButton from "../../../components/PopupButton";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import PricingForm from "./PricingForm";
import { Pricing } from "../../../tables-def/packages";
import { useUpdatePrice } from "../../../api/packages";
import { useTranslation } from "react-i18next";

const UpdatePriceButton = ({ price }: { price: Pricing }) => {
  const updatePrice = useUpdatePrice();
  const { t } = useTranslation();
  return (
    <PopupButton
      ButtonComponentRender={({ handleOpen }) => (
        <Button variant="outlined" color="warning" onClick={handleOpen}>
          {t("gbtn.edit")}
        </Button>
      )}
      title="Edit"
      DialogRender={({ props, handleClose }) => (
        <Dialog {...props}>
          <DialogTitle>
            {t("edit_pop.title", {
              slug: t("slugs.price"),
            })}
          </DialogTitle>
          <DialogContent>
            <PricingForm
              task="update"
              dir="column"
              loadingButtonProps={{
                loading: updatePrice.isPending,
              }}
              initialValues={price}
              onSubmit={async (values) => {
                await updatePrice.mutateAsync({ data: values, id: price.id });
                handleClose();
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    />
  );
};

export default UpdatePriceButton;
