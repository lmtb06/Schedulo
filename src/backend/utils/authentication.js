import jwt from "jsonwebtoken";

/**
 *
 * @param req
 * @param res
 * @param next
 */
export function authenticate(req, res, next) {
    try {
        const token = req.cookies.accessToken;
        const user = jwt.verify(token, process.env.SECRET);
        res.locals.user = user;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.cookie("accessToken", null);
            res.redirect("/");
        }
    }
    next();
}

/**
 *
 * @param user
 */
export function createJWT(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
        },
        process.env.SECRET,
        { expiresIn: "1h" }
    );
}
