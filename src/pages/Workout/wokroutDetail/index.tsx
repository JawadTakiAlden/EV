import React from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { CgHome } from "react-icons/cg";
import { IoSettings } from "react-icons/io5";
import WorkOutDetailPage from "./workoutDetail";
import SettingsPannel from "./SettingsPannel";
import { useShowWorkout } from "../../../api/workout";
import { Typography } from "@mui/material";
import LoadingDataError from "../../../components/LoadingDataError";
import { useTranslation } from "react-i18next";

const MainWorkoutDetail = ({ withAction = true }: { withAction?: boolean }) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const workoutDetail = useShowWorkout();

  const { t } = useTranslation();

  if (workoutDetail.isLoading) {
    return <Typography>{t("global.loading")} ...</Typography>;
  }

  if (workoutDetail.isError) {
    return <LoadingDataError refetch={workoutDetail.refetch} />;
  }

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab
                iconPosition="end"
                label={t("workoutDetail.main")}
                icon={<CgHome size={30} />}
                value="1"
              />
              {withAction && (
                <Tab
                  iconPosition="end"
                  label={t("workoutDetail.settings")}
                  icon={<IoSettings size={30} />}
                  value="2"
                />
              )}
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ px: 0 }}>
            <WorkOutDetailPage
              withAction={withAction}
              workout={workoutDetail.data?.data.workout}
            />
          </TabPanel>
          {withAction && (
            <TabPanel value="2" sx={{ px: 0 }}>
              <SettingsPannel workout={workoutDetail.data?.data.workout} />
            </TabPanel>
          )}
        </TabContext>
      </Box>
    </>
  );
};

export default MainWorkoutDetail;
