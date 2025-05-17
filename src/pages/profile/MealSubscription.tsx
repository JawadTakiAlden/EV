import { Box, Divider, Tooltip, Typography } from "@mui/material";
import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { DietSubscription } from "../../tables-def/user-profile";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import MainCard from "../../components/MainCard";
import MealPlanCard from "../MealPlans/components/MealPlanCard";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../../utils/useGetTranslation";

const Subscription: React.FC<ListChildComponentProps<DietSubscription[]>> = ({
  index,
  style,
  data,
}) => {
  const subscription = data[index];

  const { t } = useTranslation();

  const { getTranslation2 } = useGetTranslation();

  return (
    <div
      style={{
        ...style,
        width: "300px",
      }}
      key={index}
    >
      <MainCard
        border={false}
        cardContent={false}
        sx={{
          border: (theme) =>
            subscription.is_active
              ? `1px solid ${theme.palette.success.main}`
              : undefined,
          p: 0,
        }}
      >
        <Box
          sx={{
            p: 1,
          }}
        >
          <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>
            {subscription.is_active && (
              <Tooltip title={"Active"}>
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "5px",
                    bgcolor: "success.main",
                    top: "0px",
                    left: "50%",
                  }}
                />
              </Tooltip>
            )}
            {t("userProfile.meal_sub.sub_info")} :{" "}
          </Typography>
          <Typography>
            {t("userProfile.meal_sub.start")} : {subscription.start_date}
          </Typography>
          <Typography>
            {t("userProfile.meal_sub.end")} : {subscription.end_date}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>
            {t("userProfile.meal_sub.address")} :{" "}
          </Typography>
          {subscription.address.city && (
            <Typography>
              {t("userProfile.meal_sub.city")} : {subscription.address.city}
            </Typography>
          )}

          {subscription.address.street && (
            <Typography>
              {t("userProfile.meal_sub.street")} : {subscription.address.street}
            </Typography>
          )}
          {subscription.address.building && (
            <Typography>
              {t("userProfile.meal_sub.building")} :{" "}
              {subscription.address.building}
            </Typography>
          )}
          {subscription.address.address_label && (
            <Typography>
              {t("userProfile.meal_sub.address")} :{" "}
              {subscription.address.address_label}
            </Typography>
          )}
          {subscription.address.postal_code && (
            <Typography>
              {t("userProfile.meal_sub.postal")} :{" "}
              {subscription.address.postal_code}
            </Typography>
          )}
          {subscription.address.state && (
            <Typography>
              {t("userProfile.meal_sub.state")} : {subscription.address.state}
            </Typography>
          )}
          <Divider sx={{ my: 1 }} />
          <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>
            {t("userProfile.meal_sub.deliveryTime")} :
          </Typography>
          <Typography>
            {getTranslation2(subscription.delivery_time, "title")}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <MealPlanCard plan={subscription.meal_plan} />
      </MainCard>
    </div>
  );
};

const MealSubscription = ({
  mealsSubscription,
}: {
  mealsSubscription: DietSubscription[];
}) => {
  const { t, i18n } = useTranslation();
  return (
    <Box>
      <SectionTitle>{t("userProfile.meal_sub.title")}</SectionTitle>
      <List
        itemCount={mealsSubscription?.length || 0}
        itemSize={310}
        direction={i18n.language === "ar" ? "rtl" : "ltr"}
        height={400}
        width={1000}
        itemData={mealsSubscription || []}
        layout="horizontal"
        style={{
          width: "100%",
        }}
      >
        {Subscription}
      </List>
    </Box>
  );
};

export default MealSubscription;
