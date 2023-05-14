import { CurrencyInput } from "@/components/inputs/CurrencyInput";
import { DatePicker } from "@/components/inputs/DatePicker";
import { SelectInput } from "@/components/inputs/SelectInput";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { useOrder } from "@/hooks/api/useOrder";
import { useTakeOrderTrips } from "@/hooks/api/useTakeOrderTrips";
import { useLocale } from "@/hooks/useLocale";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Order } from "@/types/order";
import { formatDate } from "@/utils/formatDateTime";
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
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";

export const takeOrderFormSchema = z.object({
  amount: z
    .number({ required_error: "請輸入金額", invalid_type_error: "請輸入金額" })
    .min(1, { message: "金額不可小於1" }),
  currency: z.string().min(1, { message: "請選擇貨幣單位" }),
  tripId: z.string().min(1, { message: "請選擇旅途" }),
  date: z.date(),
});

export type TakeOrderFormValues = z.infer<typeof takeOrderFormSchema>;

const DEFAULT_VALUES: Partial<TakeOrderFormValues> = {
  amount: 0,
  currency: "TWD",
  tripId: "",
  date: new Date(),
};

const StyledButton = styled(Button)({
  minWidth: "fit-content",
  maxWidth: "80%",
  width: "100%",
  fontSize: 14,
});

const StyledInput = styled("input")(({ theme }) => ({
  border: 0,
  outline: 0,
  borderBottom: `1px solid ${theme.palette.base.main}`,
  transition: theme.transitions.create("border-color"),
  "&:hover:not(:disabled)": {
    borderBottom: `2px solid ${theme.palette.pago.main}`,
  },
  "&:focus:not(:disabled)": {
    borderBottom: `2px solid ${theme.palette.pago.main}`,
  },
  "&:disabled": {
    color: theme.palette.text.disabled,
    borderBottom: `1px solid ${theme.palette.base.main}`,
    pointerEvents: "none",
  },
  padding: theme.spacing(0.5, 0),
  fontSize: 16,
  width: "100%",
}));

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

  const isTablet = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const { control, handleSubmit, watch } = useForm<TakeOrderFormValues>({
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
        <Box display="flex">
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, ...field } }) => (
              <NumericFormat
                disabled={!hasTripOptions}
                allowNegative={false}
                customInput={StyledInput}
                decimalScale={0}
                onValueChange={(values) => onChange(values.floatValue ?? 0)}
                {...field}
              />
            )}
          />
          <CurrencyInput
            control={control}
            name="currency"
            label="貨幣單位"
            FormControlProps={{
              disabled: !hasTripOptions,
              size: "small",
              sx: { minWidth: 120 },
            }}
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
              {formatDate({ date: opt.arrivalDate, locale })})
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
