import axiosInstance from '../utilities/configureAxios'

export default async function Login(payload={}) {
    return axiosInstance.post('/admin/login',payload)
    .then(() => true)
    .catch(error => {
        console.log(error)
    })
}
