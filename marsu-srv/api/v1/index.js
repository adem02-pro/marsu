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

router.get('/friends', (req, res) => {
    Friend.find((err, docs) => {
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
    console.log(req.body.friend);
    const friend = new Friend({
        marsu: req.user._id,
        friend: req.body.friend
    })
    const marsu = await Marsupilami.findById(req.user._id)

    friend.save((err, doc) => {
        if(err) res.status(500).json(err)
        else {
            res.status(201).json(doc)
        }
    })

    marsu.friends.push(req.body.friend)
    marsu.save()
})

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id

    if(!ObjectId.isValid(id))
        return res.status(500).json(`Id invalid !`)

    const marsu = await Marsupilami.findById(req.user._id)
    const condition = {marsu: marsu._id, friend: id}

    await Friend.findOne(condition, (err, doc) => {
        if(!err) {
            Friend.findByIdAndRemove(doc._id, (err, doc) => {
                if(!err) {
                    Marsupilami.findById(req.user._id, (err, doc) => {
                        if(!err)
                        {    
                            doc.friends = doc.friends.filter(el => el != req.params.id)
                            console.log(doc.friends);
                            doc.save()
                            console.log(`Deleted !`);
                        }
                    })
                }
            })
        }
    })
})

module.exports = router