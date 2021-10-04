import { Dispatch, SetStateAction } from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MultiselectFilter from './MultiselectFilter';
import SliderFilter from './SliderFilter';

import { ITEM_CATEGORIES, RUNES_AVAILABLE } from '../../constants';
import db from '../../db.json';
const modifierList: string[] = [];
db.forEach((runeword) => {
  const { stats } = runeword;

  stats.forEach((stat) => {
    const { modifier } = stat;
    if (modifier && !modifierList.includes(modifier)) {
      modifierList.push(modifier);
    }
  });
});
modifierList.sort();

type FiltersProps = {
  selectedItemCategories: string[];
  setSelectedItemCategories: Dispatch<SetStateAction<string[]>>;
  selectedRunesAvailable: string[];
  setSelectedRunesAvailable: Dispatch<SetStateAction<string[]>>;
  selectedModifiers: string[];
  setSelectedModifiers: Dispatch<SetStateAction<string[]>>;
  selectedLevelRange: number[];
  setSelectedLevelRange: Dispatch<SetStateAction<number[]>>;
};

const Filters = ({
  selectedItemCategories,
  setSelectedItemCategories,
  selectedRunesAvailable,
  setSelectedRunesAvailable,
  selectedModifiers,
  setSelectedModifiers,
  selectedLevelRange,
  setSelectedLevelRange
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
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={4}>
          <MultiselectFilter
            label="Item Types"
            choices={ITEM_CATEGORIES}
            selected={selectedItemCategories}
            selectedSetter={setSelectedItemCategories}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MultiselectFilter
            label="Runes Available"
            choices={RUNES_AVAILABLE}
            selected={selectedRunesAvailable}
            selectedSetter={setSelectedRunesAvailable}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MultiselectFilter
            label="Modifiers"
            choices={modifierList}
            selected={selectedModifiers}
            selectedSetter={setSelectedModifiers}
          />
        </Grid>
        <Grid item xs={12} md={10} mt={4}>
          <SliderFilter
            label="Character Level"
            range={[1, 99]}
            selected={selectedLevelRange}
            selectedSetter={setSelectedLevelRange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Filters;
