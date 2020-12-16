import * as React from 'react'
import './PageLogin.scss'
import imgUrl from "img/PageLogin/landing_bg.png"
import axios from "@/tools/axiosTool"

import { Form, Input, Button, message, Modal } from 'antd'
import { FormInstance } from 'antd/lib/form';
import { connect } from "react-redux"
import action from "@/store/action"//拿到react-redux需要匹配进来的动作的object，也就是拿type
const { confirm } = Modal;

function mapStateToProps(state: any) {
  return {
    drawType: state.user.drawType,
  }
}
function mapActionToProps(dispatch: any) {
  return {
    set_draw_type: (type: boolean) => dispatch(action.set_draw_type(type)),
    set_login_count: (num: number) => dispatch(action.set_login_count(num)),
    set_login_Type: (type: boolean) => dispatch(action.set_login_Type(type)),
  }
}
interface Props {
  set_draw_type:(x:boolean)=>void;
  set_login_count:(x:number)=>void;
  set_login_Type:(x:boolean)=>void;
  history:any;
}

class PageLogin extends React.Component<Props>  {
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
        <img src={imgUrl} alt="error" className="headBg" />
        <div className="main">
          <h1 className="sysName">我该吃什么咯</h1>
          <div className="formBox">
            <h2 className="title">欢迎登录</h2>
            <div className="content">
              <Form ref={this.formRef}>
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
                  <Form.Item name="psd">
                    <Input size="large" placeholder="请输入您的密码" onPressEnter={this.login} />
                  </Form.Item>
                </div>
                <Button className="confirmBtn" type="primary" onClick={this.login}>登录</Button>
              </Form>
            </div>
          </div>
          <p className="copyright">李韦飞（Liweifei19950111）版权所有</p>
        </div>
      </div>
    )
  }
  componentDidMount(): void {
    const formRef = this.formRef.current as FormInstance;
    // this.formRef.current?.setFieldsValue({userName:"luckydrawName"})
    // (this.formRef.current as FormInstance).setFieldsValue({userName:"luckydrawName"})
    let luckydrawName = localStorage.getItem("luckydrawName");
    let luckydrawPsd = localStorage.getItem("luckydrawPsd");
    let luckydrawToken = localStorage.getItem("luckydrawToken");
    
    if (luckydrawName) formRef.setFieldsValue({ "userName": luckydrawName });
    if (luckydrawPsd) formRef.setFieldsValue({ "psd": luckydrawPsd });
    if (luckydrawToken) axios.defaults.headers.common["Authorization"] = luckydrawToken;
  }
  login = (): void => {
    const formRef = this.formRef.current as FormInstance;
    const name = formRef.getFieldValue("userName");
    const psd = formRef.getFieldValue("psd");
    if (!name || !psd) {
      message.warning('请输入账号及密码！');
      return;
    }
    axios
      .post("/user/login", {
        name: encodeURI(name.trim()),
        psd: psd.trim()
      })
      .then(response => {
        // 登录成功后要跳转到首页，并传值过去
        if (response.data.type) {
          localStorage.setItem("luckydrawName", name);
          localStorage.setItem("luckydrawPsd", psd);
          localStorage.setItem("luckydrawToken", response.data.data.token);

          this.props.set_draw_type(response.data.data.drawType)
          this.props.set_login_count(response.data.data.loginCount)
          this.props.set_login_Type(true)

          axios.defaults.headers.common["Authorization"] =
            response.data.data.token;
          confirm({
            title: '提示',
            content: '未录数据?是否前往录入饭店数据？',
            okText: "确认",
            cancelText: "取消",
            onOk:():void=> {
              this.props.history.push({
                pathname: '/PageAddRestaurant'
              })
            },
            onCancel:():void =>{
              this.props.history.push({
                pathname: '/PageMain'
              })
            },
          });
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(error => {
        console.log(error);

        // message.error(error.response.data.msg);
      });
  }
}
export default connect(mapStateToProps, mapActionToProps)(PageLogin);