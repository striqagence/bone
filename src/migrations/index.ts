import * as migration_20260828_131450_initial from './20260828_131450_initial';

export const migrations = [
  {
    up: migration_20260828_131450_initial.up,
    down: migration_20260828_131450_initial.down,
    name: '20260828_131450_initial'
  },
];
