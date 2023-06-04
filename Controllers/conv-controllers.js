const asyncHandler = require("express-async-handler");
const Conversation = require("../Models/Conversation");

const createConversation = asyncHandler(async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getConv = asyncHandler(async (req, res) => {
  console.log("we are in get");
  console.log(req.params.userId);
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    if (!conversation) {
      res.status(200).send("no conversation found");
    }
    console.log(conversation.members[0])
   
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getConvOfTwo = asyncHandler(async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  createConversation,
  getConv,
  getConvOfTwo,
};
