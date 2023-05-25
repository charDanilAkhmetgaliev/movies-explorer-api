const ObjectNotFoundError = require('../components/ObjectNotFoundError');
const { OBJECT_ERROR_CONFIG } = require('../../config');

// eslint-disable-next-line consistent-return
async function findDocument(key, next, option = {}) {
  try {
    const { password = null, byObject = null } = option;
    let document = {};
    if (byObject) {
      document = await this.findOne(key).select(`${password ? '+password' : ''}`);
    } else {
      document = await this.findById(key).select(`${password ? '+password' : ''}`);
    }
    if (!document) {
      throw new ObjectNotFoundError(OBJECT_ERROR_CONFIG.MESSAGE(key));
    }
    return document;
  } catch (error) {
    next(error);
  }
}

module.exports = {
  findDocument,
};
