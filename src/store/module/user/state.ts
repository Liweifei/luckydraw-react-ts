interface iState{
  loginType:boolean;
  drawType:boolean;
  loginCount:number;
}
let State:iState={
  loginType:false,
  drawType:true,//是否已抽奖
  loginCount:1,//登录次数
}
export default State;