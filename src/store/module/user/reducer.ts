import initState from "./state"
interface iAction{
  type:string;
  loginType:boolean;
  drawType:boolean;
  loginCount:number;
}
const User=(state = initState, action:iAction)=>{
  let newState = { ...state };
  switch (action.type) {
    case "set_login_Type":
        newState={...state,loginType:action.loginType};
        break;
    case "set_draw_type":
        newState={...state,drawType:action.drawType};
        break;
    case "set_login_count":
        newState={...state,loginCount:action.loginCount};
        break;
    default:
        break;
}
  return newState;
}
export default User;