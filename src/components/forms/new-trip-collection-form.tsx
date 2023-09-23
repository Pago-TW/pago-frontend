import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { Add, Delete } from "@mui/icons-material";
import { Button, Stack, styled, TextField } from "@mui/material";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";

import { CountryCitySelect } from "@/components/inputs/country-city-select";
import { DatePicker } from "@/components/inputs/date-picker";
import { SubmitButton } from "@/components/submit-button";
import { Paper } from "@/components/ui/paper";
import { useAddTripCollection } from "@/hooks/api/use-add-trip-collection";
import {
  newTripCollectionFormSchema,
  type NewTripCollectionFormValues,
} from "@/schemas/new-trip-collection";
import { utcNow } from "@/utils/date";
import { generateCollectionName } from "@/utils/trip";

const defaultValues: Partial<NewTripCollectionFormValues> = {
  tripCollectionName: "",
  departure: {
    countryCode: "",
    cityCode: "",
  },
  stops: [
    {
      place: {
        countryCode: "",
        cityCode: "",
      },
      arrivalDate: utcNow().startOf("day"),
    },
  ],
};

const useNewTripFormContext = useFormContext<NewTripCollectionFormValues>;

const Wrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const DepartureInput = () => {
  const { control } = useNewTripFormContext();

  return (
    <Wrapper>
      <CountryCitySelect
        control={control}
        name="departure"
        placeholder="出發地"
      />
    </Wrapper>
  );
};

const StopoverInput = ({
  idx,
  onRemoveStopover: onRemove,
}: {
  idx: number;
  onRemoveStopover: () => void;
}) => {
  const { control, watch } = useNewTripFormContext();

  const minDate = watch(`stops.${idx - 1}.arrivalDate`)?.add(1, "day");

  return (
    <Wrapper>
      <Stack direction="row" gap={1}>
        <Stack gap={2} flexGrow={1}>
          <CountryCitySelect
            control={control}
            name={`stops.${idx}.place`}
            placeholder="目的地"
          />
          <DatePicker
            control={control}
            name={`stops.${idx}.arrivalDate`}
            label="抵達日期"
            sx={{ flexGrow: 1 }}
            minDate={minDate}
            disablePast
          />
        </Stack>
        <Button
          size="small"
          color="base"
          onClick={onRemove}
          sx={{ minWidth: 0 }}
          disabled={idx === 0}
        >
          <Delete />
        </Button>
      </Stack>
    </Wrapper>
  );
};

const AddStopoverClickable = ({
  onAddStopover: onAppend,
}: {
  onAddStopover: () => void;
}) => {
  return (
    <Wrapper
      onClick={onAppend}
      sx={{
        display: "flex",
        alignItems: "center",
        color: "base.500",
        cursor: "pointer",
        transition: (theme) => theme.transitions.create("background-color"),
        "&:hover": {
          bgcolor: "base.50",
        },
      }}
    >
      <Add /> 新增地點
    </Wrapper>
  );
};

const StopoversInput = () => {
  const { getValues } = useNewTripFormContext();
  const { fields, append, remove } = useFieldArray<
    NewTripCollectionFormValues,
    "stops"
  >({
    name: "stops",
  });

  const handleRemoveStopover = (idx: number) => () => {
    remove(idx);
  };
  const handleAddStopover = () => {
    const lastStop = getValues(`stops`).at(-1);
    const newFieldArrivalDate =
      lastStop?.arrivalDate?.add(1, "day") ?? utcNow().startOf("day");
    append({
      place: {
        countryCode: "",
        cityCode: "",
      },
      arrivalDate: newFieldArrivalDate,
    });
  };

  return (
    <Stack gap={2}>
      {fields.map((item, idx) => (
        <StopoverInput
          key={item.id}
          idx={idx}
          onRemoveStopover={handleRemoveStopover(idx)}
        />
      ))}
      <AddStopoverClickable onAddStopover={handleAddStopover} />
    </Stack>
  );
};

const TripNameInput = () => {
  const { control, watch } = useNewTripFormContext();

  const stops = watch("stops");
  const firstArrivalDate = stops.at(0)?.arrivalDate;
  const lastArrivalDate = stops.at(-1)?.arrivalDate;
  const placeholder = generateCollectionName(firstArrivalDate, lastArrivalDate);

  return (
    <Wrapper>
      <Controller
        control={control}
        name="tripCollectionName"
        render={({ field: { ref, ...field } }) => (
          <TextField
            {...field}
            inputRef={ref}
            label="旅途名稱"
            placeholder={placeholder}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
    </Wrapper>
  );
};

export const NewTripCollectionForm = () => {
  const router = useRouter();

  const methods = useForm<NewTripCollectionFormValues>({
    resolver: zodResolver(newTripCollectionFormSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading, isSuccess } = useAddTripCollection();

  const handleFormSubmit = handleSubmit((data) => {
    mutate(data, { onSuccess: () => void router.push("/trips") });
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit}>
        <Stack gap={2}>
          <DepartureInput />
          <StopoversInput />
          <TripNameInput />
          <SubmitButton fullWidth loading={isLoading} success={isSuccess}>
            新增旅途
          </SubmitButton>
        </Stack>
      </form>
    </FormProvider>
  );
};
