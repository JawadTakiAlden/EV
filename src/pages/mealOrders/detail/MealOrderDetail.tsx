import React from "react";
import {
  useChangeOrderStatus,
  useGetMealOrdersDetail,
} from "../../../api/meal-orders";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { gridSpacing } from "../../../config";
import MealCard from "../../meals/components/MealCard";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../../../utils/useGetTranslation";

const InfoTypography = styled(Typography)(({ theme }) => ({
  fontSize: "calc(16px + 0.05vw)",
  fontWeight: "400",
  color: theme.palette.text.secondary,
  textTransform: "capitalize",
  "& > span": {
    color: theme.palette.text.primary,
    fontWeight: "600",
    mb: 0.5,
  },
}));

const MealOrderDetail = () => {
  const mealOrder = useGetMealOrdersDetail();
  const data = mealOrder.data?.data;
  const chnageOrderStatus = useChangeOrderStatus();

  const { getTranslation2 } = useGetTranslation();

  const { t } = useTranslation();

  if (mealOrder.isLoading) {
    return <Typography>{t("global.loading")}...</Typography>;
  }

  return (
    <Box>
      <Grid container spacing={gridSpacing}>
        <Grid size={12} mb={2}>
          <Typography
            sx={{
              fontSize: "calc(22px + 0.1vw)",
              fontWeight: "500",
              letterSpacing: "1px",
              mb: 1,
            }}
          >
            {t("mealOrderDetail.order_status")}
          </Typography>
          <Stack flexDirection={"row"} alignItems={"center"} gap={"5px"}>
            <Tooltip title="the order not start yet">
              <LoadingButton
                onClick={() => {
                  chnageOrderStatus.mutate({
                    orderId: data?.id!,
                    orderStatus: "listed",
                  });
                }}
                disabled={
                  chnageOrderStatus.isPending ||
                  !mealOrder.data?.data.isStockSufficient
                }
                color="inherit"
                variant="outlined"
                sx={{
                  flexGrow: data?.status === "listed" ? 2 : 1,
                  transition: "0.2s",
                }}
              >
                {t("mealOrderDetail.listed")}
              </LoadingButton>
            </Tooltip>
            <Divider sx={{ flexGrow: 0.5 }} />
            <Tooltip title="you are start preparing the order">
              <LoadingButton
                onClick={() => {
                  chnageOrderStatus.mutate({
                    orderId: data?.id!,
                    orderStatus: "pending",
                  });
                }}
                disabled={
                  chnageOrderStatus.isPending ||
                  !mealOrder.data?.data.isStockSufficient
                }
                color="warning"
                variant="outlined"
                sx={{
                  flexGrow: data?.status === "pending" ? 2 : 1,
                  transition: "0.2s",
                }}
              >
                {t("mealOrderDetail.pending")}
              </LoadingButton>
            </Tooltip>
            <Divider sx={{ flexGrow: 0.5 }} />
            <Tooltip title="the order done and ready to be delevired">
              <LoadingButton
                onClick={() => {
                  chnageOrderStatus.mutate({
                    orderId: data?.id!,
                    orderStatus: "done",
                  });
                }}
                disabled={
                  chnageOrderStatus.isPending ||
                  !mealOrder.data?.data.isStockSufficient
                }
                color="primary"
                variant="outlined"
                sx={{
                  flexGrow: data?.status === "done" ? 2 : 1,
                  transition: "0.2s",
                }}
              >
                {t("mealOrderDetail.done")}
              </LoadingButton>
            </Tooltip>
          </Stack>
        </Grid>
        {!mealOrder.data?.data.isStockSufficient && (
          <Grid size={12}>
            <Typography
              sx={{
                fontSize: "calc(16px + 0.15vw)",
                fontWeight: "600",
                mb: 2,
              }}
              color="secondary"
            >
              {t("mealOrderDetail.stockInsufficient")}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t("mealOrderDetail.ingredientId")}</TableCell>
                  <TableCell>{t("mealOrderDetail.ingredientName")}</TableCell>
                  <TableCell>{t("mealOrderDetail.required")}</TableCell>
                  <TableCell>{t("mealOrderDetail.available")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mealOrder.data?.data.insufficientIngredients.map((ingred) => {
                  return (
                    <TableRow>
                      <TableCell>{ingred.ingredientId}</TableCell>
                      <TableCell>{ingred.ingredientName}</TableCell>
                      <TableCell>{ingred.required}</TableCell>
                      <TableCell>{ingred.available}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>
        )}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box>
            <Typography variant="h3" mb={1}>
              {t("mealOrderDetail.orderDetail")}
            </Typography>
            <InfoTypography>
              <span> {t("mealOrderDetail.orderId")}</span>: #{data?.id}
            </InfoTypography>
            <InfoTypography>
              <span>{t("mealOrderDetail.orderDate")}</span>:{" "}
              {new Date(data?.order_date || "").toLocaleDateString()}
            </InfoTypography>
            <InfoTypography>
              <span>{t("mealOrderDetail.orderStatus")}</span>:{" "}
              {t("mealOrderDetail." + data?.status)}
            </InfoTypography>
          </Box>
        </Grid>

        {/* Customer Information Section */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box>
            <Typography variant="h3" mb={1}>
              {t("mealOrderDetail.customer.title")}
            </Typography>
            <InfoTypography>
              <span> {t("mealOrderDetail.customer.name")}</span>:{" "}
              {data?.user?.name}
            </InfoTypography>
            <InfoTypography>
              <span> {t("mealOrderDetail.customer.email")}</span>:{" "}
              {data?.user?.email}
            </InfoTypography>
            <InfoTypography>
              <span> {t("mealOrderDetail.customer.phone")}</span>:{" "}
              {data?.user?.phone}
            </InfoTypography>
            <InfoTypography>
              <span> {t("mealOrderDetail.customer.gender")}</span>:{" "}
              {t("gender." + data?.user?.gender)}
            </InfoTypography>
            <InfoTypography>
              <span> {t("mealOrderDetail.customer.goal")}</span>:{" "}
              {data?.user?.goal}
            </InfoTypography>
            <InfoTypography>
              <span> {t("mealOrderDetail.customer.age")}</span>:{" "}
              {data?.user?.age}
            </InfoTypography>
            <InfoTypography>
              <span>{t("mealOrderDetail.customer.dietary")}</span>:{" "}
              {data?.user?.dietary_preferences}
            </InfoTypography>
          </Box>
        </Grid>

        {/* Subscription Section */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box>
            <Typography variant="h3" mb={1}>
              {t("mealOrderDetail.sub.title")}
            </Typography>
            <InfoTypography>
              <span>{t("mealOrderDetail.sub.plan")}</span>:{" "}
              {getTranslation2(data?.subscription?.meal_plan!, "title")}
            </InfoTypography>
            <List>
              <ListItem>
                <ListItemText>
                  {t("mealOrderDetail.sub.calories")}:{" "}
                  {data?.subscription?.meal_plan?.calories}{" "}
                  {t("mealOrderDetail.kcal")}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  {t("mealOrderDetail.sub.price")}: $
                  {data?.subscription?.meal_plan?.price_monthly}/
                  {t("mealOrderDetail.monthly")}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  {t("mealOrderDetail.sub.startDate")}:{" "}
                  {new Date(
                    data?.subscription?.start_date || ""
                  ).toLocaleDateString()}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  {t("mealOrderDetail.sub.endDate")}:{" "}
                  {new Date(
                    data?.subscription?.end_date || ""
                  ).toLocaleDateString()}
                </ListItemText>
              </ListItem>
            </List>
          </Box>
        </Grid>

        {/* Delivery Information Section */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box>
            <Typography variant="h3" mb={1}>
              {t("mealOrderDetail.delivery.title")}
            </Typography>
            <InfoTypography>
              <span>{t("mealOrderDetail.delivery.address")}</span>:{" "}
              {data?.subscription?.address?.address_label},{" "}
              {data?.subscription?.address?.street},{" "}
              {data?.subscription?.address?.city},{" "}
              {data?.subscription?.address?.state},{" "}
              {data?.subscription?.address?.postal_code}
            </InfoTypography>
            <InfoTypography>
              <span>{t("mealOrderDetail.delivery.notes")}</span>:{" "}
              {data?.subscription?.address?.delivery_notes}
            </InfoTypography>
            <InfoTypography>
              <span>{t("mealOrderDetail.delivery.time")}</span>:{" "}
              {getTranslation2(data?.subscription?.delivery_time!, "title")}
            </InfoTypography>
          </Box>
        </Grid>

        {/* Meal Information Section */}
        <Grid size={12}>
          <Typography variant="h3" mb={1}>
            {t("mealOrderDetail.meals.title")}
          </Typography>
          <Stack flexDirection={"row"} flexWrap={"wrap"} gap="8px">
            {data?.meals?.map((meal, index) => (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  flexBasis: {
                    xs: "100%",
                    sm: "calc(50% - 8px)",
                    md: "calc(25% - 8px)",
                  },
                  maxWidth: {
                    xs: "100%",
                    sm: "calc(50% - 8px)",
                    md: "calc(25% - 8px)",
                  },
                }}
              >
                <MealCard key={index} meal={meal} />
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MealOrderDetail;
