import * as actionType from "./actionType"//引入对应的action type

const actioin = {
  set_login_Type(loginType:boolean) {//设置登录状态
    return {
      type: actionType.set_login_Type,//也就是执行哪个动作（函数）
      loginType: loginType
    }
  },
  set_draw_type(drawType:boolean) {//设置抽奖状态
    return {
      type: actionType.set_draw_type,//也就是执行哪个动作（函数）
      drawType: drawType
    }
  },
  set_login_count(loginCount:number) {//设置抽奖状态
    return {
      type: actionType.set_login_count,//也就是执行哪个动作（函数）
      loginCount: loginCount
    }
  }
}

export default actioin;
