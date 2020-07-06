import axios from 'axios'

const BASE_URL = 'https://www.googleapis.com/userinfo/v2/me'

const authAsync = async (accessToken) => {
    try {
        const res = await axios.get(BASE_URL, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        if (res.status === 200) {
            const user = {
                email: res.data.email,
                name: res.data.name,
                firstname: res.data.given_name,
                lastname: res.data.family_name,
                avatar: res.data.picture,
                provider: {
                    uid: res.data.id,
                    type: 'GOOGLE',
                    accessToken
                }
            }
            return user
        }

        throw new Error('No success with Google')
    } catch (error) {
        throw error
    }
}

export default authAsync
