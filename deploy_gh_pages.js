'use strict';

var ghpages = require('gh-pages');
var path = require('path');

main();

function main() {
  ghpages.publish(path.join(__dirname, 'build'), function(err) {
    console.log(err, "Error in gh-pages deploy...")
  });
}
