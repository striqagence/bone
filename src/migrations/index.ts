import * as migration_20260828_131450_initial from './20260828_131450_initial';
import * as migration_20260828_135907_i18n from './20260828_135907_i18n';
import * as migration_20260831_063524_navigation from './20260831_063524_navigation';

export const migrations = [
  {
    up: migration_20260828_131450_initial.up,
    down: migration_20260828_131450_initial.down,
    name: '20260828_131450_initial',
  },
  {
    up: migration_20260828_135907_i18n.up,
    down: migration_20260828_135907_i18n.down,
    name: '20260828_135907_i18n',
  },
  {
    up: migration_20260831_063524_navigation.up,
    down: migration_20260831_063524_navigation.down,
    name: '20260831_063524_navigation'
  },
];
