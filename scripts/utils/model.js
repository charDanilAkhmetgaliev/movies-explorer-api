const ObjectNotFoundError = require('../components/ObjectNotFoundError');
const { OBJECT_ERROR_CONFIG } = require('../../config');

async function findDocument(key, option = {}) {
  const { password = null, byObject = null } = option;
  const document = byObject
    ? await this.findOne(key).select(`${password ? '+password' : ''}`)
    : await this.findById(key).select(`${password ? '+password' : ''}`);
  if (!document) {
    throw new ObjectNotFoundError(OBJECT_ERROR_CONFIG.MESSAGE(key));
  }
  return document;
}

module.exports = {
  findDocument,
};
