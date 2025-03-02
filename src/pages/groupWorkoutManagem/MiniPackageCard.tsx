import { Package } from "../../tables-def/packages";
import MainCard from "../../components/MainCard";
import UnderlineHeader from "../../components/UnderlineHeader";
import useGetTranslation from "../../utils/useGetTranslation";

const MiniPackageCard = ({ packageRow }: { packageRow: Package }) => {
  const { getTranslation2 } = useGetTranslation();
  return (
    <MainCard border={false}>
      <UnderlineHeader>{getTranslation2(packageRow, "name")}</UnderlineHeader>
    </MainCard>
  );
};

export default MiniPackageCard;
