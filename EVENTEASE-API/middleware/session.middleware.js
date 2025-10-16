export const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/api/auth/login");
  }
};

export const isOrganizer = (req, res, next) => {
  if (req.session.user && req.session.user.role === "Organizer") {
    next();
  } else {
    res.status(403).send("Forbidden: You do not have organizer privileges.");
  }
};
