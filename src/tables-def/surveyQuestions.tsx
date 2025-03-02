import { alpha, Box, Chip, Stack } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import JustInViewRender from "../components/JustInViewRender";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../utils/useGetTranslation";

export interface SurveyQuestionModel {
  question: string;
  image: string;
  type: "normal" | "choice";
  choices?: string[];
}

export interface SurveyDataModel {
  id: number;
  title: string;
  title_ar: string;
  image: string;
  type: "normal" | "choice";
  choices?: Choice[];
}

export interface Choice {
  id: number;
  text: string;
}

export const SurveyQuestionsColumns = () => {
  const { t } = useTranslation();
  const { getTranslation } = useGetTranslation();
  const col: MRT_ColumnDef<SurveyDataModel, any>[] = [
    {
      accessorKey: getTranslation("title"),
      header: t("table.question"),
      maxSize: 200,
    },
    {
      accessorKey: "choices",
      header: t("table.choices"),
      maxSize: 200,
      Cell: ({ row }) => {
        return (
          <Stack flexDirection={"row"} flexWrap={"wrap"} gap={1}>
            {row.original.choices?.map((choice) => (
              <Chip label={choice.text} color="default" />
            ))}
          </Stack>
        );
      },
    },
    {
      accessorKey: "image",
      header: t("table.image"),
      Cell: ({ row }) => {
        return (
          <JustInViewRender>
            <Box
              sx={{
                width: "100px",
                height: "100px",
                borderRadius: "10%",
                overflow: "hidden",
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.1),
              }}
            >
              <img
                alt={row.original.image}
                src={row.original.image}
                loading="lazy"
                style={{
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          </JustInViewRender>
        );
      },
    },
  ];
  return col;
};
