const fs = require('fs-extra');

try {
  fs.copySync('./index.html', './build/index.html')
} catch (err) {
  console.error('copy index error: ' + err)
}

try {
  fs.copySync('./node_modules/pearson-elements/assets/icons/p-icons-sprite-1.1.svg', './build/images/p-icons-sprite-1.1.svg')
} catch (err) {
  console.error('copy icons error: ' + err)
}
