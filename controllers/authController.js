const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');


exports.login = passport.authenticate('local', {
	failureRedirect: '/login',
	failureFlash: 'Failed Login',
	successRedirect: '/',
	successFlash: 'You are logged in now'
});

exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'Now you are logged out');
	res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()){
		next();
		return;
	}
	req.flash('error', 'you must be logged in');
	res.redirect('/login');
};

exports.forgot = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if(!user){
		req.flash('error', 'No user with that email');
		return res.redirect('/login');
	}

	user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
	user.resetPasswordExpires = Date.now() + 3600000;

	await user.save();

	//send email with token, email setup not done, tempory for testing
	const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
	//dont do this, only temporary
	req.flash('success', `Reset password link has been emailed. ${resetURL}`);
	res.redirect('/login');
};

exports.reset = async (req, res) => {
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() }
	});
	if(!user){
		req.flash('error', 'Password reset is invalid or has expired');
		return res.redirect('/login');
	}
	res.render('reset', { title: 'Reset Password'});
};

exports.confirmedPasswords = (req, res, next) => {
	if(req.body.password === req.body['password-confirm']){
		next();
		return;
	}
	req.flash('error', 'Passwords do not match');
	res.redirect('back');
};

exports.update = async (req, res) => {
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() }
	});
	if(!user){
		req.flash('error', 'Password reset is invalid or has expired');
		return res.redirect('/login');
	}	

	const setPassword = promisify(user.setPassword, user);
	await setPassword(req.body.password);
	user.resetPasswordToken = undefined;
	user.resetPasswordExpires = undefined;
	const updatedUser = await user.save();
	await req.login(updatedUser);
	req.flash('success', 'Password has been reset, you are now logged in');
	res.redirect('/');

};
