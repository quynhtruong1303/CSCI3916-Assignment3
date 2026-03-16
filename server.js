require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const authJwtController = require('./auth_jwt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./Users');
const Movie = require('./Movies');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

const router = express.Router();

// ─── Signup ────────────────────────────────────────────────────────────────────
router.post('/signup', async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ success: false, msg: 'Please include both username and password to signup.' });
    }
    try {
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
        });
        await user.save();
        res.status(201).json({ success: true, msg: 'Successfully created new user.' });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ success: false, message: 'A user with that username already exists.' });
        }
        return res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
});

// ─── Signin ────────────────────────────────────────────────────────────────────
router.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username }).select('name username password');
        if (!user) {
            return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
        }
        const isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            const userToken = { id: user._id, username: user.username };
            const token = jwt.sign(userToken, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.json({ success: true, token: 'JWT ' + token });
        } else {
            res.status(401).json({ success: false, msg: 'Authentication failed. Incorrect password.' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
});

// ─── Movies ────────────────────────────────────────────────────────────────────
router.route('/movies')
    .get(authJwtController.isAuthenticated, async (req, res) => {
        try {
            const movies = await Movie.find();
            res.json(movies);
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    })
    .post(authJwtController.isAuthenticated, async (req, res) => {
        if (!req.body.actors || req.body.actors.length === 0) {
            return res.status(400).json({ success: false, message: 'Movie must include at least one actor.' });
        }
        try {
            const movie = new Movie({
                title: req.body.title,
                releaseDate: req.body.releaseDate,
                genre: req.body.genre,
                actors: req.body.actors,
            });
            await movie.save();
            res.status(201).json({ success: true, message: 'Movie saved.', movie });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    })
    .put(authJwtController.isAuthenticated, (req, res) => {
        res.status(405).json({ success: false, message: 'PUT not supported on /movies. Use /movies/:title.' });
    })
    .delete(authJwtController.isAuthenticated, (req, res) => {
        res.status(405).json({ success: false, message: 'DELETE not supported on /movies. Use /movies/:title.' });
    });

router.route('/movies/:title')
    .get(authJwtController.isAuthenticated, async (req, res) => {
        try {
            const movie = await Movie.findOne({ title: req.params.title });
            if (!movie) return res.status(404).json({ success: false, message: 'Movie not found.' });
            res.json(movie);
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    })
    .post(authJwtController.isAuthenticated, (req, res) => {
        res.status(405).json({ success: false, message: 'POST not supported on /movies/:title. Use /movies.' });
    })
    .put(authJwtController.isAuthenticated, async (req, res) => {
        try {
            const movie = await Movie.findOneAndUpdate(
                { title: req.params.title },
                req.body,
                { new: true, runValidators: true }
            );
            if (!movie) return res.status(404).json({ success: false, message: 'Movie not found.' });
            res.json({ success: true, message: 'Movie updated.', movie });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    })
    .delete(authJwtController.isAuthenticated, async (req, res) => {
        try {
            const movie = await Movie.findOneAndDelete({ title: req.params.title });
            if (!movie) return res.status(404).json({ success: false, message: 'Movie not found.' });
            res.json({ success: true, message: 'Movie deleted.' });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    });

app.use('/', router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
