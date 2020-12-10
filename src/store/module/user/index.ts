import initState from "./state"
interface iAction{
  [x:string]:string;
}
const User=(state = initState, action:iAction)=>{
  let newState = { ...state };
  switch (action.type) {
    case "addCount":
      newState.total += 1;
      break;
    default:
      break;
  }
  return newState;
}
export default User;