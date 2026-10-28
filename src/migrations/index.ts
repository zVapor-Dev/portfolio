import * as migration_20260913_025135_initial from './20260913_025135_initial';
import * as migration_20260913_030100_add_seed_keys_and_site_sections from './20260913_030100_add_seed_keys_and_site_sections';
import * as migration_20261028_042424_payload_3_91_upgrade from './20261028_042424_payload_3_91_upgrade';

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
  {
    up: migration_20261028_042424_payload_3_91_upgrade.up,
    down: migration_20261028_042424_payload_3_91_upgrade.down,
    name: '20261028_042424_payload_3_91_upgrade',
  },
];
