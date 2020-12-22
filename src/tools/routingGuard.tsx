import React from "react"
import { connect } from "react-redux"//redux用
import { Redirect} from "react-router-dom"//重定向路由用

function mapStateToProps(state: any) {
    return {
        loginType: state.user.loginType
    }
}
interface Iprops {
    loginType: Boolean;
}
//fromComponent=>需要处理的组件
export default (FromComponent:any) => {
    class EnhancedComponent extends React.Component<Iprops> {
        render() {//登录则返回对应组件，否则重定向到登录组件
            return (
                this.props.loginType ?
                    <FromComponent { ...this.props } /> :
                    <Redirect to= "/" />
            )
        }
    }
    return connect(mapStateToProps)(EnhancedComponent);
}