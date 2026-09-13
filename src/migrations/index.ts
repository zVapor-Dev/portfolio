import * as migration_20260913_025135_initial from './20260913_025135_initial'
import * as migration_20260913_030100_add_seed_keys_and_site_sections from './20260913_030100_add_seed_keys_and_site_sections'

export const migrations = [
  {
    up: migration_20260913_025135_initial.up,
    down: migration_20260913_025135_initial.down,
    name: '20260913_025135_initial',
  },
  {
    up: migration_20260913_030100_add_seed_keys_and_site_sections.up,
    down: migration_20260913_030100_add_seed_keys_and_site_sections.down,
    name: '20260913_030100_add_seed_keys_and_site_sections',
  },
]
