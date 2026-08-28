import * as migration_20260828_131450_initial from './20260828_131450_initial';
import * as migration_20260828_135907_i18n from './20260828_135907_i18n';

export const migrations = [
  {
    up: migration_20260828_131450_initial.up,
    down: migration_20260828_131450_initial.down,
    name: '20260828_131450_initial',
  },
  {
    up: migration_20260828_135907_i18n.up,
    down: migration_20260828_135907_i18n.down,
    name: '20260828_135907_i18n'
  },
];
