const router = require("express").Router();
const Event = require("../Models/event");
const Like = require("../Models/likeEvent");
const User = require("../Models/user");

router.get("/getEvents", (req, res) => {
    Event.find({}, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
    })
})

router.get("/getLikedEvents/:user", (req, res) => {
    Like.find({ username: req.params.user }, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
    })
})

router.get("/checkLike/:cardid/:user", (req, res) => {
    console.log(req.params.user);
    Like.find({ eventId: req.params.cardid, username: req.params.user }, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
    })
})

router.get("/getSession", (req, res) => {
    res.send(req.session)
});

router.get("/checkSession", (req, res) => {

    console.log(req.session);
    if (req.session.userName) {
        res.json({ login: true })
    } else {
        res.json({ login: false })
    }
})

router.get("/logout", (req, res) => {
    console.log(req.session);
    if (req.session.userName && req.cookies.user_sid) {
        res.clearCookie("user_sid");
        res.send({ logout: true });
    }
})

router.post("/addLikedEvents", (req, res) => {
    const user = req.session.userName;
    const newLike = new Like({
        eventId: req.body.cardID,
        eventType: req.body.eventType,
        username: user.username
    })
    newLike.save(err => {
        !err ? res.json({ success: true }) : res.json({ success: false });
    })

})


router.post("/addEvent", (req, res) => {
    const newEvent = new Event({
        cardTitle: req.body.title,
        cardText: req.body.text,
        day: req.body.day,
        fare: req.body.fare,
        month: req.body.month,
        image: req.body.image
    })

    newEvent.save(err => {
        !err ? res.json({ success: true }) : res.json({ success: false });
    })
})


router.post("/register", function (req, res) {
    console.log(req.body);
    const newUser = new User({
        username: req.body.name,
        mobile: req.body.mobile,
        password: req.body.password,
        owner: req.body.check
    })
    newUser.save((err) => {
        if (!err) {
            req.session.userName = newUser;
            if (newUser.owner) {
                req.session.owner = true
            }
            return res.json({ registered: true });
        }
    })
});

router.post("/login", (req, res) => {
    User.findOne({ username: req.body.name }, (err, docs) => {
        if (!err && docs) {
            if (docs.password === req.body.password) {
                req.session.userName = docs
                return res.json({ login: true });
            }
        }
    })
})

router.post("/registerEvent", (req, res) => {
    const event = {
        eventType: req.body.type,
        cardTitle: req.body.name,
        cardText: req.body.venue+" "+req.body.startTime,
        fare:req.body.fare,
        date:req.body.date.split("-")[0],
        month:req.body.date.split("-")[1],
        image:"concert.jpg",
        venue:req.body.venue,
        day:req.body.day,
        time: req.body.endTime+" "+"END",
        about:req.body.about,
        description:req.body.description
    }
    const newEvent = new Event(event);
    newEvent.save(err => {
        if(!err){
            res.json({sent: true})
        } else {
            res.json({sent: false})
        }
    })
})

router.put("/updateUser/:id", (req, res) => {

    if (req.body.password.length > 0) {
        updatedObj = {
            username: req.body.name,
            mobile: req.body.mobile,
            password: req.body.newpassword,
            owner: req.body.check
        }
    } else {
        updatedObj = {
            username: req.body.name,
            mobile: req.body.mobile,
            password: req.session.password,
            owner: req.body.check
        }
    }
    console.log("updated obj", updatedObj);
    User.findByIdAndUpdate({ _id: req.params.id }, updatedObj)
        .then(docs => {
            User.findOne({ username: updatedObj.username }, (err, docs) => {
                if(!err) {
                    req.session.userName = docs;
                    res.json({ docs: docs })
                }
            })

        })
        .catch(err => res.json({ updated: false }));
})



router.delete("/deleteLike/:cardid", (req, res) => {
    console.log("Deleting..");
    Like.findOneAndDelete({ eventId: req.params.cardid }, (err, docs) => {
        if (!err) {
            console.log("Removed Like!");
        } else {
            console.log(err);
        }
    })
})



module.exports = router;