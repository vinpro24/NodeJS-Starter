// import { knex } from '../../services/database'

export async function getUsers(req, res) {
	try {
		const { page = 1, per_page = 10, orderby = 'created_at', order = 'asc' } = req.query

		res.status(200).json({ data: [], total: 0, page, per_page, orderby, order })
	} catch (err) {
		res.status(400).json(err)
	}
}

export async function getUserInfo(req, res) {
	try {
		const user = {} // get user from database
		res.status(200).json({ data: user })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
export async function getUser(req, res) {
	try {
		const { id } = req.params
		res.status(200).json({ data: id })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export async function updateUser(req, res) {
	try {
		const { avatar, name, email, phone } = req.body
		res.status(200).json({ data: { avatar, name, email, phone } })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export async function updateInfo(req, res) {
	try {
		const { avatar, name, email, phone } = req.body
		const { id } = req.params
		if (!id) {
			throw new Error('Lỗi không tìm thấy User')
		}
		const query = knex('users').where({ id }).first()

		const data = await query.clone()

		if (!data) {
			throw new Error('Không tồn tại User')
		}
		await query.clone().update({ avatar, name, email, phone })
		res.status(200).json({ status: true })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export async function deleteUser(req, res) {
	try {
		const { id } = req.params
		res.status(200).json({ status: true, id })
	} catch (err) {
		res.status(400).json(err)
	}
}
