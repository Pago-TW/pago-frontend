import { useCallback, type SyntheticEvent } from "react";

import {
  Rating as MuiRating,
  type RatingProps as MuiRatingProps,
} from "@mui/material";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

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
