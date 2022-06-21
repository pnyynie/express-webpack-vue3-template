const fs = require('fs');
const { createHash } = require("crypto");

module.exports = {
  fileExists: (filePath) => {
    try {
      fs.statSync(filePath);
      return true;
    } catch (err) {
      return false;
    }
  },

  createEnvironmentHash: (env) => {
    const hash = createHash("md5");
    hash.update(JSON.stringify(env));
    return hash.digest("hex");
  }
};
