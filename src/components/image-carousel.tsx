import { useCallback, useEffect, useState, type FC } from "react";
import Image from "next/image";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  alpha,
  Box,
  Chip,
  IconButton,
  styled,
  type SxProps,
} from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";

import type { Theme } from "@/styles/theme";

export interface ImageCarouselProps {
  images: string[];
  showButtons?: boolean;
  showProgress?: boolean;
}

const ControlButtonWrapper = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  opacity: 0.8,
  backgroundColor: alpha(theme.palette.common.white, 0.45),
  "&:disabled": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  "&:hover": {
    opacity: 1,
    backgroundColor: alpha(theme.palette.common.white, 0.7),
  },
  transition: theme.transitions.create(["opacity", "background-color"], {
    duration: 250,
  }),
}));

const commonIconSx: SxProps<Theme> = {
  m: 0.25,
  fontSize: (theme) => theme.typography.pxToRem(26),
  transform: "scale(1.5)",
};

export const ImageCarousel: FC<ImageCarouselProps> = (props) => {
  const { images, showButtons = true, showProgress = true } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    watchDrag: images.length > 1,
  });
  const [index, setIndex] = useState(1);

  useEffect(() => {
    if (!emblaApi) return;

    const getIndex = () => {
      setIndex(emblaApi.selectedScrollSnap() + 1);
    };

    emblaApi.on("select", getIndex);

    return () => {
      emblaApi.off("select", getIndex);
    };
  }, [emblaApi]);

  const handlePrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const isSingleImage = images.length === 1;

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      sx={{
        backgroundColor: "common.white",
        aspectRatio: "1 / 1",
        overflow: "hidden",
      }}
      ref={emblaRef}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "row",
        }}
      >
        {images.map((url, idx) => (
          <Box
            key={url}
            sx={{
              position: "relative",
              flex: "0 0 100%",
              minWidth: 0,
            }}
          >
            <Image
              src={url}
              alt="Image"
              fill
              sizes="(max-width: 600px) 300px, 400px"
              style={{ objectFit: "cover", objectPosition: "center center" }}
              priority={idx === 0}
            />
          </Box>
        ))}
      </Box>

      {showButtons && !isSingleImage ? (
        <>
          <ControlButtonWrapper
            size="small"
            onClick={handlePrev}
            sx={{ left: 0 }}
            disableTouchRipple
            disabled={index === 1}
          >
            <ChevronLeft sx={commonIconSx} />
          </ControlButtonWrapper>
          <ControlButtonWrapper
            size="small"
            onClick={handleNext}
            sx={{ right: 0 }}
            disableTouchRipple
            disabled={index === images.length}
          >
            <ChevronRight sx={commonIconSx} />
          </ControlButtonWrapper>
        </>
      ) : null}

      {showProgress ? (
        <Chip
          label={`${index} / ${images.length}`}
          size="small"
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
            backgroundColor: (theme) => alpha(theme.palette.common.white, 0.7),
            fontSize: (theme) => theme.typography.pxToRem(15),
          }}
        />
      ) : null}
    </Box>
  );
};
