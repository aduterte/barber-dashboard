import axios from "axios"

export default axios.create({
    baseURL: 'ws://localhost:3000/cable'
})