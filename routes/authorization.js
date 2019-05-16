const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const withAuth = require('../middleware');

const models = require('../models/user');

const { secret } = require('../secrets');

router.post('/register', (req, res) => {

	const { username, lastname, email, password } = req.body.user;

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

	const { email, password } = req.body.user;

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
	const { userId } = req.body;

	models.find({_id: userId}).then((user) => {
		res.send(user);
	});
});

router.post('/userNameEdit', (req, res) => {
	const { username, userId } = req.body;

	models.findById(userId)
		.then(result => {
			if (username && username !== username.email) {
				result.username = username;
				res.send(result);
				return result.save()
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
})

router.post('/lastNameEdit', (req, res) => {
	const { lastname, userId } = req.body;

	models.findById(userId)
		.then(result => {
			if (lastname && lastname !== lastname.email) {
				result.lastname = lastname;
				res.send(result);
				return result.save()
			} else {
				res.send(result);
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
})

router.post('/emailEdit', (req, res) => {
	const { email, userId } = req.body;

	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	
	models.findById(userId)
		.then(result => {
			if (email && email !== result.email && reg.test(email) == true) {
				result.email = email;
				res.send(result);
				return result.save()
			} else {
				res.send(result);
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
		
})

router.post('/passwordEdit', (req, res) => {
	const { password, newPassword, userId } = req.body;

	models.findById(userId)
		.then(result => {
			if (!password || !newPassword) {
				res.status(401)
				.json({
					ok: false,
					error: 'Все поля должны быть заполнены!'
				});
			} else {
				bcrypt.compare(password, result.password, function (err, pass) {
					if (pass) {
					bcrypt.hash(newPassword, null, null, (err, hash) => {
						result.password = hash;
						res.sendStatus(200);
						return result.save()
					})
					} else {
						res.status(401)
						.json({
							ok: false,
							error: 'Пароль неверен!'
						});
					}
				})
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
		
})

router.post('/checkToken', withAuth, (req, res) => {
	res.sendStatus(200);
});

module.exports = router;