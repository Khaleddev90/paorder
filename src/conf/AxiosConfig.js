import axios from 'axios'
import {store} from '../store'
import {NotificationManager} from 'react-notifications'

class AxiosConfig {
    static init() {
        axios.interceptors.request.use((config) => {
            const token = store.getState().user.token
            if (token) {
                config.headers.common.Authorization = `Bearer ${token}`
            }

            return config
        })

        axios.interceptors.request.use(null, (error) => {
            if (error.response) {
                if (error.response.status === 500) {
                    NotificationManager.error('A server error occurred. Please try again or contact support.', 'Server error', 10000)
                }
            }

            return Promise.reject(error)
        })
    }
}

export default AxiosConfig
