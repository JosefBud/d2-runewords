import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import LazyLoad from 'react-lazyload';
import { ItemCard, Filters } from './components';
import './App.css';
import db from './db.json';

// db.forEach((runeword) => {
//   const { items } = runeword;

//   items.forEach((item: string) => {
//     if (!itemCategories.includes(item)) itemCategories.push(item);
//   });

//   itemCategories.sort();
// });

const App = () => {
  const [runewords, setRunewords] = useState(db);
  const [selectedItemCategories, setSelectedItemCategories] = useState<string[]>([]);
  const [isAmazon, setIsAmazon] = useState(false);

  useEffect(() => {
    if (isAmazon) {
      const filteredRunewords = runewords.filter((runeword) => {
        const { items } = runeword;
        return items.includes('Bows');
      });
      return setRunewords(filteredRunewords);
    }

    setRunewords(db);
  }, [isAmazon]);

  return (
    <Container>
      <Filters
        selectedItemCategories={selectedItemCategories}
        setSelectedItemCategories={setSelectedItemCategories}
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

          if (filterMatch || selectedItemCategories.length === 0) {
            return (
              <Grid item xs={8} px={2} key={`runeword-${runewordIndex}`}>
                <LazyLoad height={200} placeholder={<p>loading</p>}>
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
