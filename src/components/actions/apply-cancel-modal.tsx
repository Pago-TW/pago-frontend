import { useCallback, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Collapse,
  Fade,
  FormControl,
  FormHelperText,
  Modal,
  Paper,
  Stack,
  type ModalProps,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { RadioGroupInput } from "@/components/inputs/radio-group-input";
import { Button } from "@/components/ui/button";
import { FilledTextarea } from "@/components/ui/filled-textarea";
import { Typography } from "@/components/ui/typography";

export const cancelReasons = [
  "OUT_OF_STOCK",
  "FORCE_MAJEURE",
  "PERSONAL_FACTOR",
  "OTHER",
] as const;

export type CancelReason = (typeof cancelReasons)[number];

export const cancelReasonLabelMap: Record<CancelReason, string> = {
  OUT_OF_STOCK: "商品缺貨",
  FORCE_MAJEURE: "不可抗力因素",
  PERSONAL_FACTOR: "個人因素",
  OTHER: "其他",
};

export const applyCancelFormSchema = z
  .object({
    reason: z.enum(cancelReasons),
    detail: z.string().optional(),
  })
  .refine((data) => data.reason !== "OTHER" || !!data.detail, {
    message: "請填寫原因",
    path: ["detail"],
  });

const DEFAULT_VALUES: ApplyCancelFormValues = {
  reason: cancelReasons[0],
  detail: "",
};

export type ApplyCancelFormValues = z.infer<typeof applyCancelFormSchema>;

export type ApplyCancelModalProps = Pick<ModalProps, "open"> & {
  onClose: () => void;
  onSubmit: (data: ApplyCancelFormValues) => void;
};

export const ApplyCancelModal = ({
  open,
  onClose,
  onSubmit,
}: ApplyCancelModalProps) => {
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
    resolver: zodResolver(applyCancelFormSchema),
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
                  choices={cancelReasons.map((reason) => ({
                    label: cancelReasonLabelMap[reason],
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
                    {errors.detail ? (
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

export default ApplyCancelModal;
