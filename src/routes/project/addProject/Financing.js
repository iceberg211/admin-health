import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;


const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 },
};
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const Financing = (props) => {
  const {
        form: {
            getFieldDecorator,
        },
    projectFinancingDemandRsBean,
    edit,
    } = props;
  return (
    <Row>
      <Col span={12}>
        <FormItem>
          <FormItem label="期望融资" {...formItemLayout}>
            {getFieldDecorator('amount', {
              initialValue: edit && projectFinancingDemandRsBean ?
                projectFinancingDemandRsBean.amount : null,
            })(<Input />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={24}>
        <FormItem>
          <FormItem label="资金使用计划" {...layout}>
            {
              getFieldDecorator('plan', {
                initialValue: edit && projectFinancingDemandRsBean ?
                  projectFinancingDemandRsBean.plan : null,
              })(<TextArea />)}
          </FormItem>
        </FormItem>
      </Col>
    </Row>
  );
};

Financing.propTypes = {

};

export default Financing;

