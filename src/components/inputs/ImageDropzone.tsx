import { Add } from "@mui/icons-material";
import type {
  BoxProps,
  FormHelperTextProps,
  InputLabelProps,
} from "@mui/material";
import { Box, FormHelperText, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";

export type SelectImageProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: InputLabelProps["children"];
  sx?: BoxProps["sx"];
  error?: InputLabelProps["error"] & FormHelperTextProps["error"];
  helperText?: FormHelperTextProps["children"];
};

const dashedBorderUrl = `"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23C4C4C4FF' stroke-width='4' stroke-dasharray='9' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e"`;

export const ImageDropzone = <T extends FieldValues>({
  control,
  name,
  label,
  sx,
  error,
  helperText,
}: SelectImageProps<T>) => {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    field: { onChange },
  } = useController({ control, name });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    multiple: false,
    onDrop: (acceptedFiles: (Blob | MediaSource)[]) => {
      const imageFile = acceptedFiles[0];
      if (imageFile) {
        onChange(imageFile);
        setPreview(URL.createObjectURL(imageFile));
      }
    },
  });

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const dropzoneBackground = preview
    ? `url(${preview})`
    : `url(${dashedBorderUrl})`;

  return (
    <div>
      <InputLabel error={error} shrink>
        {label}
      </InputLabel>
      <Box
        {...getRootProps({
          sx: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundImage: dropzoneBackground,
            ...sx,
          },
        })}
      >
        <input {...getInputProps()} />
        {!preview ? <Add sx={{ color: "base.300" }} /> : null}
      </Box>
      {helperText ? (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      ) : null}
    </div>
  );
};

export default ImageDropzone;
