import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SelectStyled from "./FilterStyled";
import {
  changeStyleActionCreator,
  loadPagesActionCreator,
} from "../../redux/features/uiSlice/uiSlice";

const Filter = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const currentStyle = useAppSelector((state) => state.ui.style);

  const handleFilterChange = (event: SelectChangeEvent) => {
    dispatch(changeStyleActionCreator(event.target.value));
    dispatch(
      loadPagesActionCreator({
        currentPage: 0,
        totalPages: 1,
      })
    );
  };

  return (
    <SelectStyled sx={{ minWidth: 100 }}>
      <FormControl
        sx={{ width: "fit-content" }}
        variant="filled"
        className="select"
      >
        <InputLabel id="style-select-label">Styles</InputLabel>
        <Select
          labelId="style-select-label"
          id="style-select"
          value={currentStyle}
          label="Styles"
          onChange={handleFilterChange}
        >
          <MenuItem value={"all"}>All Sessions</MenuItem>
          <MenuItem value={"karate"}>Karate</MenuItem>
          <MenuItem value={"mma"}>MMA</MenuItem>
          <MenuItem value={"boxing"}>Boxing</MenuItem>
          <MenuItem value={"kickboxing"}>Kickboxing</MenuItem>
        </Select>
      </FormControl>
    </SelectStyled>
  );
};

export default Filter;
