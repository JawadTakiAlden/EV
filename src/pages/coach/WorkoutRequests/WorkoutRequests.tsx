import { Box } from "@mui/material";
import React, { lazy } from "react";
import { workoutRequestsColumns } from "../../../tables-def/workout-request";
import { useGetWorkoutRequests } from "../../../api/workout-requests";
import Loadable from "../../../components/Loadable";

const Table = Loadable(lazy(() => import("../../../components/Table")));

const WorkoutRequests = () => {
  const workoutRequests = useGetWorkoutRequests();

  return (
    <Box>
      <Table
        state={{
          isLoading: workoutRequests.isLoading,
        }}
        data={workoutRequests.data?.data || []}
        columns={workoutRequestsColumns}
      />
    </Box>
  );
};

export default WorkoutRequests;
