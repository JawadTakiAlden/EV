import { ApexOptions } from "apexcharts";
import ReactApexChart, { Props } from "react-apexcharts";

const areaChartOptions: ApexOptions = {
  chart: {
    height: 450,
    type: "area",
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

const AreaChart = ({ ...apexProps }: Props) => {
  apexProps.options = {
    ...areaChartOptions,
    ...apexProps.options,
  };
  return <ReactApexChart {...apexProps} type="area" />;
};

export default AreaChart;
