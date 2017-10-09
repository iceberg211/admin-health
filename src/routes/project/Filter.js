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
  const ResetForm = () => {
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
        <Col span={6}>{
          getFieldDecorator('code')(<Input placeholder="项目编号" size="large" />)
        }
        </Col>
        <Col span={6}>
          {getFieldDecorator('name')(<Input placeholder="项目名称" size="large" />)}
        </Col>
        <Col span={6}>
          {getFieldDecorator('status')(
            <Select placeholder="融资状态" size="large">
              <Option value="0">等待融资</Option>
              <Option value="1">正在融资</Option>
              <Option value="2">完成融资</Option>
            </Select>)}
        </Col>
        <Col span={6}>
          <Button type="primary" size="large" onClick={search}>搜索<Icon type="search" /></Button>
          <Button size="large" onClick={ResetForm}>刷新<Icon type="reload" /></Button>
        </Col>
      </Row>
    </Form>
  );
};

Filter.propTypes = {
  form: PropTypes.object,
};

export default Form.create()(Filter);
