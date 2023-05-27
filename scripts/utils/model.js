const ObjectNotFoundError = require('../components/ObjectNotFoundError');
const DataError = require('../components/DataError');
const { OBJECT_ERROR_CONFIG, REG_EXP_CONFIG } = require('../../config');

// utility merges props
const propsMerged = (props) => `${props ? props.join(' ') : ''}`;

// function find document in db by input data
async function searchDocsInDb(key, options = {}) {
  const { selectProps = null, popProps = null } = options;
  let document = {};
  switch (true) {
    case (typeof key === 'object'):
      document = await this.findOne(key)
        .select(propsMerged(selectProps))
        .populate(propsMerged(popProps));
      break;
    case (typeof key === 'string' && REG_EXP_CONFIG.ID.test(key)):
      document = await this.findById(key)
        .select(propsMerged(selectProps))
        .populate(propsMerged(popProps));
      break;
    case (key === 'all'):
      document = await this.find({})
        .select(propsMerged(selectProps))
        .populate(propsMerged(popProps));
      break;
    default:
      throw new DataError();
  }
  if (document) {
    return document;
  }
  throw new ObjectNotFoundError(OBJECT_ERROR_CONFIG.MESSAGE(key));
}

module.exports = {
  searchDocsInDb,
};
