import { useMutation } from "@tanstack/react-query";
import { request } from "../baseRequest";
import MealOrderDocument from "../../pages/mealOrders/components/MealOrderDocument";
import { pdf } from "@react-pdf/renderer";

export const usePrintMealOrdersInformationToPDF = () => {
  const getInformationFromServer = (date: any) => {
    return request({
      url: "/kitchen/orders-summary",
      method: "get",
      params: {
        date: date,
      },
    });
  };

  const mutation = useMutation({
    mutationKey: ["print-orders-summary-information"],
    mutationFn: getInformationFromServer,
    onSuccess: async (res) => {
      const data = res.data;
      const blob = await pdf(<MealOrderDocument data={data} />).toBlob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "meal orders summary";
      link.click();

      URL.revokeObjectURL(url);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
};

export const useMarkAllOrdersAsDone = () => {
  const maarkAllOrdersAsDone = (date: any) => {
    return request({
      url: "/kitchen/mark-done",
      method: "post",
      data: {
        date,
      },
    });
  };

  const mutation = useMutation({
    mutationKey: ["mark-order-as-done"],
    mutationFn: maarkAllOrdersAsDone,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
};
