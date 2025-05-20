// we will use that function in places where we wanr token
export function getAuthToken(){
    const token = localStorage.getItem('token')
    return token
}

//we will add more 