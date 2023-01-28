function getResponses(lang) {
  const language = require(`../lang/${lang}.json`);
  const responses = language.responses;
  return responses;
}

module.exports = {
  getResponses,
};
