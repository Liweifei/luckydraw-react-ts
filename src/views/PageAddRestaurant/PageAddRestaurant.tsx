import * as React from 'react'
import './PageAddRestaurant.scss'
import axios from "@/tools/axiosTool"
import { Table, Divider, Rate, Modal, Form, Input, Select, Button, message } from 'antd';
import { PlusOutlined, SmileOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { Link } from "react-router-dom"
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;

interface Props {
  set_draw_type: (x: boolean) => void;
  set_login_count: (x: number) => void;
  set_login_Type: (x: boolean) => void;
  history: any;
}
interface State {
  tableData: Array<any>;
  isSelectArr: Array<any>;
  dialogVisible: boolean;
  isEdit: boolean;
  dialogTitle: string;
  editId: null | string;
}

class PageAddRestaurant extends React.Component<Props, State>  {
  formRef = React.createRef<FormInstance>();
  constructor(props: Props) {
    super(props);
    this.state = {
      tableData: [
        // {
        //   id: "1",
        //   name: "客户金融资产总额",
        //   isSelected:false,
        //   location: "已上线",
        //   score: 3,
        //   desc: "4,013,056"
        // }
      ],
      dialogVisible: false,
      dialogTitle: "新增饭店",
      isEdit: false,
      editId: null,
      isSelectArr: [
        {
          label: "是",
          value: 1
        },
        {
          label: "否",
          value: 0
        }
      ],
    }
  }
  render() {
    const columns = [
      {
        title: '饭店名称',
        dataIndex: 'name',
        key: 'name',
        render: (text: string) => <span>{text}</span>,
      },
      {
        title: '饭店位置',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: '是否已吃',
        dataIndex: 'isSelected',
        key: 'isSelected',
        render: (record: any) => (
          record.isSelected ? "是" : "否"
        ),
      },
      {
        title: '评分等级',
        key: 'score',
        dataIndex: 'score',
        render: (score: number) => (
          <div>{score}
          <Rate disabled value={score} /></div>
        ),
      },
      {
        title: '吃主备注',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: 'Action',
        key: 'action',
        render: (record: any) => (
          <span>
            <span className="btnControl" onClick={e => this.edit(record)}>编辑</span>
            <Divider type="vertical" />
            <span className="btnControl" onClick={e => this.del(record)}>删除</span>
          </span>
        ),
      },
    ];
    return (
      <div className="PageAddRestaurant">
        <div className="right">
          <div className="btnGroup">
            <Button icon={<PlusOutlined />} onClick={this.handleAdd} type="primary">添加</Button>
            <Link to="/PageMain">
              <Button icon={<SmileOutlined />} type="primary">
                去选饭
              </Button>
            </Link>
          </div>
          <Table rowKey="_id" bordered columns={columns} dataSource={this.state.tableData} />
        </div>
        <Modal
          width="640px"
          okText="确定"
          cancelText="取消"
          forceRender//避免拿不到form对象
          title={this.state.dialogTitle}
          visible={this.state.dialogVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} ref={this.formRef}>
            <Form.Item label="饭店名称" name="name">
              <Input size="large" placeholder="请输入饭店名称" />
            </Form.Item>
            <Form.Item label="饭店位置" name="location">
              <Input size="large" placeholder="请输入饭店位置" />
            </Form.Item>
            <Form.Item label="是否已吃" name="isSelected">
              <Select
                placeholder="请选择本饭店是否已吃"
              >
                {
                  this.state.isSelectArr.map((item, index) => {
                    return <Option key={index} value={item.value}>{item.label}</Option>
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item label="饭店评分" name="score">
              <Rate />
            </Form.Item>
            <Form.Item label="备注" name="desc">
              <TextArea
                placeholder="请输入备注"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
  componentDidMount(): void {
    this.getList();
  }
  getList() {
    //获取饭店列表
    axios
      .get("/restaurant/list")
      .then(response => {
        this.setState({
          tableData: response.data.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleAdd = (): void => {//添加
    this.setState({
      isEdit: false,
      editId: null,
      dialogVisible: true
    })
    const formRef = this.formRef.current as FormInstance;
    formRef?.resetFields();//maybe null
  }
  edit(info: any) {//编辑
    console.log(info);
    this.setState({
      isEdit: true,
      editId: info._id,
      dialogVisible: true
    })
    const formRef = this.formRef.current as FormInstance;
    formRef?.setFieldsValue({
      name: info.name,
      location: info.location,
      isSelected: info.isSelected,
      score: info.score,
      desc: info.desc,
    });
  }
  del = (info: { _id: string }): void => {//删除
    console.log(info);
    confirm({
      title: '确认添删除饭店么?',
      okText: "确认",
      cancelText: "取消",
      content: '删掉后不可恢复，请三思！',
      onOk: () => {
        let param = {
          _id: info._id
        };
        axios
          .post("/restaurant/delete", param)
          .then(response => {
            if (response.data.type) {
              this.getList();
              message.success('删除成功！');
            } else {
              message.error(response.data.msg);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      onCancel() { },
    });
  }
  handleOk = (): void => {//添加确定
    const formRef = this.formRef.current as FormInstance;
    const name = formRef.getFieldValue("name");
    if (!name) {
      message.warning('请输入饭店名称！');
      return;
    }
    const location = formRef.getFieldValue("location");
    if (!location) {
      message.warning('请输入饭店位置！');
      return;
    }
    type tParam = {
      name: string;
      location: string;
      isSelected: boolean;
      score: number;
      desc: string;
      _id?: string;
    }
    let param: tParam = {
      name: name,
      location: location,
      isSelected: formRef.getFieldValue("isSelected"),
      score: formRef.getFieldValue("score"),
      desc: formRef.getFieldValue("desc")
    };
    if (this.state.isEdit) param._id = this.state.editId as string;
    let url = this.state.isEdit ? "/restaurant/update" : "/restaurant/save"; //新增编辑不同接口
    axios
      .post(url, param)
      .then(response => {
        if (response.data.type) {
          if (this.state.isEdit) {
            this.setState({
              isEdit: false,
              editId: null,
            })
          }
          this.handleCancel();
          this.getList();
          message.success(response.data.msg);
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // const name=this.props.form.getFieldValue("name");
    // const psd=this.props.form.getFieldValue("psd");
  }
  handleCancel = (): void => {
    this.setState({
      dialogVisible: false,
    });
  }
}
export default PageAddRestaurant;