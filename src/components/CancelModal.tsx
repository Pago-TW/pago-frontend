import { zodResolver } from "@hookform/resolvers/zod";
import type { ModalProps } from "@mui/material";
import {
  Collapse,
  Fade,
  FormControl,
  FormHelperText,
  Modal,
  Paper,
  Stack,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroupInput } from "./inputs/RadioGroupInput";
import { Button } from "./ui/Button";
import { FilledTextarea } from "./ui/FilledTextarea";
import { Typography } from "./ui/Typography";

export const reasons = [
  "OUT_OF_STOCK",
  "FORCE_MAJEURE",
  "PERSONAL_FACTOR",
  "OTHER",
] as const;

const reasonLabelMap: Record<(typeof reasons)[number], string> = {
  OUT_OF_STOCK: "商品缺貨",
  FORCE_MAJEURE: "不可抗力因素",
  PERSONAL_FACTOR: "個人因素",
  OTHER: "其他",
};

export const cancelFormSchema = z
  .object({
    reason: z.enum(reasons),
    detail: z.string().optional(),
  })
  .refine((data) => data.reason !== "OTHER" || !!data.detail, {
    message: "請填寫原因",
    path: ["detail"],
  });

const DEFAULT_VALUES: CancelFormValues = {
  reason: reasons[0],
  detail: "",
};

export type CancelFormValues = z.infer<typeof cancelFormSchema>;

export type CancelModalProps = Pick<ModalProps, "open"> & {
  onClose: () => void;
  onSubmit: (data: CancelFormValues) => void;
};

export const CancelModal = ({ open, onClose, onSubmit }: CancelModalProps) => {
  const [showTextarea, setShowTextarea] = useState(false);

  const {
    register,
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(cancelFormSchema),
  });

  const handleRadioChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isOther = e.target.value === "OTHER";
      setShowTextarea(isOther);

      if (!isOther) setValue("detail", "");
    },
    [setValue]
  );

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Paper
          sx={{
            px: 3,
            py: { xs: 6, md: 4 },
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: 2,
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h5" weightPreset="bold" textAlign="center">
              取消原因
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} alignItems="center">
                <RadioGroupInput
                  control={control}
                  name="reason"
                  choices={reasons.map((reason) => ({
                    label: reasonLabelMap[reason],
                    value: reason,
                  }))}
                  onChange={handleRadioChange}
                />
                <Collapse
                  in={showTextarea}
                  orientation="vertical"
                  mountOnEnter
                  sx={{ width: "100%" }}
                >
                  <FormControl error={!!errors.detail} fullWidth>
                    <FilledTextarea
                      placeholder="其他原因"
                      {...register("detail")}
                    />
                    {!!errors.detail ? (
                      <FormHelperText sx={{ m: 0 }}>
                        {errors.detail?.message}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Collapse>
                <Stack direction="row" spacing={1}>
                  <Button
                    type="submit"
                    variant="outlined"
                    size="small"
                    color="error"
                  >
                    確定取消
                  </Button>
                  <Button variant="contained" size="small" onClick={onClose}>
                    返回
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default CancelModal;
