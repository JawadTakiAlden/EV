import { Box, Link, Stack, styled, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import MainCard from "../../components/MainCard";
import SectionTitle from "../../components/SectionTitle";
import { Link as BaseLink } from "react-router-dom";
import { FitnessSubscription as FitnessSubscriptionModel } from "../../tables-def/user-profile";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../../utils/useGetTranslation";

const InformationTypography = styled(Typography)(() => ({
  fontSize: "calc(18px + 0.02vw)",
}));

const Subscription: React.FC<
  ListChildComponentProps<FitnessSubscriptionModel[]>
> = ({ index, style, data }) => {
  const subscription = data[index];
  const { base } = useAuthContext();
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
      <MainCard border={false} sx={{ position: "relative" }}>
        <SectionTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
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
          {t("userProfile.fit_sub.sub_pan")}
        </SectionTitle>
        <Stack gap="10px">
          <InformationTypography>
            {t("userProfile.fit_sub.package")} :{" "}
            <Link
              component={BaseLink}
              to={`/${base}/dashboard/packages/${subscription.package.id}`}
            >
              {getTranslation2(subscription.package, "name")}
            </Link>
          </InformationTypography>
          <InformationTypography>
            {t("userProfile.fit_sub.price")} :{" "}
            <Link
              component={BaseLink}
              to={`/${base}/dashboard/packages/${subscription.package.id}`}
            >
              {subscription?.pricing?.title}
            </Link>
          </InformationTypography>
          <InformationTypography>
            {t("userProfile.fit_sub.subsc_at")}: {subscription.start_date}
          </InformationTypography>
          <InformationTypography>
            {t("userProfile.fit_sub.experid_on")} : {subscription.end_date}
          </InformationTypography>
          {subscription.is_active && (
            <InformationTypography>
              {t("userProfile.fit_sub.renew", {
                days_left: subscription.days_left,
              })}
            </InformationTypography>
          )}
        </Stack>
      </MainCard>
    </div>
  );
};

const FitnessSubscriptionList = ({ data }: { data: any[] }) => {
  const { t, i18n } = useTranslation();
  return (
    <Box>
      <SectionTitle>{t("userProfile.fit_sub.title")}</SectionTitle>
      <List
        itemCount={data?.length || 0}
        itemSize={310}
        direction={i18n.language === "ar" ? "rtl" : "ltr"}
        height={400}
        width={1000}
        itemData={data}
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

export default FitnessSubscriptionList;
