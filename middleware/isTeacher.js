module.exports = (req, res, next) => {
	if (req.session.role !== "teacher") {
		return res.redirect("/api/teacher-profile");
	}
	next();
};
