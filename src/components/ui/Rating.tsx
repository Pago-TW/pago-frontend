import type { RatingProps as MuiRatingProps } from "@mui/material";
import { Rating as MuiRating } from "@mui/material";
import type { SyntheticEvent } from "react";
import { useCallback } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";

export type RatingProps<T extends FieldValues> = MuiRatingProps & {
  control: Control<T>;
  name: Path<T>;
};

export const Rating = <T extends FieldValues>({
  control,
  name,
  ...ratingProps
}: RatingProps<T>) => {
  const {
    field: { onChange, ...field },
  } = useController({ control, name });

  const handleChange = useCallback(
    (_event: SyntheticEvent, value: number | null) => {
      if (value) onChange(+value);
    },
    [onChange]
  );

  return <MuiRating onChange={handleChange} {...field} {...ratingProps} />;
};

export default Rating;
