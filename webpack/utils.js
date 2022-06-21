const fs = require('fs');

module.exports = {
  fileExists: function (filePath) {
    try {
      fs.statSync(filePath);
      return true;
    } catch (err) {
      return false;
    }
  },
};
