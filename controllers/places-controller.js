const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
    {
        id: "p1",
        title: "Empire State Building",
        description: "One of the most famous...",
        location: {
            lat: 40.7484474,
            lng: -73.9871516,
        },
        address: "20 W 34th ST, New York, NY 10001",
        creator: "u1",
    },
];

const getPlaceById = (req, res, next) => {
    const placeID = req.params.pid;
    const place = DUMMY_PLACES.find((place) => place.id === placeID);

    if (!place) {
        throw new HttpError("Could not find a place", 404);
    }

    res.json({ place });
};

const getPlaceByUserId = (req, res, next) => {
    const userID = req.params.uid;
    const place = DUMMY_PLACES.find((place) => place.creator === userID);

    if (!place) {
        return next(new HttpError("Could not find a place", 404));
    }

    res.json({ place });
};

const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body;

    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator,
    };

    DUMMY_PLACES.push(createPlace);

    res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
