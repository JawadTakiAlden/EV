import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { gridSpacing } from "../../config";
import { WorkoutModel } from "../../tables-def/workout";
import WorkoutCard from "./components/WorkoutCard";

const Workout = ({ data }: { data: WorkoutModel[] }) => {
  return (
    <Box>
      {data.length === 0 && <Typography>No Workout here yet</Typography>}
      <Grid container spacing={gridSpacing} alignItems={"stretch"}>
        {data.map((workout, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <WorkoutCard workout={workout} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Workout;
