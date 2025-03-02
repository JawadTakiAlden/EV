import React, { lazy } from "react";
import Loadable from "../../components/Loadable";
import { Stack } from "@mui/material";
import { IngrediantColumns } from "../../tables-def/meal-ingrediant";
import { useGetIngredients } from "../../api/ingredients";
import DeleteMealIngrediant from "./deleteMealIngrediant";
import UpdateMealIngredient from "./ingredient-components/UpdateMealIngredient";
import CreateIngredient from "./ingredient-components/CreateIngredient";
import { useAuthContext } from "../../providers/AuthProvider";
const TableComponent = Loadable(lazy(() => import("../../components/Table")));

const MealIngrediant = () => {
  const ingredients = useGetIngredients();
  const { user } = useAuthContext();
  const withAction = user?.role === "admin";
  return (
    <>
      {withAction && <CreateIngredient />}

      <TableComponent
        data={ingredients?.data?.data || []}
        columns={IngrediantColumns()}
        enableRowActions={withAction}
        state={{
          isLoading: ingredients.isLoading,
        }}
        renderRowActions={({ row }) => {
          return (
            <Stack flexDirection={"row"} gap={2}>
              <DeleteMealIngrediant mealIngrediant={row.original} />
              <UpdateMealIngredient mealIngrediant={row.original} />
            </Stack>
          );
        }}
      />
    </>
  );
};

export default MealIngrediant;
