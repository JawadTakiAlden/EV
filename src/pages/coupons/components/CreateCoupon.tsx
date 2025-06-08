import { Box } from "@mui/material";
import React from "react";
import CouponForm from "./CouponForm";
import dayjs from "dayjs";
import * as yup from "yup";
import { useCreateGlobalCoupons } from "../../../api/coupons";

const CreateCoupon = () => {
  const createCoupon = useCreateGlobalCoupons();
  return (
    <Box>
      <CouponForm
        initialValues={{
          code: "",
          discount_type: "percentage",
          discount_value: 0,
          expiry_date: dayjs(),
          is_active: true,
          usage_limit: 100,
        }}
        ButtonProps={{
          loading: createCoupon.isPending,
        }}
        onSubmit={(values) => {
          createCoupon.mutate({
            ...values,
            expiry_date: values.expiry_date.format("DD-MM-YYYY"),
          });
        }}
        validationSchema={validationSchema}
      />
    </Box>
  );
};

const validationSchema = yup.object().shape({
  code: yup.string().required().label("val.code"),
  discount_value: yup
    .number()
    .moreThan(0)
    .required()
    .label("val.discount_value"),
  usage_limit: yup.number().moreThan(0).required().label("val.usage_limit"),
});

export default CreateCoupon;
