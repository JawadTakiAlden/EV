import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Fade,
  IconButton,
  ListItemButton,
  Menu,
  MenuItem,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { gridSpacing } from "../../config";
import { Meal } from "../../tables-def/meals";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import MealCard from "../meals/components/MealCard";
import { IoFilterSharp } from "react-icons/io5";
import MainCard from "../../components/MainCard";
import { MdDeleteSweep } from "react-icons/md";
import useGetTypes from "../../api/type/useGetTypes";
import {
  useAssignMealsToDay,
  useGetMeals,
  useGetMealsOfWeek,
} from "../../api/meals";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { useGetDaysOfMonth } from "../../api/days-of-month";
import HorizintalMealCard from "../meals/components/HorizintalMealCard";
import useGetTranslation from "../../utils/useGetTranslation";

const ITEM_HEIGHT = 48;

const days = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

const MiniItem = ({ meal }: { meal: Meal }) => {
  const { getTranslation2 } = useGetTranslation();
  return (
    <MainCard border={false} sx={{ p: 0 }}>
      <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
        <Avatar variant="rounded" src={meal.images[0]} />
        <Typography>{getTranslation2(meal, "name")}</Typography>
      </Stack>
    </MainCard>
  );
};

interface WeekManagmentStore {
  [key: string]: {
    meals: number[];
  };
}

const WeekManagement = () => {
  const [activeDay, setActiveDay] = useState<string>("");
  const [mealFilter, setMealFilter] = useState<{ id: number; title: string }>({
    id: 0,
    title: "all",
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const mealTypesQuery = useGetTypes();
  const mealsQuery = useGetMeals();
  const [search, setSearch] = useState<string>("");

  const [droppedMeals, setDroppedMeals] = useState<WeekManagmentStore>({});

  const assignMealsToDays = useAssignMealsToDay();
  const mealsOfMonthQuery = useGetMealsOfWeek();

  const open = Boolean(anchorEl);

  const daysOfMonth = useGetDaysOfMonth();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!mealsOfMonthQuery.isLoading && !mealsOfMonthQuery.isError) {
      const transformedData = mealsOfMonthQuery.data?.data?.map(
        (mealsOfMonth) => {
          return {
            [`${mealsOfMonth.day}`]: {
              meals: mealsOfMonth.meals.map((meal) => meal.id),
            },
          };
        }
      );

      const mergedData = transformedData?.reduce((acc, curr) => {
        return { ...acc, ...curr };
      }, {});

      const sortedData = daysOfMonth?.data?.data?.dates?.reduce((acc, cure) => {
        return {
          ...acc,
          [cure.date]: { meals: mergedData?.[cure.date]?.meals || [] },
        };
      }, {});

      setDroppedMeals(sortedData!);
    }
  }, [mealsOfMonthQuery.isLoading]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const mealTypes = mealTypesQuery?.data?.data;

  console.log(mealTypes);

  const assignMealsSubmit = () => {
    const dataToSubmit = Object.keys(droppedMeals)
      .map((day) => ({
        date: day,
        meal_ids: droppedMeals[day].meals,
      }))
      .filter((mealAssigment) => mealAssigment.meal_ids.length > 0);
    assignMealsToDays.mutateAsync({ assignments: dataToSubmit });
  };

  const SelectableMeal = ({ index, style, data }: ListChildComponentProps) => {
    const [isDraging, setIsDraging] = useState(false);
    const meal = data[index];

    return (
      <div
        style={{
          ...style,
          width: "300px",
          transition: "0.3s",
          transform: isDraging ? `scale(0.8)` : `scale(1)`,
          cursor: "-webkit-grab",
        }}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("meal-id", meal.id.toString());
          setIsDraging(true);
        }}
        onDragEnd={() => {
          setIsDraging(false);
        }}
      >
        <HorizintalMealCard
          withExtraInfo={false}
          withAction={false}
          meal={meal}
        />
      </div>
    );
  };

  return (
    <Box>
      <Grid container spacing={gridSpacing}>
        <Grid size={12}>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="outlined"
              endIcon={<IoFilterSharp />}
            >
              {mealFilter.id === 0 ? t("all") : mealFilter?.title}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              TransitionComponent={Fade}
              slotProps={{
                paper: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                  },
                },
              }}
            >
              <MenuItem
                sx={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "grey.600",
                  backgroundImage: "none",
                  zIndex: 100,
                  ":hover": {
                    backgroundColor: "grey.700",
                  },
                }}
                onClick={() => setMealFilter({ id: 0, title: "all" })}
              >
                {t("all")}
              </MenuItem>
              {mealTypes?.map((filter) => (
                <MenuItem key={filter.id} onClick={() => setMealFilter(filter)}>
                  {filter.title}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <OutlinedInput
            fullWidth
            sx={{ maxWidth: "350px", my: 1 }}
            value={search}
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Burger"
          />
          <Box>
            <List
              height={200}
              itemCount={
                mealsQuery?.data?.data?.filter((meal) => {
                  return (
                    !droppedMeals[activeDay]?.meals.includes(meal.id!) &&
                    meal.name.includes(search) &&
                    (mealFilter.id === 0
                      ? true
                      : meal.types.findIndex(
                          (type) => type.id === mealFilter.id
                        ) !== -1)
                  );
                })?.length || 0
              }
              direction={i18n.language === "ar" ? "rtl" : "ltr"}
              itemData={
                mealsQuery?.data?.data?.filter((meal) => {
                  return (
                    !droppedMeals[activeDay]?.meals.includes(meal.id!) &&
                    meal.name.includes(search) &&
                    (mealFilter.id === 0
                      ? true
                      : meal.types.findIndex(
                          (type) => type.id === mealFilter.id
                        ) !== -1)
                  );
                }) || []
              }
              itemSize={310}
              layout="horizontal"
              width={1000}
              style={{
                width: "100%",
              }}
            >
              {SelectableMeal}
            </List>
          </Box>
        </Grid>
        <Grid size={12}>
          <Grid container columnSpacing={0.5} alignItems={"stretch"}>
            <Grid size={6}>
              <Stack flexWrap={"wrap"} flexDirection={"row"} gap={2}>
                {daysOfMonth?.data?.data?.dates?.map(({ day, date }, i) => (
                  <ListItemButton
                    selected={date === activeDay}
                    sx={{
                      justifyContent: "center",
                      width: "100px",
                      textWrap: "nowrap",
                      textAlign: "center",
                    }}
                    onClick={() => {
                      setActiveDay(date);
                    }}
                    key={i}
                  >
                    {t("days." + day.toLowerCase())}
                    <br />
                    {date}
                  </ListItemButton>
                ))}
              </Stack>
            </Grid>
            <Grid size="grow">
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  minHeight: "400px",
                  borderRadius: "10px",
                  border: (theme) => `2px dashed ${theme.palette.divider}`,
                  p: 4,
                }}
                draggable
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const mealId = e.dataTransfer.getData("meal-id"); // Get the dropped meal ID
                  if (mealId) {
                    const parsedMealId = parseInt(mealId, 10);

                    const isAdded =
                      droppedMeals[activeDay]?.meals?.includes(parsedMealId);
                    if (!isAdded) {
                      setDroppedMeals({
                        ...droppedMeals,
                        [activeDay]: {
                          meals: [
                            ...(droppedMeals[activeDay]?.meals || []),
                            parsedMealId,
                          ],
                        },
                      });
                    }
                  }
                }}
              >
                <Stack flexDirection={"row"} flexWrap={"wrap"} gap={2}>
                  {droppedMeals[activeDay]?.meals?.map((mealId, i) => {
                    const meal = mealsQuery?.data?.data?.find(
                      (m) => m.id === mealId
                    );
                    return meal ? (
                      <Stack
                        key={i}
                        flexDirection={"row"}
                        gap={4}
                        alignItems={"center"}
                        sx={{ backgroundColor: "background.paper", px: 1 }}
                      >
                        <MiniItem key={mealId} meal={meal} />
                        <IconButton
                          onClick={() => {
                            const newMmeals = droppedMeals[
                              activeDay
                            ]?.meals?.filter((m) => m !== mealId);
                            setDroppedMeals({
                              ...droppedMeals,
                              [activeDay]: {
                                meals: newMmeals,
                              },
                            });
                          }}
                          color="error"
                        >
                          <MdDeleteSweep />
                        </IconButton>
                      </Stack>
                    ) : null;
                  })}
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Grid size="auto">
            <LoadingButton
              sx={{
                mt: 1,
              }}
              variant="contained"
              loading={assignMealsToDays.isPending}
              onClick={assignMealsSubmit}
            >
              {t("gbtn.save")}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default WeekManagement;
