import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken;

export const isAuth = (req, res, next) => {
  let isAuthed = false;
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new Error("Not authenticated");
  } else {
    try {
      const token = authorization.split(" ");
      if (token[0] === "Bearer" && token[1] !== undefined) {
        const payload = verify(token[1], process.env.ACCESS_TOKEN_SECRET);

        if (payload.userId) {
          isAuthed = true;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  res.isAuthed = isAuthed;

  return next();
};
