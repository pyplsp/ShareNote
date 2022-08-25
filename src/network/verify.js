// 有关验证的请求
import {requestRemote} from "@/network/request";

// 远程的登录请求
export function login(username,password) {
    return requestRemote().post('login/',{
        username:username,
        password:password
    },{

    })
}

// 每次打开页面，自动进行
export function refresh(){
    return requestRemote().get('refresh/',{
        headers:{'token':localStorage.getItem('token')}
    })
}

// 远程的注册请求
export function register(username,password) {
    return requestRemote().post('register/',{
        username:username,
        password:password
    },{

    })
}
