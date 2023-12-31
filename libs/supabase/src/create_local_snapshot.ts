createSnapshotOfLocal();

async function createSnapshotOfLocal() {
  // eslint-disable-next-line
  const { execSync } = require('child_process');

  console.log('========== Create Snapshot ==========');

  const now = new Date();
  const inquirer = await import('inquirer');
  const { name } =
    (await (inquirer as any).default.prompt({
      message: 'enter a name for the snapshot',
      name: 'name',
    })) || now.toISOString();

  execSync(
    `PGPASSWORD=postgres pg_dump -h localhost -p 54322 -U postgres -a --inserts -f libs/supabase/supabase/snapshots/${name}.sql`
  );
}