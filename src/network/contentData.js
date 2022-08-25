// 在这里，home页面有关的请求都会放在这里
// 具体接口的作用是什么，请看 http://211.159.225.217:8080/lkadoc.html


import {requestRemote} from './request'

// 进行文章的查询
export function notes() {
    return  requestRemote().get('index/',{
        headers:{'token':localStorage.getItem('token')}
    })
}

// 进行文章的更新
export function update(id,content,title,image,userAreaName,changeShareArea) {
    let params = new FormData()
    if (changeShareArea !== undefined && changeShareArea !== '')
        params.append('shareAreaName', changeShareArea)
    if (id !== undefined && id !== '')
        params.append('id',id)
    if (content !== undefined && content !== '')
        params.append('content',content)
    if (title !== undefined && title !== '')
        params.append('title',title)
    if (image !== undefined && image !== '')
        params.append('file',image)
    if (userAreaName !== undefined && userAreaName !== '')
        params.append('userAreaName',userAreaName)
    return requestRemote().post('note/update/',params,{
        headers:{'token':localStorage.getItem('token')}
    })
}


export function add(content,title,file) {
    const params = new FormData();
    params.append('title', title);
    params.append('content', content);
    params.append('file', file);
    return requestRemote().post('note/add/',params,{
        headers:{'token':localStorage.getItem('token')}
    })
}

export function details(id) {
    return requestRemote().post('note/detail/',{
        id:id
    },{
        headers:{'token':localStorage.getItem('token')}
    })
}

export function deleteNote(id) {
    return requestRemote().post('note/delete/',{
        id:id
    },{
        headers:{'token':localStorage.getItem('token')}
    })
}

export function onlyAreaName() {
    return requestRemote().get('onlyareaname/',{
        headers:{'token':localStorage.getItem('token')}
    })
}

export function deleteArea(areaName) {
    return requestRemote().post('/user/delete/',{
        areaName:areaName
    },{
        headers:{'token':localStorage.getItem('token')}
    })
}

export function addArea(areaName) {
    return requestRemote().post('/user/add/',{
        areaName:areaName
    },{
        headers:{'token':localStorage.getItem('token')}
    })
}


export function search(text) {
    return requestRemote().post('usearch/',{
        text:text
    },{
        headers:{'token':localStorage.getItem('token')}
    })
}

export function searchByArea(areaName) {
    return requestRemote().post('uarea/index/',{
        areaName:areaName
    },{
        headers:{'token':localStorage.getItem('token')}
    })
}

export function AllShareTitle() {
    return requestRemote().get('share/titles/',{
        headers:{'token':localStorage.getItem('token')}
    })
}

export function ShowContentByShareTag(areaName){
    return requestRemote().get('sarea/index/',{
        headers:{'token':localStorage.getItem('token')},
        params:{
            areaName:areaName
        }
    })
}

export function getShareNoteById(noteId){
    return requestRemote().get('share/detail/',{
        headers:{'token':localStorage.getItem('token')},
        params:{
            id:noteId
        }
    })
}

export function sendComment(targetId,content){
    return requestRemote().post('comment/note/',{
        targetId:targetId,
        content:content,
    },{
        headers:{'token':localStorage.getItem('token')},
    })
}

export function sendCommentChild(targetId,content){
    return requestRemote().post('comment/child/',{
        targetId:targetId,
        content:content,
    },{
        headers:{'token':localStorage.getItem('token')},
    })
}

export function getCommentByTime(id){
    return requestRemote().get('comment/index/',{
        headers:{'token':localStorage.getItem('token')},
        params:{
            id:id
        }
    })
}

export function getCommentByLike(id){
    return requestRemote().get('/comment/likeOrder/',{
        headers:{'token':localStorage.getItem('token')},
        params:{
            id:id
        }
    })
}



export function getCommentChild(id){
    return requestRemote().get('comment/child/index/',{
        headers:{'token':localStorage.getItem('token')},
        params:{
            id:id
        }
    })
}

export function deleteCommentById(id) {
    return requestRemote().get('/comment/del/',{
        headers:{'token':localStorage.getItem('token')},
        params:{
            id:id
        }
    })
}


export function getUserInfo() {
    return requestRemote().get('/myuser/',{
        headers:{'token':localStorage.getItem('token')}
    })
}

export function likeComment(id) {
    return requestRemote().get('/comment/like/',{
        headers:{'token':localStorage.getItem('token')},
        params:{
            id:id
        }
    })
}

export function dislikeComment(id) {
    return requestRemote().get('/comment/dislike/',{
        headers:{'token':localStorage.getItem('token')},
        params:{
            id:id
        }
    })
}

export function likeNote(id) {
    return requestRemote().get('/note/like/',{
        headers:{'token':localStorage.getItem('token')},
        params:{
            id:id
        }
    })
}


export function dislikeNote(id) {
    return requestRemote().get('/note/dislike/',{
        headers:{'token':localStorage.getItem('token')},
        params:{
            id:id
        }
    })
}

export function updateUserInfo(file,name,birthday,motto) {
    const params = new FormData();
    params.append('file', file);
    params.append('name', name);
    params.append('birthday', birthday);
    params.append('motto', motto);
    return requestRemote().post('/updateuser/',params,{
        headers:{'token':localStorage.getItem('token')}
    })
}


export function mark() {
    return requestRemote().get('/mark/',{
        headers:{'token':localStorage.getItem('token')},
    })
}


export function addMark(title) {
    return requestRemote().get('/mark/add/',{
        headers:{'token':localStorage.getItem('token')},
        params:{areaName:title}
    })
}

export function deleteMark(title) {
    return requestRemote().get('/mark/del/',{
        headers:{'token':localStorage.getItem('token')},
        params:{areaName:title}
    })
}

export function addNoteMark(noteId,title) {
    return requestRemote().get('/mark/note/add/',{
        headers:{'token':localStorage.getItem('token')},
        params:{
            id:noteId,
            areaName:title
        }
    })
}


export function cancelNoteMark(noteId) {
    return requestRemote().get('/mark/note/del/',{
        headers:{'token':localStorage.getItem('token')},
        params:{
            id:noteId,
        }
    })
}

export function getMarkByAreaName(areaName) {
    return requestRemote().get('/mark/index/',{
        headers:{'token':localStorage.getItem('token')},
        params:{
            areaName:areaName,
        }
    })
}

export function userLike() {
    return requestRemote().get('/user/like/',{
        headers:{'token':localStorage.getItem('token')},
    })
}


export function getMyInfo() {
    return requestRemote().get('/myuser/',{
        headers:{'token':localStorage.getItem('token')},
    })
}

export function getEachUserInfo(userId) {
    return requestRemote().get('/getuser/',{
        params:{
            id:userId
        },
        headers:{'token':localStorage.getItem('token')},
    })
}


export function followUser(userId){
    return requestRemote().get('/follow/',{
        params:{
            id:userId
        },
        headers:{'token':localStorage.getItem('token')},
    })
}

export function disFollowUser(userId){
    return requestRemote().get('/disfollow/',{
        params:{
            id:userId
        },
        headers:{'token':localStorage.getItem('token')},
    })
}



export function getFiveShareNotes(userId) {
    return requestRemote().get('/user/getFrontFriShare',{
        params:{
            id:userId
        },
        headers:{'token':localStorage.getItem('token')},
    })
}

export function getFiveCollectNotes(userId) {
    return requestRemote().get('/user/getFrontFirMark',{
        params:{
            id:userId
        },
        headers:{'token':localStorage.getItem('token')},
    })
}

export function getFiveLikeNotes(userId) {
    return requestRemote().get('/user/getFrontFriLike/',{
        params:{
            id:userId
        },
        headers:{'token':localStorage.getItem('token')},
    })
}


export function getLikeNote() {
    return requestRemote().get('/info/like/note/',{
        headers:{'token':localStorage.getItem('token')},
    })
}

export function getLikeComment() {
    return requestRemote().get('/info/like/comment/',{
        headers:{'token':localStorage.getItem('token')},
    })
}

export function getCommentNote() {
    return requestRemote().get('/info/note/comment/',{
        headers:{'token':localStorage.getItem('token')},
    })
}

export function getCommentComment() {
    return requestRemote().get('/info/to/comment/',{
        headers:{'token':localStorage.getItem('token')},
    })
}

