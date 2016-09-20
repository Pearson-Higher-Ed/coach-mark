const exec = require('./exec');

exec(`npm run gen-changelog`);
exec(`git add CHANGELOG.md`);
