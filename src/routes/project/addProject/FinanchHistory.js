import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Form, Row, Col, Input, Button, Icon, Card, DatePicker, Select, InputNumber, message } from 'antd';
import { financingRoundData, financingData } from '../../../utils/select';

const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class FinanchHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: [],
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  addRow = () => {
    const { getFieldsValue, resetFields } = this.props.form;
    const payload = getFieldsValue(['fnTimeNode', 'fnInvestor', 'fnAmount', 'rounds']);
    const { fnTimeNode, fnInvestor, fnAmount, rounds } = payload;
    if (rounds == null && fnTimeNode == null && fnAmount == null) {
      message.error('请至少填写一项进行保存');
      return;
    }
    const upData = {
      amount: payload.fnAmount,
      investor: payload.fnInvestor,
      rounds: payload.rounds,
      timeNode: this.onTimeChange(payload.fnTimeNode),
    };
    resetFields(['fnTimeNode', 'fnInvestor', 'fnAmount', 'rounds']);
    this.props.addFinanch(upData);
  }
  onTimeChange = (field, value) => {
    if (field != null) {
      return moment(field._d.getTime()).format('YYYY-MM-DD');
    }
  };
  delRow = (index) => {
    this.props.delFinanch(index);
  }
  render() {
    const {
      form: {
          getFieldDecorator,
      },
      edit,
  } = this.props;
    let { saveProjectFinancingHistoryRqBeanList } = this.props;
    if (saveProjectFinancingHistoryRqBeanList == null) saveProjectFinancingHistoryRqBeanList = [];
    const formItems = saveProjectFinancingHistoryRqBeanList.map((k, index) => {
      return (
        <Card
          title="融资历史"
          bodyStyle={{ padding: 15 }} key={index}
          extra={<div>
            <Button type="danger" onClick={this.delRow.bind(this, index)}> <Icon type="delete" />删除融资历史</ Button>
          </div>}
        >
          <Row>
            <Col span={12}>
              <FormItem>
                <FormItem label="融资时间" {...formItemLayout}>
                  <DatePicker defaultValue={moment(k.timeNode)} disabled />
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="融资阶段" {...formItemLayout}>
                  <Select
                    mode="multiple"
                    disabled
                    defaultValue={String(k.rounds)}
                  >
                    {financingRoundData.map(item => (
                      <Option key={item.name} value={(item.id).toString()}>{item.name}</Option>
                    ))}
                  </Select>
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="融资金额" {...formItemLayout}>
                  <InputNumber min={0} defaultValue={k.amount} disabled />
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="投资机构/个人" {...formItemLayout} >
                  <Input defaultValue={k.investor} disabled />
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
          title="添加融资历史"
          bodyStyle={{ padding: 15 }}
          extra={<Button type="primary" onClick={this.addRow}><Icon type="plus" />添加融资历史</Button>}
        >
          <Row>
            <Col span={12}>
              <FormItem>
                <FormItem label="融资时间" {...formItemLayout}>
                  {getFieldDecorator('fnTimeNode', {
                  })(<DatePicker placeholder="请选择时间" onChange={this.onTimeChange} />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="融资阶段" {...formItemLayout}>
                  {getFieldDecorator('rounds', {
                  })(<Select >
                    {financingRoundData.map(item => (
                      <Option key={item.name} value={(item.id).toString()}>{item.name}</Option>
                    ))}
                  </Select>)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="融资金额" {...formItemLayout}>
                  {getFieldDecorator('fnAmount', {
                  })(<InputNumber style={{ width: '160px' }} min={0} />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="投资机构/个人" {...formItemLayout}>
                  {getFieldDecorator('fnInvestor', {
                  })(<Input />)}
                </FormItem>
              </FormItem>
            </Col>
          </Row>
        </Card >
      </div>
    );
  }
}

FinanchHistory.propTypes = {
  form: PropTypes.object,
};

export default FinanchHistory;

