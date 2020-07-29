const Card = require('../models/card');

const NotFoundError = require('../errors/notFound');
const NotAuthorized = require('../errors/notAuthor');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createNewCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Card not found'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new NotAuthorized('You can delete only your card');
      } else {
        Card.deleteOne(card)
          .then(() => res.send({ message: 'Card is deleted!' }));
      }
    })
    .catch(next);
};
