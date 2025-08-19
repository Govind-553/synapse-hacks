/**
 * Middleware to authorize a user based on their role.
 * It checks if the authenticated user's role is included in the allowed roles list.
 * @param {string[]} allowedRoles - An array of roles that are permitted to access the route.
 * @returns {function} The middleware function.
 */
exports.authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: 'Access denied. No role assigned.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
};
