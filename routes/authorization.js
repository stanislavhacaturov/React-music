const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const withAuth = require('../middleware');

const models = require('../models/user');

// const secret = require('../config');
const secret = 'mysecretsshhh';

router.post('/register', (req, res) => {

	const username = req.body.user.username;
	const lastname = req.body.user.lastname;
	const email = req.body.user.email;
	const password = req.body.user.password;

	if (!username || !password || !lastname || !email) {
		res.status(401)
		.json({
			ok: false,
			error: 'Все поля должны быть заполнены!',
		});
	} else if (password.length < 3 || password.length > 16) {
		res.status(401)
		.json({
			ok: false,
			error: 'Длиная пароля от 3 до 16 символов!',
			fields: ['password']
		});
	} else {
		models.findOne({
			email
		}).then(user => {
			if (!user) {
				bcrypt.hash(password, null, null, (err, hash) => {
					models.create({
						username,
						lastname,
						email,
						password: hash
					})
						.then(user => {
							console.log(user);
							res.status(200)
							.json({
								ok: true,
								message: 'Ура! Аккаунт создан'
							});
						})
						.catch(err => {
							console.log(err);
							res.status(500)
							.json({
								ok: false,
								error: 'Ошибка, попробуйте позже!'
							});
						});
				});
			} else {
				res.status(401)
				.json({
					ok: false,
					error: 'Пользователь с таким Email уже существует!',
					fields: ['email']
				});
			}
		});
	}
});

router.post('/authorization', (req, res) => {
	const email = req.body.user.email;
	const password = req.body.user.password;

	if (!email || !password) {
		res.status(401)
		.json({
			ok: false,
			error: 'Все поля должны быть заполнены!',
		});
	} else {
		models.findOne({
			email
		})
			.then(user => {
				if (!user) {
					res.status(401)
					.json({
						ok: false,
						error: 'Email неверен!',
					});
				} else {
					bcrypt.compare(password, user.password, function (err, result) {
						if (!result) {
							res.status(401)
							.json({
								ok: false,
								error: 'Пароль неверен!',
								fields: ['email', 'password']
							});
						} else {		
							const payload = { email };
							const token = jwt.sign(payload, secret, {
							  expiresIn: '1h'
							});
							res.status(200).json({ 
								token,
								user: {
									id: user._id,
									name: user.username,
									lastname: user.lastname,
									email: user.email,
									password: user.password
								  }
							});
						}
					});
				}
			})
			.catch(err => {
				console.log(err);
				res.status(500)
				.json({
					ok: false,
					error: 'Ошибка, попробуйте позже!'
				});
			});
	}
});

router.post('/profile', (req, res) => {
	const { userId } = req.body

	models.find({_id: userId}).then((user) => {
		res.send(user);
	});
});

router.post('/userNameEdit', (req, res) => {
	const { username, userId } = req.body

	models.findById(userId)
		.then(result => {
			if (username.length > 0) {
				result.username = username;
				res.send(result);
				return result.save()
			}
		})
})

router.post('/lastNameEdit', (req, res) => {
	const { lastname, userId } = req.body

	models.findById(userId)
		.then(result => {
			if (lastname.length > 0) {
				result.lastname = lastname;
				res.send(result);
				return result.save()
			}
		})
})

router.post('/emailEdit', (req, res) => {
	const { email, userId } = req.body

	models.findById(userId)
		.then(result => {
			if (email.length > 0) {
				result.email = email;
				res.send(result);
				return result.save()
			}
		})
})

router.post('/passwordEdit', (req, res) => {
	const { password, userId } = req.body

	models.findById(userId)
		.then(result => {
			if (password.length > 0) {
				bcrypt.hash(password, null, null, (err, hash) => {
					result.password = hash;
					res.send(result);
					return result.save()
				})
			}
		})
})

router.post('/checkToken', withAuth, (req, res) => {
	res.sendStatus(200);
});

module.exports = router;