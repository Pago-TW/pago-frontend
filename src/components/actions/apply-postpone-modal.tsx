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

export const postponeReasons = [
  "FORCE_MAJEURE",
  "PERSONAL_FACTOR",
  "OTHER",
] as const;

export type PostponeReason = (typeof postponeReasons)[number];

export const postponeReasonLabelMap: Record<PostponeReason, string> = {
  FORCE_MAJEURE: "不可抗力因素",
  PERSONAL_FACTOR: "個人因素",
  OTHER: "其他",
};

export const applyPostponeFormSchema = z
  .object({
    reason: z.enum(postponeReasons),
    detail: z.string().optional(),
  })
  .refine((data) => data.reason !== "OTHER" || !!data.detail, {
    message: "請填寫原因",
    path: ["detail"],
  });

const DEFAULT_VALUES: ApplyPostponeFormValues = {
  reason: postponeReasons[0],
  detail: "",
};

export type ApplyPostponeFormValues = z.infer<typeof applyPostponeFormSchema>;
1;
export type ApplyPostponeModalProps = Pick<ModalProps, "open"> & {
  onClose: () => void;
  onSubmit: (data: ApplyPostponeFormValues) => void;
};

export const ApplyPostponeModal = ({
  open,
  onClose,
  onSubmit,
}: ApplyPostponeModalProps) => {
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
    resolver: zodResolver(applyPostponeFormSchema),
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
              延期原因
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} alignItems="center">
                <RadioGroupInput
                  control={control}
                  name="reason"
                  choices={postponeReasons.map((reason) => ({
                    label: postponeReasonLabelMap[reason],
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
                    申請延期
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

export default ApplyPostponeModal;
