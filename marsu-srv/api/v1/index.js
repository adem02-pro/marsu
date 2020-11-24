// Package imports
const router = require('express').Router()
const passport = require('passport')
const ObjectId = require('mongoose').Types.ObjectId

// Local imports
const Marsupilami = require('../models/marsupilami')
const Friend = require('../models/friend')

router.get('/marsus', (req, res) => {
    Marsupilami.find((err, docs) => {
        if(err) res.status(400).json(err)
        else res.status(200).json(docs)
    })
})

router.get('/marsu', (req, res) => {
    const user = req.user
    if(user) {
        Marsupilami.findById(user._id, (err, doc) => {
            if(!err) res.status(200).json(doc)
        })
    }
})

router.get('/marsu/:id', (req, res) => {
    const id = req.params.id
    if(!ObjectId.isValid(id))
        return res.json(`Id invalid !`)
    Marsupilami.findById(id, (err, doc) => {
        if(!err) res.json(doc)
    })
})

// registering => http://localhost:3000/api/v1/register
router.post('/register', (req, res) => {
    const marsu = new Marsupilami(req.body)

    marsu.save((err, doc) => {
        if(err) {
            res.status(500).json(err)
        }
        else {
            req.logIn(req.body, err => {
                if(err) res.status(500).json(err)
                else res.status(201).json(doc);
            })
        }
    })
})

// update => http://localhost:3000/api/v1/marsu/:id
router.put('/marsu/:id', (req, res) => {
    const id = req.params.id
    if(!ObjectId.isValid(id))
        return res.status(500).json(`Id invalid !`)

    const marsu = req.body

    Marsupilami.findByIdAndUpdate(id, { $set: marsu }, { new: true }, (err, doc) => {
        if(err) res.status(401).json(err)
        else res.status(201).json(doc)
    })
})

// login => http://localhost:3000/api/v1/login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/api/v1/success',
    failureRedirect: '/api/v1/failure'
}))

router.get('/success', (req, res) => {
    res.status(200).json({msg: `logged in !`, marsu: req.user})
})

router.get('/failure', (req, res) => {
    res.status(401).json({msg: 'NOT logged in !'})
})

// logout => http://localhost:3000/api/v1/logout
router.get('/logout', (req, res) => {
    req.logOut()
    res.status(200).json({msg: 'logged out successfully'})
})

// add => http://localhost:3000/api/v1/add
router.post('/add', async (req, res) => {
    const marsu = await Marsupilami.findById(req.user._id)
    marsu.friends.push(req.body.friend)
    await marsu.save()
    res.status(201).send(marsu)
})

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id

    if(!ObjectId.isValid(id))
        return res.status(500).json(`Id invalid !`)

    const marsu = await Marsupilami.findById(req.user._id)
    marsu.friends = marsu.friends.filter(el => el != id)
    await marsu.save()
    res.status(202).send(marsu)
})

// listOfFriends => http://localhost:3000/api/v1/user-friends/:id
router.get('/user-friends/:id', async (req, res) => {
    const userId = req.params.id;

    if(!ObjectId.isValid(id))
        return res.status(500).json(`Id invalid !`)

    const marsu = await Marsupilami.findById(userId).populate('friends')
})

// listOfFriends => http://localhost:3000/api/v1/friends
router.get('/friends', (req, res) => {
    Marsupilami.findById(req.user._id)
    .populate('friends')
    .exec((err, doc) => {
        if(!err) res.status(200).send(doc.friends)
    })
})

router.get('/marsus-not-friends', async (req, res) => {
    const marsu = await Marsupilami.findById(req.user._id)

    const marsus = await Marsupilami.find()

    Marsupilami.find({_id : { "$nin": marsu.friends }}, (err, docs) => {
        if(!err) res.status(200).send(docs)
    })
})


module.exports = router