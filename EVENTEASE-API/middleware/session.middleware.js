/**
 * Middleware to check if a user is authenticated via session.
 * If the user is authenticated, it proceeds to the next middleware.
 * Otherwise, it redirects to the login page.
 
 */
export const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/api/auth/login");
  }
};

/**
 * Middleware to check if the authenticated user has an 'Organizer' role.
 * If the user is an organizer, it proceeds to the next middleware.
 * Otherwise, it sends a 403 Forbidden response.
 */
export const isOrganizer = (req, res, next) => {
  if (req.session.user && req.session.user.role === "Organizer") {
    next();
  } else {
    res.status(403).send("Forbidden: You do not have organizer privileges.");
  }
};
