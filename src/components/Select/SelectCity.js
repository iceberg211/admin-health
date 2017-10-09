import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

class SelectCity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <Select onChange={this.props.onChange} mode="multiple" defaultValue={this.props.value.split(',')}>
        <Option value="9">全部</Option>
        <Option value="31002">北京</Option>
        <Option value="31892">上海</Option>
        <Option value="33225">广州</Option>
        <Option value="33240">深圳</Option>
        <Option value="31914">南京</Option>
        <Option value="32055">杭州</Option>
        <Option value="33614">成都</Option>
      </Select>
    );
  }
}
SelectCity.propTypes = {

};

export default SelectCity;

