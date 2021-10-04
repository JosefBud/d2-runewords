import { Dispatch, SetStateAction } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

type FilterProps = {
  selected: string[];
  selectedSetter: Dispatch<SetStateAction<string[]>>;
  label: string;
  choices: string[];
};

const MultiselectFilter = ({ selected, selectedSetter, label, choices }: FilterProps) => {
  const theme = useTheme();
  const filterID = label.toLowerCase().replace(' ', '-');

  return (
    <FormControl sx={{ m: 1 }} fullWidth>
      <InputLabel
        id={`${filterID}-label`}
        sx={{ backgroundColor: theme.palette.secondary.main }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${filterID}-label`}
        id={filterID}
        multiple
        value={selected}
        onChange={({ target: { value } }) => {
          selectedSetter(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
          );
        }}
        // input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(', ')}
      >
        {choices.map((choice) => (
          <MenuItem key={choice} value={choice}>
            <Checkbox checked={selected.includes(choice)} />
            <ListItemText primary={choice} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiselectFilter;
