#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const STATIC_ARTIFACT_DIRS = ['web-build'];

function listExpoWebTestDirs(cwd) {
  return fs
    .readdirSync(cwd, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('.expo-web-'))
    .map((entry) => entry.name);
}

function collectArtifactPaths(cwd) {
  return [
    ...STATIC_ARTIFACT_DIRS.map((dir) => path.join(cwd, dir)),
    path.join(cwd, '.expo', 'test-export'),
    ...listExpoWebTestDirs(cwd).map((dir) => path.join(cwd, dir)),
  ];
}

function cleanWebBuildArtifacts(options = {}) {
  const cwd = options.cwd ?? process.cwd();
  const log = options.log ?? false;

  for (const target of collectArtifactPaths(cwd)) {
    if (!fs.existsSync(target)) {
      continue;
    }

    fs.rmSync(target, { recursive: true, force: true });

    if (log) {
      console.log(`Removed ${path.relative(cwd, target)}`);
    }
  }
}

if (require.main === module) {
  cleanWebBuildArtifacts({ log: true });
}

module.exports = { cleanWebBuildArtifacts };
