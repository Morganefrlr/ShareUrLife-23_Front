import axios from 'axios'

export const request = axios.create({
    baseURL:"https://shareurlife-23-back.onrender.com/api",
    withCredentials: true,
})