const express = require("express");
const eventdb = require("../models/event");

const router = express.Router();

module.exports = function (passport) {

    router.get("/", (req, res) => {

        eventdb.find({}, (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        })
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

    router.post("/",passport.authenticate("auth", {session:false}), (req, res) => {
        if (!req.files.eventPict) {
            return res.status(400).send("No files were uploaded");
        }

        let image = req.files.eventPict;
        //extLast mengambil extension dari file
        let ext = image.name.split(".");
        let extLast = ext[ext.length - 1].toLowerCase();


        if (extLast == "png" || extLast == "jpg" || extLast == "jpeg") {
            let imageName = Date.now() + "." + extLast;

            image.mv("./public/event/" + imageName, (error) => {
                if (error) return res.status(500).send(error);

                let newObj = new eventdb({
                    title: req.body.title,
                    place: req.body.place,
                    date: req.body.date,
                    time: req.body.time,
                    description: req.body.description,
                    price: req.body.price,
                    contact: req.body.contact,
                    eventPict: "http://localhost:3000/event/" + imageName
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

    router.delete("/:id",passport.authenticate("auth", {session:false}), (req, res) => {
        eventdb.findByIdAndRemove(req.params.id, (error) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.send({ message: "Data Deleted" })
            };
        });
    });

    router.put("/", passport.authenticate("auth", {session:false}),(req, res) => {

        let newObj = {
            title: req.body.title,
            place: req.body.place,
            date: req.body.date,
            time: req.body.time,
            description: req.body.description,
            price: req.body.price,
            contact: req.body.contact,
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
