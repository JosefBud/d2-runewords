import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import LazyLoad from 'react-lazyload';
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
  const [runewords, setRunewords] = useState(db);
  const [selectedItemCategories, setSelectedItemCategories] = useState<string[]>([]);
  const [selectedRunesAvailable, setSelectedRunesAvailable] = useState<string[]>([]);
  const [isAmazon, setIsAmazon] = useState(false);

  useEffect(() => {
    console.log('items', selectedItemCategories);
    console.log('runes', selectedRunesAvailable);
  }, [selectedItemCategories, selectedRunesAvailable]);

  return (
    <Container>
      <Filters
        selectedItemCategories={selectedItemCategories}
        setSelectedItemCategories={setSelectedItemCategories}
        selectedRunesAvailable={selectedRunesAvailable}
        setSelectedRunesAvailable={setSelectedRunesAvailable}
      />
      <Grid container spacing={2} justifyContent="center">
        {/* eslint-disable-next-line array-callback-return */}
        {runewords.map((runeword, runewordIndex) => {
          let filterMatch = false;

          for (const category of selectedItemCategories) {
            if (runeword.items.includes(category)) {
              filterMatch = true;
              break;
            }
          }

          for (const rune of selectedRunesAvailable) {
            console.log('checking rune', rune);
            if (runeword.runes.includes(rune)) {
              console.log('match!');
              filterMatch = true;
              break;
            }
          }

          const noFilters = !selectedItemCategories.length && !selectedRunesAvailable.length;

          if (filterMatch || noFilters) {
            return (
              <Grid item xs={8} px={2} key={`runeword-${runewordIndex}`}>
                {/* <LazyLoad height={200} placeholder={<p>Scroll down!</p>}> */}
                <ItemCard runeword={runeword} />
                {/* </LazyLoad> */}
              </Grid>
            );
          }
        })}
      </Grid>
    </Container>
  );
};

export default App;
