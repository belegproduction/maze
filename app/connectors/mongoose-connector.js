const mongoose = require('mongoose');

mongoose.Promise = Promise;

module.exports = (mongoUri) => {
  if (!mongoUri) {
    throw Error('Mongo uri is undefined');
  }

  // mongoose.set('debug', true);

  return mongoose
      .connect(mongoUri, { useNewUrlParser: true })
      .then((mongodb) => {
        console.log('Mongo connected');
        return mongodb;
      });
};
