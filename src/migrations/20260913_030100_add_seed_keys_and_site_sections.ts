import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "site_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar NOT NULL,
  	"title" varchar NOT NULL
  );
  
  ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "seed_key" varchar;
  ALTER TABLE "technologies" ADD COLUMN IF NOT EXISTS "seed_key" varchar;
  ALTER TABLE "experience" ADD COLUMN IF NOT EXISTS "seed_key" varchar;
  ALTER TABLE "site" ADD COLUMN IF NOT EXISTS "experience_label" varchar DEFAULT 'Experience';
  ALTER TABLE "site" ADD COLUMN IF NOT EXISTS "experience_title" varchar DEFAULT 'Where I''''ve built.';
  ALTER TABLE "site" ADD COLUMN IF NOT EXISTS "experience_description" varchar DEFAULT 'A mix of independent product work and long-running community projects — with Discord bot development as an earlier chapter that still informs how I think about reliability and scale.';
  ALTER TABLE "site" ADD COLUMN IF NOT EXISTS "stack_label" varchar DEFAULT 'Stack';
  ALTER TABLE "site" ADD COLUMN IF NOT EXISTS "stack_title" varchar DEFAULT 'Tools I reach for.';
  ALTER TABLE "site" ADD COLUMN IF NOT EXISTS "stack_description" varchar DEFAULT 'A pragmatic toolkit for shipping typed, deployable web products — from UI components to auth, databases, and edge infrastructure.';
  ALTER TABLE "site" ADD COLUMN IF NOT EXISTS "work_label" varchar DEFAULT 'Selected work';
  ALTER TABLE "site" ADD COLUMN IF NOT EXISTS "work_title" varchar DEFAULT 'Projects that shipped.';
  ALTER TABLE "site" ADD COLUMN IF NOT EXISTS "work_description" varchar DEFAULT 'A focused set of projects — open-source packages, this portfolio, and production Discord tooling. No filler, no work-in-progress badges.';
  DO $$ BEGIN
   ALTER TABLE "site_nav_links" ADD CONSTRAINT "site_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "site_nav_links_order_idx" ON "site_nav_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "site_nav_links_parent_id_idx" ON "site_nav_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "projects_seed_key_idx" ON "projects" USING btree ("seed_key");
  CREATE UNIQUE INDEX IF NOT EXISTS "technologies_seed_key_idx" ON "technologies" USING btree ("seed_key");
  CREATE UNIQUE INDEX IF NOT EXISTS "experience_seed_key_idx" ON "experience" USING btree ("seed_key");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_nav_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "site_nav_links" CASCADE;
  DROP INDEX IF EXISTS "projects_seed_key_idx";
  DROP INDEX IF EXISTS "technologies_seed_key_idx";
  DROP INDEX IF EXISTS "experience_seed_key_idx";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "seed_key";
  ALTER TABLE "technologies" DROP COLUMN IF EXISTS "seed_key";
  ALTER TABLE "experience" DROP COLUMN IF EXISTS "seed_key";
  ALTER TABLE "site" DROP COLUMN IF EXISTS "experience_label";
  ALTER TABLE "site" DROP COLUMN IF EXISTS "experience_title";
  ALTER TABLE "site" DROP COLUMN IF EXISTS "experience_description";
  ALTER TABLE "site" DROP COLUMN IF EXISTS "stack_label";
  ALTER TABLE "site" DROP COLUMN IF EXISTS "stack_title";
  ALTER TABLE "site" DROP COLUMN IF EXISTS "stack_description";
  ALTER TABLE "site" DROP COLUMN IF EXISTS "work_label";
  ALTER TABLE "site" DROP COLUMN IF EXISTS "work_title";
  ALTER TABLE "site" DROP COLUMN IF EXISTS "work_description";`)
}
