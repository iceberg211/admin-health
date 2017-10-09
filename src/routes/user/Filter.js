import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Input, Icon, Select, Form } from 'antd';

const { Option } = Select;

const Filter = ({
  form: {
  getFieldDecorator,
  getFieldsValue,
  resetFields,
}, query }) => {
  const resetForm = () => {
    resetFields();
    query();
  };
  const search = () => {
    const fields = getFieldsValue();
    query(fields);
  };

  return (
    <Form >
      <Row gutter={16}>
        <Col span={4}>{
          getFieldDecorator('code')(<Input placeholder="用户编号" size="large" />)
        }
        </Col>
        <Col span={4}> {getFieldDecorator('name')(<Input placeholder="姓名" size="large" />)}</Col>
        <Col span={4}>
          {getFieldDecorator('status')(
            <Select placeholder="认证状态" size="large">
              <Option value="0">待认证</Option>
              <Option value="1">认证通过</Option>
              <Option value="2">认证不通过</Option>
            </Select>)
          }
        </Col>
        <Col span={4}> {getFieldDecorator('code')(<Input placeholder="编号" size="large" />)}</Col>
        <Col span={4}>
          <Button size="large" type="primary" onClick={search}>搜索<Icon type="search" /></Button>
          <Button size="large" onClick={resetForm}>刷新<Icon type="reload" /></Button>
        </Col>
      </Row>
    </Form>
  );
};

Filter.propTypes = {
  form: PropTypes.object,
  query: PropTypes.func,
};

export default Form.create()(Filter);
