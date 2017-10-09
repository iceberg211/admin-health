import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input, InputNumber } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 },
};

const DetailedInfor = (props) => {
  const {
        form: {
            getFieldDecorator,
        },
    projectOperationRsBean,
    edit,
    } = props;
  return (
    <Row>
      <Col span={24}>
        <FormItem
          {...layout}
          label="运营状况描述"
        >
          {getFieldDecorator('introduction', {
            initialValue: edit && projectOperationRsBean ?
              projectOperationRsBean.introduction : null,
          })(<TextArea />)}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem>
          <FormItem label="月收入" {...formItemLayout}>
            {getFieldDecorator('monthlyIncome', {
              initialValue: edit && projectOperationRsBean ?
                projectOperationRsBean.monthlyIncome : null,
            })(<InputNumber style={{ width: 180 }} />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem>
          <FormItem label="月活跃用户量" {...formItemLayout}>
            {getFieldDecorator('totalUsers', {
              initialValue: edit && projectOperationRsBean ?
                projectOperationRsBean.totalUsers : null,
            })(<InputNumber style={{ width: 180 }} />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem>
          <FormItem label="客单价" {...formItemLayout}>
            {getFieldDecorator('pct', {
              initialValue: edit && projectOperationRsBean ?
                projectOperationRsBean.pct : null,
            })(<InputNumber style={{ width: 180 }} />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem>
          <FormItem label="销售额" {...formItemLayout}>
            {getFieldDecorator('sale', {
              initialValue: edit && projectOperationRsBean ?
                projectOperationRsBean.sale : null,
            })(<InputNumber style={{ width: 180 }} />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem>
          <FormItem label="PV" {...formItemLayout}>
            {getFieldDecorator('pv', {
              initialValue: edit && projectOperationRsBean ?
                projectOperationRsBean.pv : null,
            })(<InputNumber style={{ width: 180 }} />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem>
          <FormItem label="uv" {...formItemLayout}>
            {getFieldDecorator('uv', {
              initialValue: edit && projectOperationRsBean ?
                projectOperationRsBean.uv : null,
            })(<InputNumber style={{ width: 180 }} />)}
          </FormItem>
        </FormItem>
      </Col>
    </Row>
  );
};

DetailedInfor.propTypes = {

};

export default DetailedInfor;

