import axios from 'axios';

export default axios.create({
    baseURL: getBaseUrl()
})

function getBaseUrl(){
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
        return 'http://localhost:3080'
    else
        return 'https://www.server.gotarget.in'
}