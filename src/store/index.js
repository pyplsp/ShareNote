import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// vuex的东西是保存在内存当中的，当页面刷新时会清空值
const store = new Vuex.Store({
    state:{
        // 验证位，用户已经登进去了的话就不用重新验证token
        verify:false,
        // 判断主页是否应该重新渲染的状态符（）
        noteStatus:false,
        // 判断用户页是否应该重新渲染的状态符（用户编辑完信息返回的时候，user界面需要重新渲染）
        userStatus:false
    },
    mutations:{
        // 改变验证位
        changeVerify(state){
            state.verify = !state.verify
        },
        // 改变主页渲染状态符
        changeNoteStatus(state){
            state.noteStatus = !state.noteStatus
        },
        // 改变用户页状态符
        changeUserStatus(state){
               state.userStatus = !state.userStatus
        }
    }
})

export function myStore () {
    return store;
}

export default store
