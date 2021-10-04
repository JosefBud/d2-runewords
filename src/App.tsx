import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { ItemCard, Filters } from './components';
import './App.css';
import db from './db.json';

// const runesAvailable: string[] = [];
// db.forEach((runeword) => {
//   const { runes } = runeword;

//   runes.forEach((rune: string) => {
//     if (!runesAvailable.includes(rune)) runesAvailable.push(rune);
//   });

//   runesAvailable.sort();
// });

const App = () => {
  const [runewords] = useState(db);
  const [selectedItemCategories, setSelectedItemCategories] = useState<string[]>([]);
  const [selectedRunesAvailable, setSelectedRunesAvailable] = useState<string[]>([]);
  const [selectedLevelRange, setSelectedLevelRange] = useState<number[]>([1, 99]);

  useEffect(() => {
    forceCheck();
  }, [selectedItemCategories, selectedRunesAvailable, selectedLevelRange]);

  return (
    <Container>
      <Filters
        selectedItemCategories={selectedItemCategories}
        setSelectedItemCategories={setSelectedItemCategories}
        selectedRunesAvailable={selectedRunesAvailable}
        setSelectedRunesAvailable={setSelectedRunesAvailable}
        selectedLevelRange={selectedLevelRange}
        setSelectedLevelRange={setSelectedLevelRange}
      />
      <Grid container spacing={2} justifyContent="center">
        {/* eslint-disable-next-line array-callback-return */}
        {runewords.map((runeword: Runeword, runewordIndex: number) => {
          let itemCategoryMatch: boolean = false;
          // If user has selected any item category filters
          if (selectedItemCategories.length) {
            for (const category of selectedItemCategories) {
              if (runeword.items.includes(category)) {
                itemCategoryMatch = true;
                break;
              }
            }
          } else {
            // No filters selected
            itemCategoryMatch = true;
          }

          let runeMatch: boolean = false;
          // If user has selected any rune filters
          if (selectedRunesAvailable.length) {
            for (const rune of selectedRunesAvailable) {
              if (runeword.runes.includes(rune)) {
                runeMatch = true;
                break;
              }
            }
          } else {
            // No filters selected
            runeMatch = true;
          }

          const [minLevel, maxLevel] = selectedLevelRange;
          const levelMatch = runeword.level <= maxLevel && runeword.level >= minLevel;

          const noFilters: boolean =
            !selectedItemCategories.length &&
            !selectedRunesAvailable.length &&
            minLevel === 1 &&
            maxLevel === 99;
          const filterMatch: boolean = itemCategoryMatch && runeMatch && levelMatch;

          if (filterMatch || noFilters) {
            return (
              <Grid item xs={8} px={2} key={`runeword-${runewordIndex}`}>
                <LazyLoad height="100%" placeholder={<p>Scroll down!</p>}>
                  <ItemCard runeword={runeword} />
                </LazyLoad>
              </Grid>
            );
          }
        })}
      </Grid>
    </Container>
  );
};

export default App;
