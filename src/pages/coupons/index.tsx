import React, { lazy, useEffect, useState } from "react";
import { useGetAllCoupons } from "../../api/coupons";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Link } from "react-router";
import Loadable from "../../components/Loadable";
import { CouponsColumns } from "../../tables-def/coupons";
import { useTranslation } from "react-i18next";
import { useGetPackages } from "../../api/packages";
import { useGetMealPlan } from "../../api/mealPlan";
import useGetTranslation from "../../utils/useGetTranslation";
import { gridSpacing } from "../../config";

const Table = Loadable(lazy(() => import("../../components/Table")));

const AllCoupons = () => {
  const [planFilter, setPlanFilter] = useState<number | string>(-1);
  const [planMealFilter, setPlanMealFilter] = useState<number | string>(-1);
  const { getTranslation2 } = useGetTranslation();
  const query = useGetAllCoupons(planFilter, planMealFilter);
  const packages = useGetPackages();
  const mealPlans = useGetMealPlan();
  const { t } = useTranslation();

  useEffect(() => {
    query.refetch();
  }, [planFilter, planMealFilter]);

  return (
    <Box>
      <Button
        variant="outlined"
        component={Link}
        to={"/admin/dashboard/createCoupon"}
      >
        {t("coupons.add")}
      </Button>

      <Stack direction={"row"} gap={gridSpacing}>
        <FormControl
          sx={{
            width: 200,
          }}
        >
          <InputLabel>Package</InputLabel>
          <Select
            label={"Package"}
            value={planFilter}
            onChange={(e) => {
              setPlanFilter(e.target.value);
              setPlanMealFilter(-1);
            }}
          >
            <MenuItem value={-1}>no filter</MenuItem>
            {!packages.isLoading &&
              !packages.isError &&
              packages.data?.data.map((plan) => (
                <MenuItem value={plan.id} key={plan?.id}>
                  {getTranslation2(plan, "name")}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            width: 200,
          }}
        >
          <InputLabel>Meal Plan</InputLabel>
          <Select
            label={"Meal Plan"}
            value={planMealFilter}
            onChange={(e) => {
              setPlanFilter(-1);
              setPlanMealFilter(e.target.value);
            }}
          >
            <MenuItem value={-1}>no filter</MenuItem>
            {!mealPlans.isLoading &&
              !mealPlans.isError &&
              mealPlans.data?.data.map((plan) => (
                <MenuItem value={plan.id} key={plan?.id}>
                  {getTranslation2(plan, "title")}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Stack>

      <Table
        data={query.data?.data || []}
        columns={CouponsColumns()}
        state={{
          isLoading: query.isLoading,
        }}
      />
    </Box>
  );
};

export default AllCoupons;
