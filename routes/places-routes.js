const express = require("express");
const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controllers");
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get("/testing", (req, res, next) => {
  console.log("GET request in Places, endpoint /testing");
  res.json({
    message: "----> It works!",
  });
});

router.get("/:pid", placesControllers.getPlaceById); //------> DON"T FORGET THAT THE SEQUENCE OF YOUR ROUTES MATTERS !

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.post(
  "/",
  fileUpload.single('image'),
  [
    check("title").not().isEmpty(),                 //---> english: we check that the 'title' is not empty
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);

router.patch(
  "/:pid",
  [
    check("title").not().isEmpty(), 
    check("description").isLength({ min: 5 }),
  ],
  placesControllers.updatePlace
);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
