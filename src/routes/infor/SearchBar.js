import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Row, Col, DatePicker, Input, Select, Icon } from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;

const SearchBar = ({
  form: {
  getFieldDecorator,
  getFieldsValue,
  setFieldsValue, resetFields,
}, query }) => {
  const formatsTime = (fields) => {
    const { time } = fields;
    if (time && time.length) {
      fields.startTime = time[0].format('YYYY-MM-DD HH:MM:SS');
      fields.endTime = time[1].format('YYYY-MM-DD HH:MM:SS');
    }
    delete fields.time;
    return fields;
  };

  const search = () => {
    const fields = getFieldsValue();
    formatsTime(fields);
    query(fields);
  };
  const refesh = () => {
    resetFields();
    query();
  };
  return (
    <Form >
      <Row gutter={16}>
        <Col span={6}>{
          getFieldDecorator('title')(<Input placeholder="标题搜索" size="large" />)
        }
        </Col>
        <Col span={6}> {getFieldDecorator('time')(<RangePicker size="large" />)}</Col>
        <Col span={6}>
          {getFieldDecorator('status')(
            <Select placeholder="发布状态" size="large" >
              <Option value="0">全部</Option>
              <Option value="1">未发布</Option>
              <Option value="2">已发布</Option>
            </Select>)
          }
        </Col>
        <Col span={6}>
          <Button type="primary" size="large" onClick={search}>搜索<Icon type="search" /></Button>
          <Button onClick={refesh} size="large">刷新<Icon type="reload" /></Button>
        </Col>
      </Row>
    </Form>
  );
};

SearchBar.propTypes = {
  form: PropTypes.object,
};

export default Form.create()(SearchBar);
