const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: "Sorry, it's not you, it's us" }));
};

module.exports.createNewCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400)
          .send({ message: error.message });
      }
      if (error.name === 'CastError') {
        return res.status(400).send({ message: "Seems like this card doesn't exist" });
      }
      return res.status(500)
        .send({ message: "Sorry, it's not you, it's us" });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404)
          .send({ message: 'Card not found' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(400).send({ message: "Seems like this card doesn't exist" });
      }
      return res.status(500).send({ message: "Sorry, it's not you, it's us" });
    });
};
