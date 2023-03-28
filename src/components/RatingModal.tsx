import { zodResolver } from "@hookform/resolvers/zod";
import type { ModalProps } from "@mui/material";
import {
  Avatar,
  Box,
  Collapse,
  Fade,
  FormControl,
  FormHelperText,
  Modal,
  Paper,
  Stack,
} from "@mui/material";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useController, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/Button";
import { FilledTextarea } from "./ui/FilledTextarea";
import { Image } from "./ui/Image";
import { Rating } from "./ui/Rating";
import { Typography } from "./ui/Typography";
import { Video } from "./ui/Video";

export const ratingFormSchema = z.object({
  rating: z.number().int().min(1).max(5),
  review: z.string().optional(),
  files: z
    .custom<FileList>((fileList) => fileList instanceof FileList, {
      message: "請上傳檔案",
    })
    .refine((fileList) => fileList.length <= 10, {
      message: "最多只能上傳十個圖片/影片",
    }),
});

export type RatingFormValues = z.infer<typeof ratingFormSchema>;

const QuickReview = ({
  onClick,
  content,
}: {
  onClick: () => void;
  content: string;
}) => {
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={onClick}
      sx={{
        color: "pago.300",
        fontSize: 14,
        minWidth: 0,
      }}
    >
      {content}
    </Button>
  );
};

const QUICK_REVIEW_ITEMS = ["超快速的代購速度！", "優質的聯絡態度！"] as const;

type FileUploadProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  error?: boolean;
  helperText?: string;
};

type Preview = {
  url: string;
  type: `image/${string}` | `video/${string}`;
};

const FileUpload = <T extends FieldValues>({
  control,
  name,
  error,
  helperText,
}: FileUploadProps<T>) => {
  const [previews, setPreviews] = useState<Preview[]>([]);

  const { field } = useController({ control, name });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    field.onChange(e.target.files);
    setPreviews(
      [...e.target.files].map(
        (file) =>
          ({
            url: URL.createObjectURL(file),
            type: file.type,
          } as Preview)
      )
    );
  };

  return (
    <FormControl component={Stack} error={error} spacing={1}>
      <Button component="label" variant="outlined" size="medium">
        增加圖片/影片
        <input
          type="file"
          accept="image/*, video/*"
          multiple
          hidden
          onChange={handleChange}
        />
      </Button>
      {previews.length > 0 ? (
        <Stack
          direction="row"
          spacing={1}
          width="100%"
          height="100%"
          sx={{ overflowX: "auto", overflowY: "hidden" }}
        >
          {previews.map((preview) => (
            <Box
              key={preview.url}
              position="relative"
              flexShrink={0}
              width={{ xs: 75, md: 150 }}
              height={{ xs: 75, md: 150 }}
            >
              {preview.type.startsWith("image/") ? (
                <Image
                  src={preview.url}
                  alt="Preview image"
                  onLoad={() => URL.revokeObjectURL(preview.url)}
                  fill
                  sizes="(max-width: 600px) 75px, 150px"
                  sx={{
                    borderRadius: 2,
                    flexShrink: 0,
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                />
              ) : (
                <Video
                  src={preview.url}
                  width="100%"
                  height="100%"
                  autoPlay
                  muted
                  loop
                  disablePictureInPicture
                  disableRemotePlayback
                  sx={{
                    borderRadius: 2,
                    flexShrink: 0,
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                >
                  <source src={preview.url} type={preview.type} />
                </Video>
              )}
            </Box>
          ))}
        </Stack>
      ) : null}
      {helperText ? (
        <FormHelperText sx={{ m: 0 }}>{helperText}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export type RatingModalProps = Pick<ModalProps, "open"> & {
  perspective: "consumer" | "shopper";
  onClose: () => void;
  onSubmit: (data: RatingFormValues) => void;
};

const DEFAULT_VALUES: Partial<RatingFormValues> = {
  review: "",
  rating: 0,
};
export const RatingModal = ({
  open,
  perspective,
  onClose,
  onSubmit,
}: RatingModalProps) => {
  const {
    register,
    control,
    formState: { isDirty, errors },
    getValues,
    setValue,
    handleSubmit,
    reset,
  } = useForm<RatingFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(ratingFormSchema),
  });

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const handleQuickReview = useCallback(
    (content: string) => {
      const oldReview = getValues("review");
      setValue("review", [oldReview, content].filter(Boolean).join(""));
    },
    [getValues, setValue]
  );

  const target = perspective === "consumer" ? "代購者" : "委託者";

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
            maxWidth: 400,
            transform: "translate(-50%, -50%)",
            borderRadius: 2,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} alignItems="center">
              <Typography variant="h5" weightPreset="bold" textAlign="center">
                為此{target}評價
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar />
                <Typography variant="h5">使用者名稱</Typography>
              </Stack>
              <Rating name="rating" control={control} size="large" />
              <Collapse
                in={isDirty}
                orientation="vertical"
                sx={{ width: "100%" }}
                mountOnEnter
              >
                <Stack spacing={1}>
                  <FileUpload
                    control={control}
                    name="files"
                    error={!!errors.files}
                    helperText={errors.files?.message}
                  />
                  <FilledTextarea
                    placeholder="分享您的購物體驗！"
                    {...register("review")}
                  />
                  <Stack
                    direction="row"
                    gap={0.5} // Using gap here since flex wrap doesn't work with spacing
                    flexWrap="wrap"
                    pb={4}
                  >
                    {QUICK_REVIEW_ITEMS.map((content) => (
                      <QuickReview
                        key={content}
                        content={content}
                        onClick={() => handleQuickReview(content)}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Collapse>
              <Stack direction="row" spacing={1} width="100%">
                <Button size="medium" onClick={onClose} fullWidth>
                  稍後再說
                </Button>
                <Button type="submit" size="medium" fullWidth>
                  完成評價
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Fade>
    </Modal>
  );
};
