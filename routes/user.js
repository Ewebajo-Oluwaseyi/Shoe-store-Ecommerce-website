const express = require('express')
const User = require('../model/User')
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();

/*router.post("/signin", async(req,res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.passowrd
    });

    const getToken = (user) => {
        return jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        } , config.get('jwtSecret') , {
            expiresIn: 360000
        },
        (err,token) => {
            if(err) throw err;
            res.json({ token });
        })
        }

    if(signinUser){
        res.send({
            _id: signinUser._id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
            }
        )}
        else {
        res.status(401).send({msg: "Invalid Email or Password"});
        }
}  )*/

router.post('/',[
    check('name','Please add name').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, isAdmin} = req.body;

    try {
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ msg: 'User already exist'});
        }

        user = new User({
            name,
            email,
            password,
            isAdmin
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), (err,token) => {
            if(err) throw err;
            res.json({ token });
        });

    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


router.get("/createadmin" , async (req,res) => {
    try {
        const user = new User({
            name: 'Seyi',
            email: 'seyiewebajo@gmail.com',
            password: 'adeoluwa',
            isAdmin: true
        });

        const newUser = await user.save();

        res.send(newUser);

    }
    catch (error) {
        res.send({msg: error.message})
    }

})

module.exports = router;