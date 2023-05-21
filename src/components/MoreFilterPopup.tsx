import { useMediaQuery } from "@/hooks/useMediaQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Fade,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  Modal,
  Paper,
  RadioGroup,
  Stack,
  SwipeableDrawer,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker } from "./inputs/DatePicker";
import { NumberInput } from "./inputs/NumberInput";
import { Button } from "./ui/Button";
import { Radio } from "./ui/Radio";
import { Typography } from "./ui/Typography";

const currentDate = new Date();

export const moreFilterSchema = z
  .object({
    fee: z.object({
      min: z.number().or(z.string()),
      max: z.number().or(z.string()),
    }),
    packaging: z
      .enum(["true", "false"])
      .or(z.boolean())
      .transform((v) => (typeof v === "string" ? v === "true" : v)),
    latestReceiveDate: z.date().nullable(),
  })
  .refine(({ fee: { min, max } }) => (!!min && !!max ? min <= max : true), {
    message: "最低金額不可大於最高金額",
    path: ["fee"],
  });

export type MoreFilterValues = z.infer<typeof moreFilterSchema>;

export const DEFAULT_VALUES: MoreFilterValues = {
  fee: {
    min: "",
    max: "",
  },
  packaging: true,
  latestReceiveDate: null,
};

export type MoreFilterPopup = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (data: MoreFilterValues) => void;
};

export const MoreFilterPopup = ({
  open,
  onOpen,
  onClose,
  onSubmit,
}: MoreFilterPopup) => {
  const isTablet = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<MoreFilterValues>({
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(moreFilterSchema),
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
        <Typography color="base.500">代購費</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <FormControl error={!!errors.fee?.min}>
            <NumberInput control={control} name="fee.min" variant="outlined" />
            {!!errors.fee?.min && (
              <FormHelperText>{errors.fee?.min.message}</FormHelperText>
            )}
          </FormControl>
          <Typography>-</Typography>
          <FormControl error={!!errors.fee?.max}>
            <NumberInput control={control} name="fee.max" variant="outlined" />
            {!!errors.fee?.max && (
              <FormHelperText>{errors.fee?.max.message}</FormHelperText>
            )}
          </FormControl>
        </Box>
        {!!errors.fee && (
          <Typography
            as="p"
            color="pagoRed.main"
            fontSize={14}
            textAlign="center"
          >
            {errors.fee?.message}
          </Typography>
        )}
      </Stack>
      <Stack spacing={2}>
        <Controller
          control={control}
          name="packaging"
          render={({ field, fieldState: { error } }) => (
            <FormControl error={!!error}>
              <FormLabel>包裝有無</FormLabel>
              <RadioGroup
                {...field}
                sx={{ mt: 1, "& .MuiFormControlLabel-label": { fontSize: 18 } }}
              >
                <FormControlLabel value="true" control={<Radio />} label="有" />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="無"
                />
              </RadioGroup>
              {!!error && <FormHelperText>{error?.message}</FormHelperText>}
            </FormControl>
          )}
        />
      </Stack>
      <Stack spacing={2}>
        <Typography color="base.500">最晚收到商品時間</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <DatePicker
            control={control}
            name="latestReceiveDate"
            sx={{ flexGrow: 1 }}
            minDate={currentDate}
            format="P 之後"
          />
          <IconButton onClick={() => setValue("latestReceiveDate", null)}>
            <Delete />
          </IconButton>
        </Box>
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
