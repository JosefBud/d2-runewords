import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { alpha } from '@mui/material';

type Stat = {
  valueMin: number;
  valueMax: number;
  percent: boolean;
  modifier: string;
  spell: string;
  spellLevel: number;
  spellCharges: number;
  skill: string;
  skillLevelMin: number;
  skillLevelMax: number;
  skillBoost: string;
  skillBoostValueMin: number;
  skillBoostValueMax: number;
  note: string;
};

type Runeword = {
  name: string;
  level: number;
  items: string[];
  runes: string[];
  stats: Stat[];
};

const ItemCard = ({ runeword }: { runeword: Runeword }) => {
  const { name, level, items, runes, stats } = runeword;

  return (
    <Card variant="outlined" sx={{ bgcolor: alpha('#000000', 0.7), textAlignLast: 'center' }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: '#948064' }}>
          {name}
        </Typography>
        <Typography color="common.white">Character level required: {level}</Typography>
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
              <ListItem sx={{ padding: 0 }} key={`${Math.random()}-stat-${statIndex}`}>
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
  );
};

export default ItemCard;
