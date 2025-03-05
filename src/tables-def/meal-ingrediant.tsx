import { MRT_ColumnDef } from "material-react-table";
import useGetTranslation from "../utils/useGetTranslation";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../providers/AuthProvider";
import { useFormik } from "formik";
import { FaCircleInfo } from "react-icons/fa6";

import * as Yup from "yup";
import {
  Box,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { FaSave } from "react-icons/fa";
import { useUpdateIngredientStock } from "../api/ingredients";
import HtmlTooltip from "../components/HtmlTooltip";

export interface MealIngreadiant {
  id: number;
  title: string;
  title_ar: string;
  stock: number;
  unit: string;
  image: string;
}

export const IngrediantColumns = () => {
  const { t } = useTranslation();
  const { getTranslation2 } = useGetTranslation();
  const updateStock = useUpdateIngredientStock();

  const col: MRT_ColumnDef<MealIngreadiant>[] = [
    {
      accessorKey: "id",
      header: t("table.id"),
      size: 50,
    },
    {
      accessorKey: "title",
      header: t("table.title"),
      Cell: ({ row }) => {
        return <span>{getTranslation2(row.original, "title")}</span>;
      },
    },
    {
      accessorKey: "unit",
      header: t("table.unit"),
    },
    {
      accessorKey: "stock",
      header: t("table.stock"),
    },

    {
      accessorKey: "image",

      header: t("table.image"),
      Cell: ({ row }) => {
        return (
          <img
            src={row.original.image}
            alt={row.original.title}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        );
      },
    },
    {
      accessorKey: "actions",
      header: t("table.updateStock"),
      size: 350,
      Cell: ({ row }) => {
        const {
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        } = useFormik({
          initialValues: {
            new_quantity: 0,
            ingredient_id: row.original.id,
          },
          onSubmit: (values) => {
            updateStock.mutate({
              stock: +values.new_quantity,
              ingredient_id: values.ingredient_id,
            });
          },
          validationSchema: Yup.object().shape({
            new_quantity: Yup.number().min(0).required().label("new quantity"),
          }),
        });
        return (
          <form onSubmit={handleSubmit}>
            <Stack flexDirection={"row"} alignItems={"center"} gap={"10px"}>
              <FormControl
                fullWidth
                error={!!errors.new_quantity && !!touched.new_quantity}
              >
                <InputLabel>{t("addToStock.new_qun")}</InputLabel>
                <OutlinedInput
                  name="new_quantity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label={t("addToStock.new_qun")}
                  value={values.new_quantity}
                />
              </FormControl>
              <IconButton
                color="primary"
                type="submit"
                disabled={updateStock.isPending}
              >
                <FaSave />
              </IconButton>
              <HtmlTooltip
                title={
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "calc(12px + 0.05vw)",
                        fontWeight: "700",
                        mb: 1,
                        textTransform: "capitalize",
                      }}
                    >
                      {t("addToStock.title")}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "calc(12px + 0.05vw)",
                        fontWeight: "500",
                      }}
                    >
                      {t("addToStock.description")}
                    </Typography>
                  </Box>
                }
              >
                <Fab
                  sx={{
                    flexShrink: 0,
                  }}
                  size="small"
                  color="secondary"
                >
                  <FaCircleInfo />
                </Fab>
              </HtmlTooltip>
            </Stack>
          </form>
        );
      },
    },
  ];

  return col;
};
