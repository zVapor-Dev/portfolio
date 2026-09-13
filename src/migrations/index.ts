import * as migration_20260913_025135_initial from './20260913_025135_initial';

export const migrations = [
  {
    up: migration_20260913_025135_initial.up,
    down: migration_20260913_025135_initial.down,
    name: '20260913_025135_initial'
  },
];
