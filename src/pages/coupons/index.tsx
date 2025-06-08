import React, { lazy } from "react";
import { useGetAllCoupons } from "../../api/coupons";
import { Box, Button } from "@mui/material";
import { Link } from "react-router";
import Loadable from "../../components/Loadable";
import { CouponsColumns } from "../../tables-def/coupons";
import { useTranslation } from "react-i18next";

const Table = Loadable(lazy(() => import("../../components/Table")));

const AllCoupons = () => {
  const query = useGetAllCoupons();
  const { t } = useTranslation();
  return (
    <Box>
      <Button
        variant="outlined"
        component={Link}
        to={"/admin/dashboard/createCoupon"}
      >
        {t("coupons.add")}
      </Button>

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
