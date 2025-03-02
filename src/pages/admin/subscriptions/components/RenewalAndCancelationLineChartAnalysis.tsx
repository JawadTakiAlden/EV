import React from "react";
import LineChart from "../../../../components/charts/LineChart";
import { RenewalAndCancelationAnalysisProps } from "./RenewalAndCancelationBarChartAnalysis";
import { useTheme } from "@mui/material";

const RenewalAndCancelationLineChartAnalysis = ({
  renewalData,
  isLoading = false,
  categories,
}: RenewalAndCancelationAnalysisProps) => {
  const theme = useTheme();
  return (
    <LineChart
      series={[
        {
          name: "renewal",
          data: renewalData,
        },
      ]}
      options={{
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.3,
            opacityTo: 0.8,
          },
        },
        noData: {
          text: isLoading ? "Loading..." : "No Data present in the graph!",
          align: "center",
          verticalAlign: "middle",
          offsetX: 0,
          offsetY: 0,
          style: {
            color: "#000000",
            fontSize: "14px",
            fontFamily: "Helvetica",
          },
        },
        legend: {
          labels: {
            colors: [theme.palette.text.primary, theme.palette.text.primary],
          },
          markers: {
            fillColors: [
              theme.palette.secondary.dark,
              theme.palette.primary.main,
            ],
          },
        },

        colors: [theme.palette.secondary.dark, theme.palette.primary.main],
        tooltip: {
          theme: theme.palette.mode,
        },
        grid: {
          borderColor: theme.palette.divider,
        },
        yaxis: {
          labels: {
            style: {
              colors: [theme.palette.text.primary],
            },
          },
        },
        xaxis: {
          categories: categories,
          labels: {
            style: {
              colors: Array(categories?.length).fill(
                theme.palette.text.primary
              ),
            },
          },
        },
      }}
    />
  );
};

export default RenewalAndCancelationLineChartAnalysis;
