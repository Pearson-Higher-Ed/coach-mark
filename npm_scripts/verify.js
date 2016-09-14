const log = require('./log');
const path = require('path');
const fs = require('fs');
const pkg = require('../package.json');
const bowerPath = path.join(process.cwd(), '/bower.json');
const exitFailure = (message) => {
  log.primaryError(message);
  process.exit(1);
};

if (!pkg.name.startsWith('@pearson-components/')) {
  exitFailure('Package name must be pre-pended with "@pearson-components/" scope.');
}

if (!pkg.description) {
  exitFailure('Package description must be provided.');
}

if (!pkg.author) {
  exitFailure('Package author must be provided.');
}

if (!pkg.repository || !pkg.repository.url || pkg.repository.url === 'https://github.com/Pearson-Higher-Ed/') {
  exitFailure('Package repository url must be provided with repo name.');
}

if (fs.existsSync(bowerPath)) {
  exitFailure('No Bower configuration or dependencies allowed.');
}

log.primary('Verified project.');
process.exit(0);
