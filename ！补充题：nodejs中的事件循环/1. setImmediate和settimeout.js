// setTimeout(function timeout() {
//   console.log('timeout');
// }, 0);
// setImmediate(function immediate() {
//   console.log('immediate');
// });

const fs = require('fs');
fs.readFile('./testReadFile.js', { encoding: 'utf-8' }, (err, data) => {
  if (err) throw err;
  console.log('read file success');
  setTimeout(function timeout() {
    console.log('timeout');
  }, 0);
  setImmediate(function immediate() {
    console.log('immediate');
  });
});
