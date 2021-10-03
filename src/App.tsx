import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { alpha } from '@mui/material';
import './App.css';
import db from './db.json';

function App() {
  const [runewords, setRunewords] = useState(db);
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
      <Box m={4}>
        <input type="checkbox" checked={isAmazon} onChange={() => setIsAmazon(!isAmazon)} />
        <span>Bows & Crossbows</span>
      </Box>
      <Grid container spacing={2}>
        {runewords.map((runeword, runewordIndex) => {
          const { name, level, items, runes, stats } = runeword;
          return (
            <Grid item xs={12} px={2} key={`runeword-${runewordIndex}`}>
              <Card variant="outlined" sx={{ bgcolor: alpha('#000000', 0.7) }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#948064' }}>
                    {name}
                  </Typography>
                  <Typography color="common.white">
                    Character level required: {level}
                  </Typography>
                  <Typography color="common.white">{items.join(', ')}</Typography>
                  <Typography color="common.white">{runes.join(', ')}</Typography>

                  <List dense>
                    {stats.map((stat, statIndex) => {
                      const {
                        valueMin,
                        valueMax,
                        percent,
                        modifier,
                        spell,
                        spellLevel,
                        spellCharges,
                        skill,
                        skillLevelMin,
                        skillLevelMax,
                        skillBoost,
                        skillBoostValueMin,
                        skillBoostValueMax,
                        note
                      } = stat;

                      let statString = '';

                      if (modifier && valueMin) {
                        statString +=
                          valueMin === valueMax ? `${valueMin}` : `${valueMin} - ${valueMax}`;
                        statString += percent ? '%' : '';
                        statString += ` ${modifier}`;
                      }

                      if (modifier && !valueMin) {
                        statString += ` ${modifier}`;
                      }

                      if (spell) {
                        statString += `Level ${spellLevel} ${spell} (${spellCharges} charges)`;
                      }

                      if (skill) {
                        statString += 'Level';
                        statString +=
                          skillLevelMin === skillLevelMax
                            ? ` ${skillLevelMin}`
                            : ` ${skillLevelMin} - ${skillLevelMax}`;
                        statString += ` ${skill} when equipped`;
                      }

                      if (skillBoost) {
                        statString +=
                          skillBoostValueMin === skillBoostValueMax
                            ? `+${skillBoostValueMin} to`
                            : `+${skillBoostValueMin} - ${skillBoostValueMax} to`;
                        statString += ` ${skillBoost}`;
                      }

                      statString += note && ` (${note})`;

                      return (
                        <ListItem
                          sx={{ padding: 0 }}
                          key={`runeword-${runewordIndex}-stat-${statIndex}`}
                        >
                          <ListItemText
                            sx={{
                              color: '#5050ac',
                              marginTop: 0,
                              marginBottom: 0
                            }}
                          >
                            <span style={{ fontWeight: 900 }}>{statString}</span>
                          </ListItemText>
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default App;
