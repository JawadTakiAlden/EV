import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import { IntersectionOptions, useInView } from "react-intersection-observer";

const JustInViewRender = ({
  children,
  ...props
}: IntersectionOptions & {
  children: ReactNode | ReactNode[];
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    ...props,
  });

  return <Box ref={ref}>{inView ? children : undefined}</Box>;
};

export default JustInViewRender;
