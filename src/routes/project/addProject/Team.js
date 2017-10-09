import React from 'react';
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Form, Row, Col, Input, Button, Icon, Card, message, Select, Avatar as Avatars, Upload } from 'antd';
import { fileApi } from '../../../utils/config';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 },
};


class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: [] };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  addRow = () => {
    const { getFieldsValue, resetFields } = this.props.form;
    const payload = getFieldsValue(['teamIcon', 'teamName', 'identity', 'email', 'teamBrief', 'job']);
    const { teamName, job } = payload;
    if (teamName == null && job == null) {
      message.error('名字不能为空,关键信息不能为空');
    }
    if (payload.teamIcon.fileList) {
      payload.teamIcon = payload.teamIcon.fileList.map((item) => {
        return item.response.data;
      }).toString();
    }
    const upData = {
      icon: payload.teamIcon,
      name: payload.teamName,
      identity: payload.identity,
      email: payload.email,
      brief: payload.teamBrief,
      job: payload.job,
    };
    resetFields(['teamIcon', 'teamName', 'identity', 'email', 'teamBrief', 'job']);
    this.props.addTeam(upData);
  }
  delRow = (index) => {
    this.props.delTeam(index);
  }
  render() {
    const {
      form: {
          getFieldDecorator,
      },
      projectTeamRsBeanList,
      edit,
  } = this.props;
    let { saveProjectTeamRqBeanList } = this.props;
    if (saveProjectTeamRqBeanList == null) saveProjectTeamRqBeanList = [];
    // let fileList = [];
    // if (edit) {
    //   fileList = [{
    //     uid: -1,
    //     name: 'xxx.png',
    //     status: 'done',
    //     thumbUrl: projectTeamRsBeanList ? projectTeamRsBeanList.icon : null,
    //     url: projectTeamRsBeanList ? projectTeamRsBeanList.icon : null,
    //   }];
    // }
    const props = {
      action: fileApi,
      listType: 'picture',
    };
    const formItems = saveProjectTeamRqBeanList.map((k, index) => {
      return (
        <Card
          key={index}
          title="团队成员"
          bodyStyle={{
            padding: 15,
          }}
          extra={<div>
            <Button type="danger" onClick={this.delRow.bind(this, index)}> <Icon type="delete" />删除改团队成员</ Button>
          </div>}
        >
          <Row >
            <Col span={12}>
              <FormItem>
                <FormItem label="头像" {...formItemLayout}>
                  <Avatars src={k.icon} size="large" />
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="姓名" {...formItemLayout}>
                  <Input defaultValue={k.name} disabled />
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="身份类型" {...formItemLayout}>
                  <Select placeholder="活动状态" defaultValue={String(k.identity)} disabled>
                    <Option value="1">创始成员</Option>
                    <Option value="2">投资人</Option>
                    <Option value="3">普通员工</Option>
                  </Select>
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="职位" {...formItemLayout}>
                  <Input defaultValue={k.job} disabled />
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="邮箱" {...formItemLayout}>
                  <Input defaultValue={k.email} disabled />
                </FormItem>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem>
                <FormItem label="个人介绍" {...layout}>
                  <TextArea defaultValue={k.brief} disabled />
                </FormItem>
              </FormItem>
            </Col>
          </Row>
        </Card>
      );
    });
    return (
      <div>
        {formItems}
        <Card
          title="添加团队成员"
          bodyStyle={{
            padding: 15,
          }}
          extra={<Button type="primary" onClick={this.addRow}><Icon type="plus" />添加团队成员</ Button>}
        >
          <Row>
            <Col span={12}>
              <FormItem>
                <FormItem label="头像" {...formItemLayout}>
                  {getFieldDecorator('teamIcon', {
                    initialValue: edit && projectTeamRsBeanList ?
                      projectTeamRsBeanList.icon : null,
                  })(
                    <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> 上传
                    </Button>
                    </Upload>)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="姓名" {...formItemLayout}>
                  {getFieldDecorator('teamName', {
                    initialValue: edit && projectTeamRsBeanList ?
                      projectTeamRsBeanList.name : null,
                  })(<Input />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="身份类型" {...formItemLayout}>
                  {getFieldDecorator('identity', {
                  })(<Select>
                    <Option value="1">创始成员</Option>
                    <Option value="2">投资人</Option>
                    <Option value="3">普通员工</Option>
                  </Select>)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="职位" {...formItemLayout}>
                  {getFieldDecorator('job', {
                    initialValue: edit && projectTeamRsBeanList ?
                      projectTeamRsBeanList.job : null,
                  })(<Input />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="邮箱" {...formItemLayout}>
                  {getFieldDecorator('email', {
                    initialValue: edit && projectTeamRsBeanList ?
                      projectTeamRsBeanList.email : null,
                  })(<Input />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem>
                <FormItem label="个人介绍" {...layout}>
                  {getFieldDecorator('teamBrief', {
                    initialValue: edit && projectTeamRsBeanList ?
                      projectTeamRsBeanList.brief : null,
                  })(<TextArea />)}
                </FormItem>
              </FormItem>
            </Col>
          </Row>
        </Card>
      </div >
    );
  }
}

Team.propTypes = {
  form: PropTypes.object,
  edit: PropTypes.bool,
  projectTeamRsBeanList: PropTypes.array,

};

export default Form.create()(Team);

