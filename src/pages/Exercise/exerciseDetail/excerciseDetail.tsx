import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { GiHomeGarage } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import DetailPanel from "./detailPanel";
import SettingsPannel from "./settingsPanel";
import { useSearchParams } from "react-router-dom";
import { useShowExercise } from "../../../api/exercise";
import LoadingDataError from "../../../components/LoadingDataError";
import { useTranslation } from "react-i18next";
import LeaderBoard from "./leaderBoard";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{
        width: "100%",
      }}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

type Tasks = "delete" | "update" | "main";

const panelMaps: {
  [key: string]: number;
} = {
  main: 0,
  settings: 2,
};

const ExcerciseDetail = () => {
  const [searchParams] = useSearchParams();
  let task = searchParams.get("task") as Tasks;
  const [tab, setTab] = useState<number>(task ? panelMaps[task] : 0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const { t } = useTranslation();
  const exerciseDetail = useShowExercise();

  if (exerciseDetail.isLoading) {
    return <Typography>{t("global.loading")} ...</Typography>;
  }

  if (exerciseDetail.isError) {
    return <LoadingDataError refetch={exerciseDetail.refetch} />;
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Tabs variant="scrollable" value={tab} onChange={handleChange}>
        <Tab
          label={t("excDetail.tabs.main")}
          iconPosition="start"
          icon={<GiHomeGarage size={30} />}
          aria-label="main"
          {...a11yProps(0)}
        />
        <Tab
          label={t("excDetail.tabs.leaderBoard")}
          iconPosition="start"
          icon={<IoSettingsOutline size={30} />}
          aria-label="leaderboard"
          {...a11yProps(1)}
        />
        <Tab
          label={t("excDetail.tabs.settings")}
          iconPosition="start"
          icon={<IoSettingsOutline size={30} />}
          aria-label="settings"
          {...a11yProps(2)}
        />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <DetailPanel exercise={exerciseDetail.data?.data!} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <LeaderBoard excercise_id={exerciseDetail.data?.data?.id!} />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <SettingsPannel exercise={exerciseDetail.data?.data!} />
      </TabPanel>
    </Box>
  );
};

export default ExcerciseDetail;
