export const authorizationRole = (...roles) => {
  return (req, res, next) => {
    const { role } = req.user;

    if (!roles.includes(role)) {
      return res.sendStatus(401);
    }
    next();
  };
};
