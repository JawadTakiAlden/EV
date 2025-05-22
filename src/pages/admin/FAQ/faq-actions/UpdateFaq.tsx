import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Faq } from "../../../../tables-def/faq";
import PopupButton from "../../../../components/PopupButton";
import { MdModeEditOutline } from "react-icons/md";
import FAQForm from "../form/FaqForm";
import { useUpdateFaq } from "../../../../api/faqs";
import { useTranslation } from "react-i18next";

const UpdateFaq = ({ faq }: { faq: Faq }) => {
  const updateFaq = useUpdateFaq();
  const { t } = useTranslation();
  return (
    <PopupButton
      ButtonComponentRender={({ handleOpen }) => (
        <IconButton color="warning" onClick={handleOpen}>
          <MdModeEditOutline />
        </IconButton>
      )}
      title="edit"
      DialogRender={({ props, handleClose }) => {
        return (
          <Dialog {...props}>
            <DialogTitle>
              {t("edit_pop.title", { slug: t("slugs.faq") })}
            </DialogTitle>
            <DialogContent>
              <FAQForm
                initialValues={faq}
                task="update"
                ButtonProps={{
                  loading: updateFaq.isPending,
                }}
                onSubmit={(values) => {
                  updateFaq.mutateAsync({ data: values, id: faq.id });
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

export default UpdateFaq;
