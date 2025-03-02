import React, { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import MainCard from "../../components/MainCard";
import {
  Fab,
  Link,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { Link as BaseLink } from "react-router-dom";
import useGetGetDarkValue from "../../utils/useGetGetDarkValue";
import { useAuthContext } from "../../providers/AuthProvider";
import { WorkoutLog } from "../../tables-def/workout-logs";
import { useGetUserLogs } from "../../api/users";

const RenderRow = ({ workout }: { workout: WorkoutLog }) => {
  const { type, workout_name, date } = workout;
  const action = type === "joined" ? "joined" : "completed";
  const { getVlaue } = useGetGetDarkValue();
  const { base, user } = useAuthContext();

  return (
    <ListItem component="div" disablePadding>
      <ListItemButton>
        <ListItemText
          sx={{
            fontWeight: "400",
            "& .MuiTypography-root": {
              fontSize: "18px !important",
            },
            color: (theme) =>
              getVlaue(theme.palette.grey[400], theme.palette.grey[700]),
            "& .workout": {
              fontWeight: "600",
              color: "text.primary",
            },
            "& .date": {
              fontWeight: "700",
            },
          }}
        >
          Player <span className="action">{action}</span> the{" "}
          {user?.role === "kitchen_staff" ? (
            <span className="workout">"{workout_name}"</span>
          ) : (
            <span className="workout">
              <Link
                component={BaseLink}
                to={`/${base}/dashboard/workout/${workout.id}`}
              >
                "{workout_name}"
              </Link>
            </span>
          )}{" "}
          workout on <span className="date">{date}</span>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

const WorkoutLogs = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const logs = useGetUserLogs(page);

  useEffect(() => {
    if (logs.data?.data?.totalPages) {
      setTotalPages(logs.data?.data?.totalPages || 1);
    }
  }, [logs.data?.data?.totalPages]);

  return (
    <>
      <SectionTitle>Workout Logs</SectionTitle>
      <MainCard
        sx={{
          width: "100%",
          height: "400px",
          overflow: "auto",
          bgcolor: "background.paper",
        }}
      >
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          gap={0.5}
          sx={{ mb: 2 }}
        >
          {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((i) => (
            <Fab
              size="small"
              onClick={() => setPage(i)}
              color={i === page ? "primary" : "default"}
              disabled={logs.isLoading}
            >
              {i}
            </Fab>
          ))}
        </Stack>
        {logs?.data?.data?.logs?.map((workout, i) => (
          <RenderRow key={i} workout={workout} />
        ))}
      </MainCard>
    </>
  );
};

export default WorkoutLogs;
