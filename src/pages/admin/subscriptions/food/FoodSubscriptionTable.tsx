import { useGetMealSubscription } from "../../../../api/subscriptions";
import Table from "../../../../components/Table";
import { MealSubscriptionColumns } from "../../../../tables-def/meal-subscriptions";

const FoodSubscriptionTable = () => {
  const mealSubscription = useGetMealSubscription();
  return (
    <Table
      columns={MealSubscriptionColumns()}
      data={mealSubscription?.data?.data || []}
      state={{
        isLoading: mealSubscription.isLoading,
      }}
    />
  );
};

export default FoodSubscriptionTable;
