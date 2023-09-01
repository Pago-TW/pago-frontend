import { Typography, type TypographyProps } from "@/components/ui/typography";

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
