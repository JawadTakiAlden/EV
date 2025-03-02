import React from "react";
import { BannerModel } from "../../../tables-def/banner";
import { CardActions, CardMedia } from "@mui/material";
import MainCard from "../../../components/MainCard";
import DeleteBanner from "./deleteBanner";

const BannerCard = ({ banner }: { banner: BannerModel }) => {
  return (
    <MainCard border={false} cardContent={false} sx={{ p: 0 }}>
      <CardMedia
        component={"img"}
        image={"http://127.0.0.1:3001/" + banner.image}
        alt={banner.image}
        height={192}
        sx={{
          borderRadius: "10px",
        }}
      />
      <CardActions>
        <DeleteBanner banner={banner} />
      </CardActions>
    </MainCard>
  );
};

export default BannerCard;
