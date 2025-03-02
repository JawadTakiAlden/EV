import { useGetRenwalStats } from "../../../../api/admin/stats";
import RenewalAndCancelationLineChartAnalysis from "../components/RenewalAndCancelationLineChartAnalysis";
import LoadingDataError from "../../../../components/LoadingDataError";

const FitnessSubscriptionsLineAnalysis = () => {
  const fitnessStats = useGetRenwalStats();
  if (fitnessStats.isError) {
    return <LoadingDataError refetch={fitnessStats.refetch} />;
  }
  return (
    <RenewalAndCancelationLineChartAnalysis
      categories={fitnessStats?.data?.data?.xaxis || []}
      isLoading={fitnessStats.isLoading}
      renewalData={fitnessStats?.data?.data?.renewal_data || []}
    />
  );
};

export default FitnessSubscriptionsLineAnalysis;
