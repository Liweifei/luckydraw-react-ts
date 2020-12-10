import React from 'react'
import './PageLogin.scss'
import imgUrl from "../../assets/img/PageLogin/landing_bg.png"
import { Form, Input, Button, message, Modal } from 'antd'
// import axios from "@/tools/axiosTool"
import { connect } from "react-redux"
// import action from "@/tools/react-redux/action"//拿到react-redux需要匹配进来的动作的object，也就是拿type

function mapStateToProps(state: { [x: string]: any }) {
  return {
    // drawType: state.luckydraw.drawType,
  }
}
function mapActionToProps(dispatch: { [x: string]: any }) {
  return {
    // set_draw_type: (type) => dispatch(action.set_draw_type(type)),
    // set_login_count: (num) => dispatch(action.set_login_count(num)),
    // set_login_Type: (type) => dispatch(action.set_login_Type(type)),
  }
}

class PageLogin extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className="PageLogin">
        <img src={imgUrl} alt="error" className="headBg" />
        <div className="main">
          <h1 className="sysName">我该吃什么咯</h1>
          <div className="formBox">
            <h2 className="title">欢迎登录</h2>
            <div className="content">
              <Form>
                <div className="inputItem">
                  <div className="labe">
                    <span className="name">账号</span>
                  </div>
                  <Form.Item>
                    <Input size="large" placeholder="请输入您的账号" />
                  </Form.Item>
                </div>
                <div className="inputItem">
                  <div className="labe">
                    <span className="name">密码</span>
                  </div>
                  <Form.Item>
                    <Input size="large" placeholder="请输入您的密码" onPressEnter={this.login} />
                  </Form.Item>
                </div>
                <Button className="confirmBtn" htmlType="submit" type="primary">登录</Button>
              </Form>
            </div>
          </div>
          <p className="copyright">李韦飞（Liweifei19950111）版权所有</p>
        </div>
      </div>
    )
  }
  componentDidMount() {
  }
  login() {
    //登录
  }
}
export default connect(mapStateToProps, mapActionToProps)(PageLogin);