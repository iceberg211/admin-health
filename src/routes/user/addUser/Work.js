import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, Icon, Card, message } from 'antd';
import PureRenderMixin from 'react-addons-pure-render-mixin';


const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 },
};
const FormItem = Form.Item;
const { TextArea } = Input;

class Work extends Component {
  constructor(props) {
    super(props);
    this.state = { form: [] };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  componentWillMount() {
    if (this.props.edit) {
      this.setState({
        form: this.props.jobList,
      });
    }
  }
  save = () => {
    const playload = this.props.form.getFieldsValue();
    if (playload.company === undefined || playload.job === undefined) {
      message.error('公司和职位不能为空');
      return;
    }
    for (const key in playload) {
      if (playload[key] === undefined) {
        delete playload[key];
      }
    }
    playload.userId = this.props.userId;
    // const playloads = this.state.form;
    // playloads.push(playload);
    this.props.jobCreate([playload]);
  }
  addRow = () => {
    const { getFieldsValue } = this.props.form;
    this.setState({ form: [...this.state.form, getFieldsValue()] });
  }
  deleteItem = (payload) => {
    this.props.deletesJob({ id: payload });
  }
  render() {
    const { edit, eduList } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItems = this.props.jobList.map((item, index) => {
      return (
        <Card
          key={index}
          title="添加工作经历"
          bodyStyle={{ padding: 15 }}
          extra={<div>
            <Button onClick={this.deleteItem.bind(this, item.id)}><Icon type="delete" />删除工作经历</ Button>
          </div>}
        >
          <Row>
            <Col span={12}>
              <FormItem>
                <FormItem label="公司" {...formItemLayout}>
                  <Input defaultValue={item.company} disabled />
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="时间" {...formItemLayout}>
                  <Input defaultValue={item.workTime} disabled />
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="职位" {...formItemLayout}>
                  <Input defaultValue={item.job} disabled />
                </FormItem>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem>
                <FormItem label="职位描述" {...layout}>
                  <TextArea defaultValue={item.introduction} disabled />
                </FormItem>
              </FormItem>
            </Col>
          </Row>
        </Card>);
    });
    return (
      <div>
        {formItems}
        <Card
          title="添加工作经历"
          bodyStyle={{ padding: 15 }}
          extra={
            <Button
              disabled={this.props.userId === undefined}
              type="primary"
              onClick={this.save}
            >
              <Icon type="plus" />添加工作经历</Button>}
        >
          <Form>
            <Row>
              <Col span={12}>
                <FormItem>
                  <FormItem label="公司" {...formItemLayout}>
                    {getFieldDecorator('company', {
                      initialValue: edit && eduList ? eduList.icon : null,
                    })(<Input />)}
                  </FormItem>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem>
                  <FormItem label="时间" {...formItemLayout}>
                    {getFieldDecorator('workTime', {
                      initialValue: edit && eduList ? eduList.workTime : null,
                    })(<Input placeholder="例如2015-2017" />)}
                  </FormItem>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem>
                  <FormItem label="职位" {...formItemLayout}>
                    {getFieldDecorator('job', {
                      initialValue: edit && eduList ? eduList.job : null,
                    })(<Input />)}
                  </FormItem>
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem>
                  <FormItem label="职位描述" {...layout}>
                    {getFieldDecorator('introduction', {
                      initialValue: edit && eduList ? eduList.brief : null,
                    })(<TextArea />)}
                  </FormItem>
                </FormItem>
              </Col>
            </Row>
          </Form >
        </Card>
      </div >
    );
  }
}

export default Form.create()(Work);
