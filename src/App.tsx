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
  const [selectedModifiers, setSelectedModifiers] = useState<string[]>([]);
  const [selectedLevelRange, setSelectedLevelRange] = useState<number[]>([1, 99]);

  useEffect(() => {
    forceCheck();
  }, [selectedItemCategories, selectedRunesAvailable, selectedLevelRange, selectedModifiers]);

  return (
    <Container>
      <Filters
        selectedItemCategories={selectedItemCategories}
        setSelectedItemCategories={setSelectedItemCategories}
        selectedRunesAvailable={selectedRunesAvailable}
        setSelectedRunesAvailable={setSelectedRunesAvailable}
        selectedModifiers={selectedModifiers}
        setSelectedModifiers={setSelectedModifiers}
        selectedLevelRange={selectedLevelRange}
        setSelectedLevelRange={setSelectedLevelRange}
      />
      <Grid container spacing={2} justifyContent="center">
        {/* eslint-disable-next-line array-callback-return */}
        {runewords.map((runeword: Runeword, runewordIndex: number) => {
          const { stats } = runeword;

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

          let modifierMatch: boolean = true;
          // If user has selected any modifier filters
          if (selectedModifiers.length) {
            const availableModifiers = [];

            // Create array of available modifiers
            for (const stat of stats) {
              availableModifiers.push(stat.modifier);
            }

            // Check all selected modifiers against the available ones
            for (const selectedModifier of selectedModifiers) {
              // If there's a single one that's not available, there is no match
              if (!availableModifiers.includes(selectedModifier)) {
                modifierMatch = false;
                break;
              }
            }
          }

          const [minLevel, maxLevel] = selectedLevelRange;
          const levelMatch = runeword.level <= maxLevel && runeword.level >= minLevel;

          const noFilters: boolean =
            !selectedItemCategories.length &&
            !selectedRunesAvailable.length &&
            !selectedModifiers.length &&
            minLevel === 1 &&
            maxLevel === 99;
          const filterMatch: boolean =
            itemCategoryMatch && runeMatch && modifierMatch && levelMatch;

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
