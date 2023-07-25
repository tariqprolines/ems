export default function AuthHeader(){
const token = JSON.parse(localStorage.getItem('jwt'))
    if(user){
        return {"x-auth-token":token}
    }else{
        return {}
    }
}