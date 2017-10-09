import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, Icon, Card, DatePicker, message } from 'antd';
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

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = { form: [] };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  componentWillMount() {
    if (this.props.eduList) {
      this.setState({
        form: this.props.eduList,
      });
    }
  }
  deleteItem = (payload) => {
    this.props.deletesEdu({ id: payload });
  }
  save = () => {
    const item = this.props.form.getFieldsValue();
    if (item.school === undefined || item.eduTime === undefined) {
      message.error('学校和时间不能为空');
      return;
    }
    item.userId = this.props.userId;
    for (const key in item) {
      if (item[key] === undefined) {
        delete item[key];
      }
    }
    // const items = this.state.form;
    // items.push(item);
    this.props.eduCreate([item]);
    this.props.form.resetFields();
  }
  addRow = () => {
    const { getFieldsValue } = this.props.form;
    this.setState({ form: [...this.state.form, getFieldsValue()] });
  }

  render() {
    const { edit, eduList } = this.props;
    const { getFieldDecorator } = this.props.form;
    const FormItems = this.props.eduList.map((item, index) => {
      return (
        <Card
          key={item.id}
          title="教育经历"
          extra={
            <div>
              <Button
                onClick={this.deleteItem.bind(this, item.id)}
              >
                <Icon type="delete" />删除此条教育经历</ Button>
              {/* <Button type="primary"><Icon type="plus" />修改教育经历</ Button> */}
            </div>
          }
        >
          <Row >
            <Col span={12}>
              <FormItem>
                <FormItem label="学校" {...formItemLayout}>
                  <Input defaultValue={item.school} disabled />
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="院系/专业" {...formItemLayout}>
                  <Input defaultValue={item.specialty} disabled />
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="学历" {...formItemLayout}>
                  <Input defaultValue={item.education} disabled />
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="时间" {...formItemLayout}>
                  <Input defaultValue={item.eduTime} disabled />
                </FormItem>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem>
                <FormItem label="更多描述" {...layout}>
                  <TextArea defaultValue={item.introduction} disabled />
                </FormItem>
              </FormItem>
            </Col>
          </Row>
        </Card>);
    });
    return (
      <div>
        {eduList ? FormItems : null}
        <Form>
          <Card
            title="添加教育经历"
            extra={
              <Button
                type="primary" disabled={this.props.userId === undefined}
                onClick={this.save.bind(this)}
              >
                <Icon type="plus" />添加教育经历</Button>}
          >
            <Row>
              <Col span={12}>
                <FormItem>
                  <FormItem label="学校" {...formItemLayout}>
                    {getFieldDecorator('school', {
                      initialValue: edit && eduList ? eduList.school : null,
                    })(<Input />)}
                  </FormItem>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem>
                  <FormItem label="院系/专业" {...formItemLayout}>
                    {getFieldDecorator('specialty', {
                      initialValue: edit && eduList ? eduList.specialty : null,
                    })(<Input />)}
                  </FormItem>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem>
                  <FormItem label="学历" {...formItemLayout}>
                    {getFieldDecorator('education', {
                      initialValue: edit && eduList ? eduList.education : null,
                    })(<Input />)}
                  </FormItem>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem>
                  <FormItem label="时间" {...formItemLayout}>
                    {getFieldDecorator('eduTime', {
                      initialValue: edit && eduList ? eduList.eduTime : null,
                    })(<Input placeholder="例如2011-2015" />)}
                  </FormItem>
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem>
                  <FormItem label="更多描述" {...layout}>
                    {getFieldDecorator('introduction', {
                      initialValue: edit && eduList ? eduList.introduction : null,
                    })(<TextArea placeholder="描述您在学校的荣誉和成果，不超过300字" />)}
                  </FormItem>
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form >
      </div >
    );
  }
}

export default Form.create()(Education);
