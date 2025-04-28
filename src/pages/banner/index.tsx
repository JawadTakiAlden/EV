import React from "react";
import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import { gridSpacing } from "../../config";
import BannerCard from "./components/BannerCard";
import AddBanner from "./components/addBanner";
import { useGetBanners } from "../../api/banner";
import { BannerModel } from "../../tables-def/banner";
import LoadingDataError from "../../components/LoadingDataError";
import { useTranslation } from "react-i18next";

const Banners = () => {
  const banners = useGetBanners();

  const { t } = useTranslation();
  if (banners.isError) {
    return <LoadingDataError refetch={banners.refetch} />;
  }

  if (banners.isLoading) {
    return <Typography>{t("global.loading")}...</Typography>;
  }
  return (
    <Box>
      <AddBanner />
      {banners.data?.data?.length === 0 && (
        <Typography>
          {t("nodata", {
            slug: t("slugs.banner"),
          })}
        </Typography>
      )}
      <Grid container spacing={gridSpacing}>
        {banners.data?.data.map((banner: BannerModel, i: number) => (
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
            <BannerCard banner={banner} key={i} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Banners;
