import { CurrencyInput } from "@/components/inputs/CurrencyInput";
import { DatePicker } from "@/components/inputs/DatePicker";
import { NumberInput } from "@/components/inputs/NumberInput";
import { SelectInput } from "@/components/inputs/SelectInput";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { useOrder } from "@/hooks/api/useOrder";
import { useTakeOrderTrips } from "@/hooks/api/useTakeOrderTrips";
import { useLocale } from "@/hooks/useLocale";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTimezone } from "@/hooks/useTimezone";
import type { Order } from "@/types/order";
import { formatDate } from "@/utils/formatDate";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Fade,
  MenuItem,
  Modal,
  Paper,
  Stack,
  SwipeableDrawer,
  styled,
} from "@mui/material";
import { parseISO } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const takeOrderFormSchema = z.object({
  amount: z.number().min(1, { message: "金額不可小於1" }),
  currency: z.string().min(1, { message: "請選擇貨幣單位" }),
  tripId: z.string().min(1, { message: "請選擇旅途" }),
  date: z.date(),
});

export type TakeOrderFormValues = z.infer<typeof takeOrderFormSchema>;

const DEFAULT_VALUES: Partial<TakeOrderFormValues> = {
  amount: 1,
  currency: "",
  tripId: "",
  date: new Date(),
};

const StyledButton = styled(Button)({
  minWidth: "fit-content",
  maxWidth: "80%",
  width: "100%",
  fontSize: 14,
});

type TakeOrderPopupProps = {
  orderId: Order["orderId"];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (data: TakeOrderFormValues) => void;
};

export const TakeOrderPopup = (props: TakeOrderPopupProps) => {
  const { orderId, open, onOpen, onClose, onSubmit } = props;

  const locale = useLocale();
  const timezone = useTimezone();

  const isTablet = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TakeOrderFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(takeOrderFormSchema),
  });

  const { data: order } = useOrder(orderId);
  const { data: tripOptions = [] } = useTakeOrderTrips(orderId);

  const selectedTrip = tripOptions.find(
    (opt) => opt.tripId === watch("tripId")
  );
  const minDate = selectedTrip?.arrivalDate
    ? parseISO(selectedTrip?.arrivalDate)
    : undefined;
  const maxDate = order?.latestReceiveItemDate
    ? parseISO(order?.latestReceiveItemDate)
    : undefined;

  const hasTripOptions = tripOptions.length !== 0;

  const content = (
    <Stack component="form" spacing={6} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography variant="h5" as="p">
          向委託者出價
        </Typography>
        <Box position="relative">
          <NumberInput
            inputProps={{ min: 1 }}
            InputLabelProps={{ shrink: true }}
            fullWidth
            error={!!errors?.amount}
            helperText={errors.amount?.message}
            disabled={!hasTripOptions}
            InputProps={{
              endAdornment: (
                <CurrencyInput
                  control={control}
                  name="currency"
                  label="貨幣單位"
                  FormControlProps={{
                    disabled: !hasTripOptions,
                    size: "small",
                    sx: {
                      position: "absolute",
                      right: 0,
                      top: -9,
                      minWidth: 120,
                    },
                  }}
                />
              ),
            }}
            sx={{ "& input": { mr: 1 } }}
            control={control}
            name="amount"
          />
        </Box>
      </Stack>
      <Stack spacing={2}>
        <Typography variant="h5" as="p">
          請選擇旅途
        </Typography>
        <SelectInput
          control={control}
          name="tripId"
          label={hasTripOptions ? "旅途" : "沒有可用的旅途"}
          FormControlProps={{ disabled: !hasTripOptions }}
        >
          {tripOptions.map((opt) => (
            <MenuItem key={opt.tripId} value={opt.tripId}>
              {opt.fromCountryChineseName} → {opt.toCountryChineseName} (
              {formatDate({ date: opt.arrivalDate, timezone, locale })})
            </MenuItem>
          ))}
        </SelectInput>
      </Stack>
      <Stack spacing={2}>
        <Typography variant="h5" as="p">
          預計最晚送達日期
        </Typography>
        <DatePicker
          control={control}
          name="date"
          minDate={minDate}
          maxDate={maxDate}
          label="預計日期"
          disabled={!hasTripOptions || !selectedTrip}
          slotProps={{ popper: { placement: "bottom" } }}
        />
      </Stack>
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        gap={2}
      >
        <StyledButton size="small" onClick={onClose}>
          取消
        </StyledButton>
        <StyledButton size="small" type="submit" disabled={!hasTripOptions}>
          確定出價
        </StyledButton>
      </Box>
    </Stack>
  );

  if (isTablet) {
    return (
      <Modal open={open} onClose={onClose} closeAfterTransition>
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
      onClose={onClose}
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
