// import React from 'react'
import * as React from 'react'
import './PageLogin.scss'
import imgUrl from "img/PageLogin/landing_bg.png"
import axios from "@/tools/axiosTool"

import { Form, Input, Button, message, Modal } from 'antd'
import { FormInstance } from 'antd/lib/form';
import { connect } from "react-redux"
// import action from "@/tools/react-redux/action"//拿到react-redux需要匹配进来的动作的object，也就是拿type
const { confirm } = Modal;

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
interface Props { }
interface State {
  name: number
}

class PageLogin extends React.Component<Props, State>  {
  formRef = React.createRef<FormInstance>();
  constructor(props: Props) {
    super(props);
    this.state = {
      name: 1
    }
  }
  render() {
    return (
      <div className="PageLogin">
        <img src={imgUrl} alt="error" className="headBg" onClick={this.login}/>
        <div className="main">
          <h1 className="sysName">我该吃什么咯</h1>
          <div className="formBox">
            <h2 className="title">欢迎登录</h2>
            <div className="content">
              <Form onFinish={this.login} ref={this.formRef}>
                <div className="inputItem">
                  <div className="labe">
                    <span className="name">账号</span>
                  </div>
                  <Form.Item name="userName">
                    <Input size="large" placeholder="请输入您的账号" onPressEnter={this.login} />
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
  componentDidMount():void {
    const formRef=this.formRef.current as FormInstance;
    // this.formRef.current?.setFieldsValue({userName:"luckydrawName"})
    // (this.formRef.current as FormInstance).setFieldsValue({userName:"luckydrawName"})
    let luckydrawName = localStorage.getItem("luckydrawName");
    let luckydrawPsd = localStorage.getItem("luckydrawPsd");
    let luckydrawToken = localStorage.getItem("luckydrawToken");
    if (luckydrawName) formRef.setFieldsValue({"userName":luckydrawName});
    if (luckydrawPsd) formRef.setFieldsValue({"psd":luckydrawPsd});
    if (luckydrawToken) axios.defaults.headers.common["Authorization"] = luckydrawToken;
  }
  login=():void=> {
    // this.formRef.current.setFieldsValue({"name":luckydrawName})
    console.log(this.state.name);
  }
  // login(e: any):string {
  //   //登录
  //   return "";
  //   e.preventDefault();
  //   const name = this.props.form.getFieldValue("name");
  //   const psd = this.props.form.getFieldValue("psd");
  //   if (!name || !psd) {
  //     message.warning('请输入账号及密码！');
  //     return;
  //   }
  //   axios
  //     .post("/user/login", {
  //       name: encodeURI(name.trim()),
  //       psd: psd.trim()
  //     })
  //     .then(response => {
  //       // 登录成功后要跳转到首页，并传值过去
  //       if (response.data.type) {
  //         localStorage.setItem("luckydrawName", name);
  //         localStorage.setItem("luckydrawPsd", psd);
  //         localStorage.setItem("luckydrawToken", response.data.data.token);

  //         this.props.set_draw_type(response.data.data.drawType)
  //         this.props.set_login_count(response.data.data.loginCount)
  //         this.props.set_login_Type(true)
  //         console.log(this.props);
  //         // this.$commonType.drawType = response.data.data.drawType;
  //         // this.$commonType.loginCount = response.data.data.loginCount;

  //         axios.defaults.headers.common["Authorization"] =
  //           response.data.data.token;
  //         // this.$store.dispatch("setLoginType");//设置登录状态，避免点刷新的时候本页面显示无信息
  //         confirm({
  //           title: '提示',
  //           content: '未录数据?是否前往录入饭店数据？',
  //           okText: "确认",
  //           cancelText: "取消",
  //           onOk() {
  //             this.props.history.push({
  //               pathname: '/appAdditem'
  //             })
  //           },
  //           onCancel() {
  //             this.props.history.push({
  //               pathname: '/appMain'
  //             })
  //           },
  //         });
  //       } else {
  //         message.error(response.data.msg);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);

  //       // message.error(error.response.data.msg);
  //     });
  // }
}
export default connect(mapStateToProps, mapActionToProps)(PageLogin);