const passport = require('passport');

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