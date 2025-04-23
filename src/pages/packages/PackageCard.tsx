import React, { useEffect, useState } from "react";
import { Package, Pricing } from "../../tables-def/packages";
import { alpha, Box, Button, Stack, Typography } from "@mui/material";
import MainCard from "../../components/MainCard";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../../utils/useGetTranslation";

const PackageCard = ({ packageRow }: { packageRow: Package }) => {
  const [selectedPricing, setSelectedPricing] = useState<Pricing | null>(null);
  const { base } = useAuthContext();
  const { t } = useTranslation();
  const { getTranslation2 } = useGetTranslation();

  useEffect(() => {
    if (packageRow?.pricings?.length! > 0) {
      setSelectedPricing(packageRow?.pricings![0]);
    }
  }, [packageRow?.pricings]);

  return (
    <MainCard
      sx={{
        height: "100%",
      }}
      contentProps={{
        sx: {
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box>
        <Typography
          sx={{
            mb: 2,
            py: 1,
            position: "relative",
            width: "fit-content",
            "::after": {
              content: "''",
              position: "absolute",
              width: "30%",
              left: "5px",
              height: "4px",
              borderRadius: "4px",
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.main, 0.2),
              bottom: 0,
            },
          }}
          variant="h4"
        >
          {getTranslation2(packageRow, "name")}
        </Typography>
        <Typography
          sx={{
            my: 1,
            color: "primary.main",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {packageRow.type}
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
          }}
        >
          {getTranslation2(packageRow, "description")}
        </Typography>
        <Stack sx={{ my: 1 }} flexDirection={"row"} gap={2} flexWrap={"wrap"}>
          {packageRow.pricings?.map((price) => (
            <Button
              onClick={() => setSelectedPricing(price)}
              variant={
                selectedPricing?.id === price.id ? "contained" : "outlined"
              }
            >
              {getTranslation2(price, "title")}
            </Button>
          ))}
        </Stack>
        {selectedPricing !== null ? (
          <Box>
            <Typography
              sx={{
                fontSize: "calc(22px + 0.1vw)",
              }}
            >
              {selectedPricing?.number_of_days} / {t("slugs.days")}
            </Typography>
            <Typography
              sx={{
                fontSize: "calc(22px + 0.1vw)",
                "& .cr": {
                  fontSize: "10px",
                  color: "text.secondary",
                },
              }}
            >
              <sub className="cr">{t("sar")}</sub>
              {selectedPricing?.price}
            </Typography>
          </Box>
        ) : (
          <Typography>
            {t("nodata", {
              slug: t("slugs.price"),
            })}
          </Typography>
        )}
      </Box>

      <Stack
        flexDirection={"row"}
        alignItems={"flex-end"}
        mt={3}
        flex={1}
        justifyContent={"flex-end"}
      >
        <Button
          variant="outlined"
          component={Link}
          to={`/${base}/dashboard/packages/${packageRow.id}`}
          sx={{
            ":hover": {
              boxShadow: (theme) => `-3px -3px ${theme.palette.primary.main}`,
            },
          }}
        >
          {t("gbtn.manage")}
        </Button>
      </Stack>
    </MainCard>
  );
};

export default PackageCard;
