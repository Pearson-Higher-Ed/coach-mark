const exec = require('./exec');

exec(`mkdir -p fonts && cp ./node_modules/pearson-elements/dist/fonts/* ./fonts`);
exec(`cp ./node_modules/pearson-elements/dist/css/elements.css ./demo`);
