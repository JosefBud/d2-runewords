import { Dispatch, SetStateAction, useState } from 'react';
import { Box, Slider, Typography } from '@mui/material';

type SliderFilterProps = {
  selected: number[];
  selectedSetter: Dispatch<SetStateAction<number[]>>;
  label: string;
  range: number[];
};

const SliderFilter = ({ selected, selectedSetter, label, range }: SliderFilterProps) => {
  const [value, setValue] = useState(selected);
  const [min, max] = range;

  return (
    <Box>
      <Slider
        getAriaLabel={() => 'Character Level'}
        value={value}
        min={min}
        max={max}
        onChange={(event, newValue) => {
          Array.isArray(newValue) ? setValue(newValue) : setValue([newValue, newValue]);
        }}
        onChangeCommitted={() => selectedSetter(value)}
        valueLabelDisplay="on"
        getAriaValueText={(currentValue) => `${currentValue}`}
      />
      <Typography>Character Level Range</Typography>
    </Box>
  );
};

export default SliderFilter;
