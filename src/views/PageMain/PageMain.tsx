import * as React from 'react'
import './PageMain.scss'
import { Link } from "react-router-dom"
import jumpGif from "img/jump.gif"
import { Modal, message } from 'antd';
import axios from "@/tools/axiosTool"
import { connect } from "react-redux"
import action from "@/store/action"//拿到react-redux需要匹配进来的动作的object，也就是拿type
const { confirm } = Modal;

function mapStateToProps(state: any) {
  return {
    drawType: state.user.drawType,
    loginCount: state.user.loginCount,
  }
}
function mapActionToProps(dispatch: any) {
  return {
    set_draw_type: (type: boolean) => dispatch(action.set_draw_type(type)),
  }
}

interface Props {
  loginCount: number;
  drawType: Boolean;
  set_draw_type: (x: boolean) => void;
  history: any;
}
interface IState {
  list: Array<any>;
}
interface Idata {
  thisNum: null | number;
  interval: any;
  intervalSpeed: number;
  canSelectList: Array<any>;
  intervalNum: number;
  allLength: number;
}
class PageMain extends React.Component<Props, IState>  {
  data: Idata;
  constructor(props: Props) {
    super(props);
    this.data = {
      thisNum: null,
      interval: null, //循环器
      intervalSpeed: 300,
      canSelectList: [],
      intervalNum: 0, //100 end
      allLength: 0,
    }
    this.state = {
      list: [],
    }
  }
  render() {
    return (
      <div className="PageMain">
        <h1 className="loginCount">
          累计登录次数<br />{this.props.loginCount}
        </h1>
        <Link to="/PageAddRestaurant">
          <span className="goAddItem">去加饭店</span>
        </Link>
        <img src={jumpGif} alt="error" className="jumpGif" style={{ display: this.props.drawType ? "block" : "none" }} />
        <div className="containMain">
          <ul className="list">
            {
              this.state.list.map((item, index) => {
                return (
                  <li
                    className={["item", item.isSelected ? "disabled" : null, index === this.data.thisNum ? "selected" : null, item.isToday ? "isToady" : null].join(' ')}
                    key={index}
                  >
                    <p className="label">{item.name}</p>
                  </li>
                )
              })
            }
            <li className="startBtn" onClick={this.draw}>走起</li>
          </ul>
          <ul className="cricle">
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
          </ul>
        </div >
      </div >
    )
  }
  componentDidMount(): void {
    this.getList();
  }
  getList = (): void => {
    //获取饭店列表
    axios
      .get("/restaurant/list")
      .then(response => {
        this.setState({
          list: response.data.data.map((item: any): void => {
            item.selected = false;
            return item;
          })
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  draw = (): void => {
    if (this.state.list.length < 1) {
      confirm({
        title: '提示',
        content: '未录数据?是否前往录入饭店数据？',
        onOk: (): void => {
          this.props.history.push({
            path: "/appAdditem"
          });
        },
        onCancel() { },
      });
      return;
    }
    if (this.props.drawType) {
      message.warning('狗子！冷静！你要吃几顿？');
      return;
    }
    //开始抽奖
    this.data.canSelectList = [];
    this.state.list.forEach((item, index) => {
      if (!!!item.isSelected) {
        this.data.canSelectList.push(index)
      }
    });
    this.data.allLength = this.data.canSelectList.length - 1;
    if (this.data.canSelectList.length < 1) {
      message.warning('已无可选项了哦！');
      return;
    } else if (this.data.canSelectList.length === 1) {
      //如果只剩一个，直接选中，直接提交，不用再动画
      this.data.thisNum = this.data.canSelectList[this.data.allLength];
      this.drawThisData();
      return;
    }
    this.data.interval = setInterval(this.intervalF, this.data.intervalSpeed)
  }
  intervalF = (): void => {
    this.forceUpdate();
    clearInterval(this.data.interval);
    if (this.data.intervalNum === 100) {
      this.data.canSelectList = [];
      this.data.intervalNum = 0;
      this.drawThisData();
      return;
    }
    this.data.intervalNum++;
    if (this.data.intervalNum < 10) {
      this.data.intervalSpeed -= 30;
    }
    if (this.data.intervalNum > 85) {
      this.data.intervalSpeed += 20;
    }
    this.data.thisNum = this.data.canSelectList[Math.round(Math.random() * this.data.allLength)];
    this.data.interval = setInterval(this.intervalF, this.data.intervalSpeed);
  }
  drawThisData = (): void => {
    //推送数据到远程
    axios
      .post("/restaurant/draw", {
        _id: this.state.list[this.data.thisNum as number]._id
      })
      .then(response => {
        // 成功选中此餐厅
        if (response.data.type) {
          this.props.set_draw_type(true);
          if (response.data.data.type === "havedrawed") {
            message.warning('发生了新的抽选！');
            this.data.thisNum = null;
            this.getList();
          }
        } else {
          this.data.thisNum = null;
          message.error(response.data.msg);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
export default connect(mapStateToProps, mapActionToProps)(PageMain);