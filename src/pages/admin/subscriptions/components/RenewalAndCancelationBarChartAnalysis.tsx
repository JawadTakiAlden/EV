import React from "react";
import BarChart from "../../../../components/charts/BarChart";
import { useTheme } from "@mui/material";

export interface RenewalAndCancelationAnalysisProps {
  renewalData:
    | (number | null)[]
    | {
        x: any;
        y: any;
        fill?: ApexFill;
        fillColor?: string;
        strokeColor?: string;
        meta?: any;
        goals?: any;
        barHeightOffset?: number;
        columnWidthOffset?: number;
      }[]
    | [number, number | null][]
    | [number, (number | null)[]][]
    | number[][];

  categories?: any[];
  isLoading?: boolean;
}

const RenewalAndCancelationBarChartAnalysis = ({
  renewalData,
}: RenewalAndCancelationAnalysisProps) => {
  const theme = useTheme();
  return (
    <BarChart
      type="bar"
      series={[
        {
          name: "renwal",
          color: theme.palette.secondary.dark,
          data: renewalData,
        },
      ]}
      options={{
        legend: {
          labels: {
            colors: [theme.palette.text.primary, theme.palette.text.primary],
          },
          markers: {
            fillColors: [
              theme.palette.secondary.dark,
              theme.palette.primary.dark,
            ],
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.3,
            opacityTo: 0.8,
          },
        },
        dataLabels: {
          style: {
            colors: [theme.palette.text.primary],
          },
        },
        colors: [theme.palette.info.main],
        plotOptions: {
          bar: {
            horizontal: true,
            borderRadius: 5,
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: Array(renewalData?.length).fill(
                theme.palette.text.primary
              ),
            },
          },
        },
        tooltip: {
          theme: theme.palette.mode,
        },
        xaxis: {
          labels: {
            style: {
              colors: [theme.palette.text.primary],
            },
          },
        },
        grid: {
          borderColor: theme.palette.divider,
        },
      }}
    />
  );
};

export default RenewalAndCancelationBarChartAnalysis;
