import React from "react";
import { useTranslation } from "react-i18next";
import PopupButton from "../../../components/PopupButton";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { MdModeEditOutline } from "react-icons/md";
import CouponForm from "./CouponForm";
import { Coupon, CreateCoupon } from "../../../tables-def/coupons";
import dayjs from "dayjs";
import { useUpdateCoupons } from "../../../api/coupons";

const UpdateButton = ({ coupon }: { coupon: Coupon }) => {
  const updateCoupon = useUpdateCoupons();
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
              {t("edit_pop.title", { slug: t("slugs.coupon") })}
            </DialogTitle>
            <DialogContent>
              <CouponForm
                initialValues={{
                  code: coupon.code,
                  discount_type: coupon.discount_type,
                  discount_value: coupon.discount_value,
                  is_active: coupon.is_active,
                  usage_limit: coupon.usage_limit,
                  meal_plan_id: coupon.meal_plan_id!,
                  package_id: coupon.package_id!,
                  expiry_date: dayjs(coupon.expiry_date),
                }}
                task="update"
                ButtonProps={{
                  loading: updateCoupon.isPending,
                }}
                onSubmit={(values) => {
                  updateCoupon.mutateAsync({ data: values, id: coupon.id });
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

export default UpdateButton;
