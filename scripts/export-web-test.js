#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');

const { cleanWebBuildArtifacts } = require('./clean-web-build-artifacts');

const root = process.cwd();
const outputDir = '.expo-web-test';

function runExport() {
  const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';

  return spawnSync(
    command,
    ['expo', 'export', '-p', 'web', '--output-dir', outputDir],
    {
      cwd: root,
      stdio: 'inherit',
      shell: false,
    },
  );
}

let exitCode = 0;

try {
  const result = runExport();

  if (result.error) {
    console.error(result.error.message);
    exitCode = 1;
  } else {
    exitCode = result.status ?? 1;
  }
} finally {
  cleanWebBuildArtifacts({ cwd: root, log: true });
}

process.exit(exitCode);
