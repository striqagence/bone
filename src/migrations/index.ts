import * as migration_20260828_131450_initial from './20260828_131450_initial';
import * as migration_20260828_135907_i18n from './20260828_135907_i18n';
import * as migration_20260831_063524_navigation from './20260831_063524_navigation';
import * as migration_20260831_070907_pages from './20260831_070907_pages';
import * as migration_20260831_090136_pole from './20260831_090136_pole';
import * as migration_20260831_091006_accueil from './20260831_091006_accueil';
import * as migration_20260831_091945_accueil_en_bref from './20260831_091945_accueil_en_bref';
import * as migration_20260831_093327_accueil_constat from './20260831_093327_accueil_constat';
import * as migration_20260831_093643_accueil_promesse from './20260831_093643_accueil_promesse';
import * as migration_20260831_093819_accueil_role from './20260831_093819_accueil_role';
import * as migration_20260831_094107_accueil_positionnement from './20260831_094107_accueil_positionnement';
import * as migration_20260831_094501_accueil_differenciation from './20260831_094501_accueil_differenciation';
import * as migration_20260831_094814_accueil_poles from './20260831_094814_accueil_poles';

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
    name: '20260831_063524_navigation',
  },
  {
    up: migration_20260831_070907_pages.up,
    down: migration_20260831_070907_pages.down,
    name: '20260831_070907_pages',
  },
  {
    up: migration_20260831_090136_pole.up,
    down: migration_20260831_090136_pole.down,
    name: '20260831_090136_pole',
  },
  {
    up: migration_20260831_091006_accueil.up,
    down: migration_20260831_091006_accueil.down,
    name: '20260831_091006_accueil',
  },
  {
    up: migration_20260831_091945_accueil_en_bref.up,
    down: migration_20260831_091945_accueil_en_bref.down,
    name: '20260831_091945_accueil_en_bref',
  },
  {
    up: migration_20260831_093327_accueil_constat.up,
    down: migration_20260831_093327_accueil_constat.down,
    name: '20260831_093327_accueil_constat',
  },
  {
    up: migration_20260831_093643_accueil_promesse.up,
    down: migration_20260831_093643_accueil_promesse.down,
    name: '20260831_093643_accueil_promesse',
  },
  {
    up: migration_20260831_093819_accueil_role.up,
    down: migration_20260831_093819_accueil_role.down,
    name: '20260831_093819_accueil_role',
  },
  {
    up: migration_20260831_094107_accueil_positionnement.up,
    down: migration_20260831_094107_accueil_positionnement.down,
    name: '20260831_094107_accueil_positionnement',
  },
  {
    up: migration_20260831_094501_accueil_differenciation.up,
    down: migration_20260831_094501_accueil_differenciation.down,
    name: '20260831_094501_accueil_differenciation',
  },
  {
    up: migration_20260831_094814_accueil_poles.up,
    down: migration_20260831_094814_accueil_poles.down,
    name: '20260831_094814_accueil_poles'
  },
];
