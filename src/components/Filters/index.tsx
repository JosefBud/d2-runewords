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
  Typography,
  Grid
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

const RUNES_AVAILABLE: string[] = [
  'Amn',
  'Ber',
  'Cham',
  'Dol',
  'El',
  'Eld',
  'Eth',
  'Fal',
  'Gul',
  'Hel',
  'Io',
  'Ist',
  'Ith',
  'Jah',
  'Ko',
  'Lem',
  'Lo',
  'Lum',
  'Mal',
  'Nef',
  'Ohm',
  'Ort',
  'Pul',
  'Ral',
  'Shael',
  'Sol',
  'Sur',
  'Tal',
  'Thul',
  'Tir',
  'Um',
  'Vex',
  'Zod'
];

type FiltersProps = {
  selectedItemCategories: string[];
  setSelectedItemCategories: Dispatch<SetStateAction<string[]>>;
  selectedRunesAvailable: string[];
  setSelectedRunesAvailable: Dispatch<SetStateAction<string[]>>;
};

const Filters = ({
  selectedItemCategories,
  setSelectedItemCategories,
  selectedRunesAvailable,
  setSelectedRunesAvailable
}: FiltersProps) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: theme.palette.secondary.main,
        margin: 4,
        padding: 4,
        textAlign: 'center'
      }}
    >
      <Typography variant="h3">Filters</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormControl sx={{ m: 1 }} fullWidth>
            <InputLabel
              id="item-types-label"
              sx={{ backgroundColor: theme.palette.secondary.main }}
            >
              Item Types
            </InputLabel>
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
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl sx={{ m: 1 }} fullWidth>
            <InputLabel
              id="runes-available-label"
              sx={{ backgroundColor: theme.palette.secondary.main }}
            >
              Runes Available
            </InputLabel>
            <Select
              labelId="runes-available-label"
              id="runes-available"
              multiple
              value={selectedRunesAvailable}
              onChange={({ target: { value } }) => {
                setSelectedRunesAvailable(
                  // On autofill we get a stringified value.
                  typeof value === 'string' ? value.split(',') : value
                );
              }}
              // input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {RUNES_AVAILABLE.map((rune) => (
                <MenuItem key={rune} value={rune}>
                  <Checkbox checked={selectedRunesAvailable.includes(rune)} />
                  <ListItemText primary={rune} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Filters;
