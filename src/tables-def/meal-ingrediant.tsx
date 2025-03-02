import { MRT_ColumnDef } from "material-react-table";
import useGetTranslation from "../utils/useGetTranslation";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../providers/AuthProvider";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { FaSave } from "react-icons/fa";
import { useUpdateIngredientStock } from "../api/ingredients";

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
  const { getTranslation } = useGetTranslation();
  const updateStock = useUpdateIngredientStock();

  const col: MRT_ColumnDef<MealIngreadiant>[] = [
    {
      accessorKey: "id",
      header: t("table.id"),
      size: 50,
    },
    {
      accessorKey: getTranslation("title"),
      header: t("table.title"),
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
      header: "Action",
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
              stock: values.new_quantity,
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
                <InputLabel>new quantity</InputLabel>
                <OutlinedInput
                  name="new_quantity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="new quantity"
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
            </Stack>
          </form>
        );
      },
    },
  ];

  return col;
};
