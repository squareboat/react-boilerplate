import axios from 'axios'
import {notification} from 'antd'
import {get} from 'lodash';

const axiosConfiguration = () => axios.create({
    baseURL:"Your Base Url Goes Here    ",
    timeout:30000
})

const axiosInstance = axiosConfiguration()

axiosInstance.interceptors.request.use(
    async config => {
        const { store } = await import('../index')
        const  state = store.getState()

        config.headers = {
            Accept: 'application/json',
            Authorization: `Bearer `
        }
        return config
    }
)

axiosInstance.interceptors.response.use(
    response => {
        return response
    },
    err => {
        console.log(err)
        if (err.response) {
            if (get(err, 'response.status', false)) {
              if (err.response.status === 400) {
                notification.warn({
                    message:'ERROR!!!     ',
                    description: get(err, 'response.data.message', 'Network Error')
                })
              }
            }
          }
    }
)

export default axiosInstance