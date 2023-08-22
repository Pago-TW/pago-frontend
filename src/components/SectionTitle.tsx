import type { TypographyProps } from "./ui/Typography";
import { Typography } from "./ui/Typography";

const SectionTitle = (props: TypographyProps) => {
  return (
    <Typography
      variant="h1"
      color="primary.main"
      weightPreset="bold"
      textAlign="center"
      {...props}
    />
  );
};

SectionTitle.displayName = "SectionTitle";

export { SectionTitle };
