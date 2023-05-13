import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Fade,
  IconButton,
  Modal,
  Paper,
  Stack,
  SwipeableDrawer,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import DatePicker from "./inputs/DatePicker";
import { NumberInput } from "./inputs/NumberInput";
import { Button } from "./ui/Button";
import { Typography } from "./ui/Typography";

const currentDate = new Date();

export type FilterMorePopupProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const FilterMorePopup = ({
  open,
  onOpen,
  onClose,
}: FilterMorePopupProps) => {
  const { control, setValue } = useFormContext();

  const isTablet = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const content = (
    <Stack spacing={2}>
      <Stack spacing={2}>
        <Typography color="base.500">代購費</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <NumberInput control={control} name="fee.min" variant="outlined" />
          <Typography>-</Typography>
          <NumberInput control={control} name="fee.max" variant="outlined" />
        </Box>
      </Stack>
      <Stack spacing={2}>
        <Typography color="base.500">最晚收到商品時間</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <DatePicker
            control={control}
            name="latestReceiveDate"
            sx={{ flexGrow: 1 }}
            minDate={currentDate}
          />
          <IconButton onClick={() => setValue("latestReceiveDate", null)}>
            <Delete />
          </IconButton>
        </Box>
      </Stack>
      <Button onClick={onClose}>確定</Button>
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
