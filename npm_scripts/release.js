// Execute this script in the target branch to release to npm!

const log = require('./log');
const exec = require('./exec');
const path = require('path');
const readline = require('readline');
const semver = require('semver');
const pkg = require('../package.json');
const branchName = exec('git rev-parse --abbrev-ref HEAD', true);
const currentVersion = pkg.version;
const stdin = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const syncRemote = (branchName, nextVersion) => {

  exec(`git push origin ${branchName}`);

  if (nextVersion) {
    exec(`git push --tags`);
    log.secondary(`TravisCI will now release to npm on the tagged commit ${nextVersion} for the pearson-ux account.`);
  }
};
const exitFailure = (message) => {
  log.primaryError(message);
  process.exit(1);
};

if (branchName !== 'master') {
  exitFailure('You must be on the master branch in order to execute a release.');
}

// Ensure unit tests pass before continuing!
exec('npm test');

// Verify that governance checks pass
exec('npm run verify');

// *** Releaser provides the target SEMVER-compliant version ***
stdin.question(`Next version (current is ${currentVersion})? `, (nextVersion) => {

  if (!semver.valid(nextVersion)) {
    exitFailure(`Version '${nextVersion}' is not valid: requires a semver-compliant version. See http://semver.org/`);
  }

  if (!semver.gt(nextVersion, currentVersion)) {
    exitFailure(`Version '${nextVersion}' is not valid: it must be greater than the current version.`);
  }

  if (nextVersion.startsWith('v')) {
    nextVersion = nextVersion.slice(1);
  }

  // Order of operations:
  // 1. Bump the version update in package.json and npm-shrinkwrap.json
  // 2. The 'version' custom npm script (defined in package.json) executes changelog generation and adding to commit
  // 3. Locally commit and tag
  exec(`npm version ${nextVersion}`);

  // push commit and tag on target release branch
  syncRemote(branchName, nextVersion);

  stdin.close();
});
