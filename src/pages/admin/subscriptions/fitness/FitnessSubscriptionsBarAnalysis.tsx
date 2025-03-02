import React from "react";
import RenewalAndCancelationBarChartAnalysis from "../components/RenewalAndCancelationBarChartAnalysis";
import { useGetRenwalStats } from "../../../../api/admin/stats";
import LoadingDataError from "../../../../components/LoadingDataError";
import { Typography } from "@mui/material";
import {
  useGetActiveMealsSubscriptionStats,
  useGetFitnessSubscriptionStats,
} from "../../../../api/subscriptions";

const FitnessSubscriptionsBarAnalysis = () => {
  const fitnessSubscription = useGetFitnessSubscriptionStats();
  const fitnessStats = useGetRenwalStats(); //renwal;
  if (fitnessStats.isError) {
    return <LoadingDataError refetch={fitnessStats.refetch} />;
  }
  if (fitnessStats.isLoading) {
    return <Typography>Loading ...</Typography>;
  }
  const xaxis = fitnessSubscription?.data?.data?.xaxis || [];
  const data = fitnessSubscription?.data?.data?.subscription_data || [];
  let FinalData = data.map((num: number, i: number) => ({
    y: num,
    x: xaxis[i],
  }));

  return <RenewalAndCancelationBarChartAnalysis renewalData={FinalData} />;
};

export default FitnessSubscriptionsBarAnalysis;
