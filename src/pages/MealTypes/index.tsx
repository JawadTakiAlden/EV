import { Box } from "@mui/material";
import { gridSpacing } from "../../config";
import { Grid } from "@mui/material";
import MealType from "./MealType";

const MealTypes = () => {
  return (
    <Box>
      <Grid
        container
        spacing={gridSpacing}
        flexDirection={{ xs: "row-reverse", sm: "row" }}
      >
        <Grid size={12}>
          <MealType />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MealTypes;
