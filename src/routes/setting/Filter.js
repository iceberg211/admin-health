import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Input, Icon, Select, Form } from 'antd';

const { Option } = Select;

const Filter = ({
  form: {
  getFieldDecorator,
  getFieldsValue,
}, query }) => {
  // const ResetForm = () => {
  //   const fields = getFieldsValue();
  //   const test = setFieldsValue();
  // };
  const search = () => {
    const fields = getFieldsValue();
    query(fields);
  };

  return (
    <Form >
      <Row gutter={16}>
        <Col span={6}>{
          getFieldDecorator('code')(<Input placeholder="项目编号" />)
        }
        </Col>
        <Col span={6}> {getFieldDecorator('name')(<Input placeholder="项目名称" />)}</Col>
        <Col span={6}>
          {getFieldDecorator('status')(
            <Select placeholder="认证状态">
              <Option value="0">未提交认证</Option>
              <Option value="1">待认证</Option>
              <Option value="2">已认证</Option>
            </Select>)
          }
        </Col>
        <Col span={6}>
          <Button type="primary" onClick={search}>搜索<Icon type="search" /></Button>
        </Col>
      </Row>
    </Form>
  );
};

Filter.propTypes = {
  form: PropTypes.object,
};

export default Form.create()(Filter);
