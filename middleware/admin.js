module.exports = function (req, res, next){
    if(req.user && req.user.isAdmin){
        return next();
    } return res.status(401).send({msg: 'Admin token is not valid'})
}

