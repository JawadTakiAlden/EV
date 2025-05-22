import React, { useEffect } from "react";
import { useCreateFaq, useGetFaqs } from "../../../api/faqs";
import { Faq } from "../../../tables-def/faq";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import DeleteFaq from "./faq-actions/DeleteFaq";
import { CgSearchLoading } from "react-icons/cg";
import FAQForm from "./form/FaqForm";
import UpdateFaq from "./faq-actions/UpdateFaq";
import useGetTranslation from "../../../utils/useGetTranslation";

const FAQCard = ({
  faq,
  open,
  handleChange,
  isLoading = false,
}: {
  faq?: Faq;
  open: boolean;
  handleChange: React.Dispatch<React.SetStateAction<number | false>>;
  isLoading?: boolean;
}) => {
  const { getTranslation2 } = useGetTranslation();
  return (
    <Accordion
      slotProps={{ transition: { unmountOnExit: true } }}
      expanded={open}
      onChange={() => handleChange(faq?.id || 0)}
    >
      <AccordionSummary
        expandIcon={<MdExpandMore />}
        aria-controls={`${faq?.id}`}
      >
        {!isLoading && (
          <Typography component="span" sx={{ width: "33%", flexShrink: 0 }}>
            {getTranslation2(faq!, "question")}
          </Typography>
        )}
        {isLoading && <Skeleton variant="text" width={"100%"} />}
      </AccordionSummary>
      <AccordionDetails>
        {!isLoading && (
          <Typography> {getTranslation2(faq!, "answer")}</Typography>
        )}
        {isLoading && (
          <>
            <Skeleton variant="text" width={"100%"} />
            <Skeleton variant="text" width={"95%"} />
            <Skeleton variant="text" width={"90%"} />
          </>
        )}
      </AccordionDetails>

      <AccordionActions>
        {isLoading ? (
          <IconButton>
            <CgSearchLoading />
          </IconButton>
        ) : (
          <DeleteFaq faq={faq!} />
        )}

        {isLoading ? (
          <IconButton>
            <CgSearchLoading />
          </IconButton>
        ) : (
          <UpdateFaq faq={faq!} />
        )}
      </AccordionActions>
    </Accordion>
  );
};

const FAQs = () => {
  const [expanded, setExpanded] = React.useState<number | false>(1);
  const faqsQuery = useGetFaqs();
  const createFaq = useCreateFaq();

  useEffect(() => {
    if (!faqsQuery.isLoading && !faqsQuery.isError) {
      setExpanded(faqsQuery.data?.data?.[0]?.id || false);
    }
  }, [faqsQuery.isLoading, faqsQuery.isError]);

  if (faqsQuery.isLoading) {
    return (
      <>
        <FAQCard open={false} handleChange={setExpanded} isLoading={true} />
        <FAQCard open={false} handleChange={setExpanded} isLoading={true} />
        <FAQCard open={false} handleChange={setExpanded} isLoading={true} />
        <FAQCard open={false} handleChange={setExpanded} isLoading={true} />
      </>
    );
  }

  return (
    <Box>
      <FAQForm
        initialValues={{
          question: "",
          answer: "",
          question_ar: "",
          answer_ar: "",
        }}
        onSubmit={(values) => {
          createFaq.mutate(values);
        }}
      />
      <Divider sx={{ my: 2 }} />
      <Stack>
        {!faqsQuery.isError &&
          faqsQuery.data?.data.map((faq) => (
            <FAQCard
              faq={faq}
              key={faq.id}
              open={faq.id === expanded}
              handleChange={setExpanded}
              isLoading={false}
            />
          ))}
      </Stack>
    </Box>
  );
};

export default FAQs;
