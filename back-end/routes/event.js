const express = require("express");
const eventdb = require("../models/event");

const router = express.Router();

module.exports = function (passport) {

    router.get("/", (req, res) => {

        // query limit
        let limit = 0
        if (req.query.limit) {
            limit = parseInt(req.query.limit)
        }
        // end of query limit


        //query event
        let query = {}
        if (req.query.eventtype) {
            query.eventType = req.query.eventtype.toLowerCase() 
        }
        if (req.query.eventtopic) {
            query.eventTopic = req.query.eventtopic.toLowerCase() 
        }
        // if (req.query.eventtopic && req.query.eventtype) {
        //     query = {
        //         eventType: req.query.eventtype,
        //         eventTopic: req.query.eventtopic
        //     }
        // }
        if (req.query.eventtopic == "All") {
            delete query.eventTopic
        }
        if( req.query.eventtype == "All"){
            delete query.eventType
        }
        //end of query event

        if(req.query.user){
            query ={userid : req.query.user}
        }
        
        eventdb.find(query, (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        }).limit(limit).sort("dateStart").skip(limit * (req.query.page - 1))
    })

    router.get("/:id", (req, res) => {
        eventdb.findById(req.params.id, (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        })
    })

    router.post("/", passport.authenticate("auth", { session: false }), (req, res) => {
        if (!req.files.eventPict) {
            return res.status(400).send("No files were uploaded");
        }

        let image = req.files.eventPict;
        //extLast mengambil extension dari file
        let ext = image.name.split(".");
        let extLast = ext[ext.length - 1].toLowerCase();


        if (extLast == "png" || extLast == "jpg" || extLast == "jpeg" || extLast == "bmp" || extLast == "gif") {
            let imageName = Date.now() + "." + extLast;

            image.mv("./public/event/" + imageName, (error) => {
                if (error) return res.status(500).send(error);

                let newObj = new eventdb({
                    userid: req.body.userid,
                    title: req.body.title.toLowerCase(),
                    location: req.body.location,
                    dateStart: req.body.dateStart,
                    dateEnd: req.body.dateEnd,
                    timeStart: req.body.timeStart,
                    timeEnd: req.body.timeEnd,
                    description: req.body.description,
                    price: req.body.price,
                    contact: req.body.contact,
                    eventPict: "http://localhost:3000/event/" + imageName,
                    eventType: req.body.eventType.toLowerCase(),
                    eventTopic: req.body.eventTopic.toLowerCase()
                });

                newObj.save((error) => {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        res.json(newObj);
                    }
                });
            });

        } else {
            return res.status(400).send("File must be png, jpg, jpeg only")
        };
    });

    router.delete("/:id", (req, res) => {
        eventdb.findByIdAndRemove(req.params.id, (error) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.send({ message: "Data Deleted" })
            };
        });
    });

    router.put("/", (req, res) => {

        let newObj = {
            title: req.body.title,
            location: req.body.location,
            dateStart: req.body.dateStart,
            dateEnd: req.body.dateEnd,
            timeStart: req.body.timeStart,
            timeEnd: req.body.timeEnd,
            description: req.body.description,
            price: req.body.price,
            contact: req.body.contact,
            eventType: req.body.eventType,
            eventTopic: req.body.eventTopic
        };

        eventdb.findByIdAndUpdate(req.body._id, newObj, (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            };
        });
    });

    return router;
};
