const axios = require("axios");
const qs = require('qs'); //将url中的参数转为对象；将对象转为url参数形式
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么 比如开启loading
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么 比如关闭loading
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

const oneHttp = axios.create({
    baseURL: 'https://api.example1.com',
    timeout: 5000
});
const twoHttp = axios.create({
    baseURL: 'https://api.example2.com',
    timeout: 5000
});
const threeHttp = axios.create({
    baseURL: 'https://api.example3.com',
    timeout: 5000
});

function checkStatus (response) {
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response
        // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: '网络异常'
    }
}
function checkCode (res) {
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (res.status === -404) {
        alert(res.msg)
    }
    if (res.data && (!res.data.success)) {
        alert(res.data.error_msg)
    }
    return res
}

export default {
    post (url, data) {
        return oneHttp({
            method: 'post',
            url,
            data: qs.stringify(data),
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    get (url, params) {
        return twoHttp({
            method: 'get',
            url,
            params:qs.parse(params), // get请求时带的参数(这里是传的字符串转obj对象)
            timeout: 10000,//这里的会覆盖config设置的timeout
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    }
}
