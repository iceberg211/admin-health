import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Row, Col, Input, Select, Icon } from 'antd';


const { Option } = Select;
const Filter = ({
  form: {
  getFieldDecorator,
  getFieldsValue,
  resetFields,
}, refesh }) => {
  const search = () => {
    const fields = getFieldsValue();
    refesh(fields);
  };
  const reset = () => {
    resetFields();
    refesh();
  };
  return (
    <Form >
      <Row gutter={16}>
        <Col span={6}>{
          getFieldDecorator('code')(<Input placeholder="项目编号" size="large" />)
        }
        </Col>
        <Col span={6}> {getFieldDecorator('name')(<Input placeholder="项目名称" size="large" />)}</Col>
        <Col span={6}>
          {getFieldDecorator('status')(
            <Select placeholder="活动状态" size="large" >
              <Option value="0">待发布</Option>
              <Option value="1">已发布待报名</Option>
              <Option value="2">已发布报名中</Option>
              <Option value="3">已发布结束报名</Option>
              <Option value="4">已结束</Option>
            </Select>)
          }
        </Col>
        <Col span={6}>
          <Button type="primary" size="large" onClick={search}>搜索<Icon type="search" /></Button>
          <Button onClick={reset} size="large" >刷新<Icon type="reload" /></Button>
        </Col>
      </Row>
    </Form>
  );
};

Filter.propTypes = {
  form: PropTypes.object,
  refesh: PropTypes.func,
};

export default Form.create()(Filter);
