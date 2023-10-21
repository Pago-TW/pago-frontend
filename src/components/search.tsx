import { useCallback, useRef, type ChangeEvent } from "react";

import { ClickAwayListener } from "@mui/base";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, IconButton, InputBase, Stack, styled } from "@mui/material";

import { useMediaQuery } from "@/hooks/use-media-query";

const SearchBase = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  transition: theme.transitions.create(["background-color", "width"]),
  width: "100%",
  overflowX: "hidden",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ClearIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  top: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: theme.typography.pxToRem(18),
  color: alpha(theme.palette.common.white, 0.75),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  height: 36,
  "& .MuiInputBase-input": {
    height: "100%",
    padding: theme.spacing(0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: `calc(1em + ${theme.spacing(2)})`,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "23ch",
    },
  },
}));

export const Search = ({
  expand,
  onExpand,
  query,
  onQueryChange,
  onQueryClear,
}: {
  expand: boolean;
  onExpand: (expand: boolean) => void;
  query: string;
  onQueryChange: (query: string) => void;
  onQueryClear: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const hasQuery = query.length > 0;
  const showSearch = smUp || expand;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onQueryChange(e.target.value),
    [onQueryChange]
  );

  const handleClear = useCallback(() => {
    onQueryClear();
    inputRef.current?.focus();
  }, [onQueryClear]);

  const handleExpand = useCallback(() => {
    onExpand(true);
    inputRef.current?.focus();
  }, [onExpand]);

  const handleFocus = () => onExpand(true);
  const handleBlur = () => {
    if (smUp) onExpand(false);
  };

  return (
    <Stack direction="row" width="100%" justifyContent="end">
      {!showSearch ? (
        <IconButton
          size="large"
          onClick={handleExpand}
          sx={{ color: (theme) => theme.palette.common.white }}
        >
          <SearchIcon />
        </IconButton>
      ) : null}
      <ClickAwayListener onClickAway={handleBlur}>
        <SearchBase
          sx={[
            showSearch && { marginRight: 1 },
            !showSearch && { opacity: 0, width: 0 },
            { position: "relative" },
          ]}
          ref={searchRef}
        >
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            startAdornment={
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
            }
            endAdornment={
              hasQuery ? (
                <ClearIconWrapper>
                  <CloseIcon
                    onClick={handleClear}
                    sx={{ cursor: "pointer" }}
                    fontSize="inherit"
                    color="inherit"
                  />
                </ClearIconWrapper>
              ) : null
            }
            onChange={handleChange}
            onFocus={handleFocus}
            value={query}
            inputRef={inputRef}
          />
          {/* <SearchPopup open={expand} anchorEl={searchRef}>
            TODO: a list of search histories & suggestions
          </SearchPopup> */}
        </SearchBase>
      </ClickAwayListener>
    </Stack>
  );
};
export default Search;
