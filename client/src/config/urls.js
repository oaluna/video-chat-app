export const urls={
    login:{
        getAllUsers:`/api/users/login`,
    },
    rooms:{
        getUserRooms:'/api/groups',
        addNewUser:'/api/groups/adduser',
    },
    users:{
        getOneuser:'/api/users'
    },
    messages:{
        messagesByGroup:'/api/groupmessages',
    },
    register:{
        addNewUser:"/api/users/add"
    }
}