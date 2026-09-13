import { spawnSync } from "node:child_process";
import { rename, access, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const hide = [
  ["src/app/admin", "src/app/_admin_static_skip"],
  ["src/app/api", "src/app/_api_static_skip"],
  ["src/app/uploads", "src/app/_uploads_static_skip"],
];

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function movePairs(pairs, reverse = false) {
  for (const [a, b] of pairs) {
    const from = path.join(root, reverse ? b : a);
    const to = path.join(root, reverse ? a : b);
    if (await exists(from)) {
      await rename(from, to);
      console.log(`moved ${path.relative(root, from)} → ${path.relative(root, to)}`);
    }
  }
}

function run(cmd, args, env = {}) {
  const result = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, ...env },
  });
  if (result.status !== 0) {
    throw new Error(`Command failed: ${cmd} ${args.join(" ")}`);
  }
}

async function main() {
  console.log("==> Static export voor Plesk (out/)");
  await rm(path.join(root, ".next"), { recursive: true, force: true });
  await movePairs(hide, false);
  try {
    run("npx", ["prisma", "generate"]);
    run("npx", ["prisma", "migrate", "deploy"]);
    run("npm", ["run", "db:seed"]);
    run("npm", ["run", "build"], { STATIC_EXPORT: "1" });
    await writeFile(
      path.join(root, "out", ".htaccess"),
      "DirectoryIndex index.html\n",
      "utf8",
    );
    console.log("==> Klaar: map out/ is bijgewerkt. Push + Plesk pull (.htaccess serveert out/ op het domein).");
  } finally {
    await movePairs(hide, true);
  }
}

main().catch(async (err) => {
  console.error(err);
  try {
    await movePairs(hide, true);
  } catch {
    /* ignore */
  }
  process.exit(1);
});
