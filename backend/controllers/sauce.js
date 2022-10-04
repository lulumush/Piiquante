const sauce = require('../models/sauce');
const Sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
    //console.log(req.body);
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    //delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });

    sauce.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
};

//get one sauce in particular
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => { res.status(200).json(sauce)})
    .catch(error => { res.status(400).json( { error })})
};

//modify one sauce in particular
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? { // if req.file exist then update new image
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ... req.body };

  delete sauceObject._userId;
  Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) { 
        res.status(401).json({ message : 'Non autorisé(e)'});
      } else {
        Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
        .then(() => res.status(200).json({message : 'Sauce modifiée avec succès!'}))
        .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//delete one sauce in particular
exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };


// Get all the sauces in DB
exports.getAllSauce = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};