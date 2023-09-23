import { Button, type ButtonProps } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

export type ActionButtonProps = Pick<
  ButtonProps,
  "variant" | "color" | "disabled" | "onClick" | "children"
>;

export const ActionButton = (props: ActionButtonProps) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const size = isDesktop ? "large" : "medium";

  return (
    <Button
      size={size}
      sx={{
        minWidth: "fit-content",
        maxWidth: "80%",
        height: { md: 66 },
        flexGrow: 1,
      }}
      {...props}
    />
  );
};
