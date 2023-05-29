import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: ("API-KEY": "6c88fbbd-f8a3-4d9c-8fe5-94c249c015b1")
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(res => {return res.data})
    },
    setFollow(userId){
        return instance.post(`follow/${userId}`)

    },
    setUnfollow(userId){
        return instance.delete(`follow/${userId}`)
    }
}

export const loginAPI = {
    setAuth(){
        return instance.get(`auth/me`).then(res => res.data)
    }
}

export const profileAPI = {
    setUser(userId){
        return instance.get(`profile/${userId}`)
    }
}
