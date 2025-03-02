import { ApexOptions } from "apexcharts";
import ReactApexChart, { Props } from "react-apexcharts";

const areaChartOptions: ApexOptions = {
  chart: {
    height: 450,
    type: "bar",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  grid: {
    strokeDashArray: 0,
  },
};

const BarChart = ({ ...apexProps }: Props) => {
  apexProps.options = {
    ...areaChartOptions,
    ...apexProps.options,
  };
  return <ReactApexChart {...apexProps} />;
};

export default BarChart;
