import React, {
  ComponentType,
  ReactElement,
  Suspense,
  useEffect,
  useState,
} from "react";
import MainCard from "./MainCard";
import { Stack, Typography } from "@mui/material";

const LoadingFallback = ({ progress }: { progress: number }) => {
  return (
    <MainCard>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Typography>Loading ...</Typography>
        <Typography>{progress}%</Typography>
      </Stack>
    </MainCard>
  );
};

const Loadable = <P extends object>(
  Component: ComponentType<P>
): React.FC<P> => {
  const LoadableComponent: React.FC<P> = (props: P): ReactElement => {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 100));
      }, 100);

      return () => clearInterval(interval);
    }, []);

    return (
      <Suspense fallback={<LoadingFallback progress={progress} />}>
        <Component {...props} />
      </Suspense>
    );
  };

  return LoadableComponent;
};

export default Loadable;
