import { Dispatch, SetStateAction, useState } from 'react';
import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ITEM_CATEGORIES: string[] = [
  'All Weapons',
  'Axes',
  'Body Armor',
  'Bows',
  'Claws',
  'Clubs',
  'Hammers',
  'Head Armor',
  'Maces',
  'Melee Weapons',
  'Paladin Shields',
  'Polearms',
  'Scepters',
  'Shields',
  'Staves',
  'Swords',
  'Wands'
];

type FiltersProps = {
  selectedItemCategories: string[];
  setSelectedItemCategories: Dispatch<SetStateAction<string[]>>;
};

const Filters = ({ selectedItemCategories, setSelectedItemCategories }: FiltersProps) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: theme.palette.secondary.main,
        margin: 4,
        padding: 4,
        justifyContent: 'center'
      }}
    >
      <Typography variant="h3">Filters</Typography>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="item-types-label">Item Types</InputLabel>
        <Select
          labelId="item-types-label"
          id="item-types"
          multiple
          value={selectedItemCategories}
          onChange={({ target: { value } }) => {
            setSelectedItemCategories(
              // On autofill we get a stringified value.
              typeof value === 'string' ? value.split(',') : value
            );
          }}
          // input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {ITEM_CATEGORIES.map((itemCategory) => (
            <MenuItem key={itemCategory} value={itemCategory}>
              <Checkbox checked={selectedItemCategories.includes(itemCategory)} />
              <ListItemText primary={itemCategory} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
};

export default Filters;
