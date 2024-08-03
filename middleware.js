import logger from "./utils/logger.js";

export const checkSession = async (req, res, next) => {
  console.log(req.originalUrl);
  console.log({ session: req.session });

  if (
    req.session.user ||
    req.originalUrl === "/api/auth/login" ||
    req.originalUrl === "/api/auth/register" ||
    req.originalUrl === "/api/auth/logout"
  ) {
    next();
  } else {
    res.status(401).json({ error: "User not logged in" });
  }
};

export const logRequest = async (req, res, next) => {
  let { password, confirmPassword, ...body } = req.body;
  logger.info(
    `Request made to: ${req.originalUrl} at ${new Date().toISOString()}`
  );
  logger.info(`Request method: ${req.method}`);
  logger.info(`Request body: ${JSON.stringify(body)}`);
  next();
};
