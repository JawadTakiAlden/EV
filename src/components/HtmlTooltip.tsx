import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 220,
    fontSize: "12px",
    backdropFilter: "blur(1px)",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
}));

export default HtmlTooltip;
