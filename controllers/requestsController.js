const Requests = require('../models/reqıestsHelp');

async function createRequest(request, response) {
  const { userId, message } = request.body;
  try {
    const result = new Requests({ userId: userId, message: message });
    const createdDoc = await result.save();
    if (createdDoc) {
      return response.status(200).json({ createdDoc });
    }
  } catch (error) {
    return response.status(404).json(error);
  }
}

async function getRequests(request, response) {
  try {
    const allRequest = await Requests.find().populate('user');

    return response.status(200).json({ allRequest });
  } catch (error) {
    return response.status(404).json(error);
  }
}

module.exports = {
  createRequest,
  getRequests,
};
