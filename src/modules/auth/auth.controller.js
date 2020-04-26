import AuthService from '../../services/Auth'

export async function authJwt(req, res, next) {
	try {
		const token = AuthService.getTokenFromHeaders(req)
		if (!token || !token.id) throw new Error()
		const user = {} // get user from database
		req.user = user
		next()
	} catch (error) {
		req.user = null
		res.sendStatus(401)
	}
}

export async function check(req, res) {
	try {
		const jwtToken = AuthService.createToken(req.user)
		return res.status(200).json({ data: { token: jwtToken, user: req.user } })
	} catch (error) {
		res.status(400).json(error)
	}
}
