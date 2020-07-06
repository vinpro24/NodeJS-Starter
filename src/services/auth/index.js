import jwt from "jsonwebtoken"
import Facebook from "./providers/Facebook"
import Google from "./providers/Google"

const JWT_OPTS = {
    expiresIn: process.env.JWT_OPTS_EXPIRE_IN,
    issuer: process.env.JWT_OPTS_ISSUER
}

const createToken = user => {
    if (!user && !user.id) {
        return null
    }

    const payload = { id: user.id }

    return jwt.sign(payload, process.env.JWT_SECRET, JWT_OPTS)
}

const verifyToken = token => {
    return jwt.verify(token, process.env.JWT_SECRET, JWT_OPTS)
}

const getTokenFromHeaders = req => {
    const token = req.headers.authorization

    if (token) {
        const arr = token.split(" ")

        if (arr[0] === "Bearer" && arr[1]) {
            try {
                return verifyToken(arr[1])
            } catch (error) {
                return null
            }
        }
    }

    return null
}

export default {
    createToken,
    verifyToken,
    getTokenFromHeaders,
    Provider: { Facebook, Google }
}
