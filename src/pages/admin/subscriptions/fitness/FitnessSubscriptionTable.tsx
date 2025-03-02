import React, { lazy } from "react";
import { SubscriptionsColumns } from "../../../../tables-def/subscription";
import { useGetFitnessSubscription } from "../../../../api/subscriptions";
import Loadable from "../../../../components/Loadable";

const Table = Loadable(lazy(() => import("../../../../components/Table")));

const FitnessSubscriptionTable = () => {
  const subscriptions = useGetFitnessSubscription();
  return (
    <Table
      enableColumnFilters
      data={subscriptions?.data?.data || []}
      state={{
        isLoading: subscriptions.isLoading,
      }}
      columns={SubscriptionsColumns()}
    />
  );
};

export default FitnessSubscriptionTable;
