import { styled } from "@mui/material";
import NextImage from "next/image";
import type { ComponentProps } from "react";

export type ImageProps = ComponentProps<typeof Image>;

export const Image = styled(NextImage)({});

export default Image;
