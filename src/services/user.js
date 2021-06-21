import axiosInstance from '../utilities/configureAxios'
export async function verfiOtp(mobile,otp) {
    return axiosInstance.post('/verify-otp',{mobile,otp})
    .then(() => true)
    .catch(error => {
        console.log(error)
    })
}
