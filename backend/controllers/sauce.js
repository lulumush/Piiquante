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
    .then(() => { res.status(201).json({message: 'Sauce enregistré avec succès!'})})
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
  const sauceObject = req.file ? { //if req.file exist then update with new image
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ... req.body };

  delete sauceObject._userId;
  Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) { //only the creator of the entry can modify it
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
          message: 'Sauce supprimée avec succès!'
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


// Get all the sauces
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

//likes and dislikes on one sauce in particular
exports.rateSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then((sauce) => { 
    //console.log(req.body.like);
    //console.log(sauce.usersLiked.indexOf(req.body.userId));
    if (req.body.like == 1 && sauce.usersLiked.indexOf(req.body.userId) == -1){
      sauce.likes++;
      sauce.usersLiked.push(req.body.userId);
      sauce.save();          
    }
    if (req.body.like == -1 && sauce.usersDisliked.indexOf(req.body.userId) == -1){
      sauce.dislikes++;
      sauce.usersDisliked.push(req.body.userId);
      sauce.save();          
    }
    if (req.body.like == 0 ){
      if (sauce.usersLiked.indexOf(req.body.userId) != -1){
        sauce.likes--;
        sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.body.userId));
        sauce.save();
      }
      else if (sauce.usersDisliked.indexOf(req.body.userId) != -1){
        sauce.dislikes--;
        sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(req.body.userId));
        sauce.save();
      }
    }
    res.status(200).json(sauce);
  })
  .catch(error => { res.status(500).json( { error })})
}; 