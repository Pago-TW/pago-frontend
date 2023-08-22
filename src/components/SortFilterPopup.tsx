import { zodResolver } from "@hookform/resolvers/zod";
import {
  Fade,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Modal,
  Paper,
  RadioGroup,
  Stack,
  SwipeableDrawer,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { Radio } from "@/components/ui/Radio";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const sortFilterSchema = z.object({
  filter: z
    .custom<`${"createDate" | "travelerFee" | "unitPrice"}-${"asc" | "desc"}`>(
      (v) =>
        !v || /(createDate|travelerFee|unitPrice)-(asc|desc)/.test(v as string)
    )
    .transform((v) => {
      if (!v) return { orderBy: undefined, sort: undefined };

      const [orderBy, sort] = v.split("-");
      return {
        orderBy,
        sort: sort?.toUpperCase() as "ASC" | "DESC",
      };
    }),
});

export type SortFilterValues = z.infer<typeof sortFilterSchema>;

export const DEFAULT_VALUES: SortFilterValues = {
  filter: {
    orderBy: undefined,
    sort: undefined,
  },
};

export interface SortFilterPopupProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (data: SortFilterValues) => void;
}

export const SortFilterPopup = ({
  open,
  onOpen,
  onClose,
  onSubmit,
}: SortFilterPopupProps) => {
  const isTablet = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(sortFilterSchema),
  });

  const handleClose = () => {
    handleSubmit((data) => {
      onSubmit(data);
      onClose();
    })();
  };

  const content = (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Controller
          control={control}
          name="filter"
          render={({ field, fieldState: { error } }) => (
            <FormControl error={!!error}>
              <RadioGroup
                {...field}
                sx={{
                  gap: 2,
                  "& .MuiFormControlLabel-label": { fontSize: 18 },
                }}
              >
                <FormControlLabel
                  value="createDate-asc"
                  control={<Radio />}
                  label="時間排序 (從近到遠)"
                />
                <FormControlLabel
                  value="createDate-desc"
                  control={<Radio />}
                  label="時間排序 (從遠到近)"
                />
                <FormControlLabel
                  value="travelerFee-desc"
                  control={<Radio />}
                  label="最高代購費"
                />
                <FormControlLabel
                  value="unitPrice-asc"
                  control={<Radio />}
                  label="最低商品價格"
                />
                <FormControlLabel value="" control={<Radio />} label="無" />
              </RadioGroup>
              {!!error && <FormHelperText>{error?.message}</FormHelperText>}
            </FormControl>
          )}
        />
      </Stack>
      <Button onClick={handleClose}>確定</Button>
    </Stack>
  );

  if (isTablet) {
    return (
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              p: 4,
            }}
          >
            {content}
          </Paper>
        </Fade>
      </Modal>
    );
  }

  return (
    <SwipeableDrawer
      open={open}
      onOpen={onOpen}
      onClose={handleClose}
      disableSwipeToOpen
      anchor="bottom"
      PaperProps={{
        sx: {
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          px: 5,
          py: 4,
        },
      }}
    >
      {content}
    </SwipeableDrawer>
  );
};
