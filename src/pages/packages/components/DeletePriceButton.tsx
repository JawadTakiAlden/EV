import { PriceModel } from "../../../tables-def/price";
import PopupButton from "../../../components/PopupButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { useDeletePrice } from "../../../api/packages";
import { useTranslation } from "react-i18next";

const DeletePriceButton = ({ price }: { price: PriceModel }) => {
  const deletePrice = useDeletePrice();
  const { t } = useTranslation();
  return (
    <PopupButton
      title={t("gbtn.delete")}
      ButtonComponentRender={({ handleOpen }) => {
        return (
          <Tooltip title="delete price">
            <Button variant="outlined" onClick={handleOpen} color={"error"}>
              {t("gbtn.delete")}
            </Button>
          </Tooltip>
        );
      }}
      DialogRender={({ props, handleClose }) => {
        return (
          <Dialog {...props}>
            <DialogTitle>
              {t("delete_pop.title", {
                slug: t("slugs.price"),
              })}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t("delete_pop.desc", {
                  slug: t("slugs.price"),
                })}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color={"error"}>
                {t("delete_pop.cancel")}
              </Button>
              <Button
                onClick={async () => {
                  await deletePrice.mutateAsync(price.id);
                  handleClose();
                }}
                loading={deletePrice.isPending}
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

export default DeletePriceButton;
