import axios from 'axios'
import _this from '../main'

//设置全局的请求次数，请求的间隙，首次加载的开始时间
axios.defaults.retry = 3;
axios.defaults.retryDelay = 1500;
axios.defaults.firstRetryDelay = 10;

let loadingInstance;

// Spring Boot后端
export function requestRemote(){
    // 进行基础配置
    const instance = axios.create({
        baseURL:'http://211.159.225.217:8080/',
        timeout:3000,
    })

    // 设置请求拦截器
    instance.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        // loadingInstance = Loading.service({
        //     fullscreen: true,
        //     text:'加载中...',
        //     background:'0f'
        // })
        return config;
    }, function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对请求错误做点什么
        // loadingInstance.close()
        return Promise.reject(error);
    });

    //响应拦截器
    instance.interceptors.response.use(function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        // loadingInstance.close()
            _this.$loading.close()
        return response;
    }, (error) => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        error.config.__retryCount = error.config.__retryCount || 0
        _this.$loading.close()
        // 加入请求失败，进行重新请求的原理
        if(error.config.__retryCount < error.config.retry){
            error.config.__retryCount ++
            if(2 >= error.config.__retryCount >= 0){
                console.log(1)
                _this.$loading('重新加载，第' + error.config.__retryCount + '次')
            }
            let backoff = new Promise(function(resolve) {
                    let useTime = error.config.retryDelay;
                    if(error.config.__retryCount === 1){
                        useTime = error.config.firstRetryDelay
                    }
                    setTimeout(function() {
                        resolve();
                    }, useTime || 1);
            });
            // 返回调用axios重试请求的promise
            return backoff.then(function() {
                return instance(error.config);
            });
        }
        _this.$loading.close()
        return Promise.reject(  error);
    });

    return instance
}

