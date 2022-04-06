module.exports = (req, res, next) => {
    if (req.session.role !== 'student') {
      return res.redirect("/student-profile");
    }
    next();
  };