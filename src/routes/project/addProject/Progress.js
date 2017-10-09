import React from 'react';
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Form, Row, Col, Input, Button, Icon, Card, DatePicker, message } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 14,
  },
};
const onTimeChange = (field, value) => {
  if (field != null) {
    return field._d.getTime();
  }
};

class Progress extends React.Component {
  constructor(props) {
    // super指代父类的实例，必须添加，实质上先创造父类的实例对象this,然后用子类的构造去修改this
    super(props);
    this.state = { form: [] };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  componentWillMount() {
    if (this.props.edit && this.props.projectMilestoneRsBeanList != null) {
      this.setState({
        form: this.props.projectMilestoneRsBeanList,
      });
    }
  }
  addRow = () => {
    const { getFieldsValue, resetFields } = this.props.form;
    const payload = getFieldsValue(['event', 'timeNode', 'type']);
    const { event, timeNode, type } = payload;
    if (event == null && timeNode == null && type == null) {
      message.error('请至少填写一项进行保存');
      return;
    }
    const form = this.state.form;
    form.push(payload);
    this.setState({ form }, () => resetFields(['event', 'timeNode', 'type']));
    this.props.upProgress(payload);
  }
  delRow = (index) => {
    let payLoad = this.state.form.splice(index, 1);
    if (this.state.form.length === 0) {
      payLoad = [];
    }
    this.setState({ form: payLoad });
  }
  render() {
    const { form, saveProjectMilestoneRqBeanList } = this.props;
    const formItems = saveProjectMilestoneRqBeanList.map((k, index) => {
      return (
        <Card
          key={index}
          title="项目历程"
          bodyStyle={{
            padding: 15,
          }}
          extra={<Button onClick={this.delRow.bind(this, index)}> <Icon type="delete" />删除项目历程</ Button>}
        >
          <Row>
            <Col span={12}>
              <FormItem>
                <FormItem label="类型" {...formItemLayout}>
                  <Input value={k.type} disabled />
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="时间" {...formItemLayout}>
                  <DatePicker disabled value={moment(k.timeNode)} />
                </FormItem>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem>
                <FormItem label="事件" {...layout}>
                  <TextArea disabled value={k.event} />
                </FormItem>
              </FormItem>
            </Col>
          </Row>
        </Card>
      );
    });
    return (
      <div>
        <Card
          title="添加项目历程"
          bodyStyle={{
            padding: 15,
          }}
          extra={<Button type="primary" onClick={this.addRow}>添加项目历程</Button>}
        >
          <Row>
            <Col span={12}>
              <FormItem>
                <FormItem label="类型" {...formItemLayout}>
                  {form.getFieldDecorator('type', {
                  })(<Input />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="时间" {...formItemLayout}>
                  {form.getFieldDecorator('timeNode', {
                  })(<DatePicker placeholder="请选择时间" onChange={onTimeChange} />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label="事件" {...layout}>
                {form.getFieldDecorator('event', {
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
        </Card >
        {formItems}

      </div>
    );
  }
}

Progress.propTypes = {
  form: PropTypes.object,
  edit: PropTypes.bool,
  projectMilestoneRsBeanList: PropTypes.array,
};

export default Form.create()(Progress);
