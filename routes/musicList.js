const express = require('express');
const router = express.Router();

const models = require('../models/music');
const usersMusic = require('../models/usersMusic')

router.post('/allMusic', (req, res) => {
	models.find({}).then((allMusic) => {
		res.send(allMusic);
	});
});

router.post('/myMusic', (req, res) => {
	const { userId } = req.body

	usersMusic.find({autor: userId}).then((MyMusic) => {
		res.send(MyMusic);
	});
});

router.post('/likeSong', (req, res) => {
	const { text, userId } = req.body

	const likedSong = new usersMusic({
		song: text,
		autor: userId
	});

	likedSong.save();
	res.send();
});

router.post('/deleteSong/:id', (req, res) => {
	const { id } = req.body;

	usersMusic.findOneAndDelete({ _id: id })
		.then(result => {
			res.send(result);
			return result.save();
		})
})

router.post('/addSong', async (req, res) => {
	const { song1, song2, song3 } = req.body

	const newSong1 = new models({
		song: song1
	});
	await newSong1.save();

	const newSong2 = new models({
		song: song2
	});
	await newSong2.save();

	const newSong3 = new models({
		song: song3
	});
	await newSong3.save();
});

module.exports = router;