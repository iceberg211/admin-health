import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;
const data = [
  {
    id: 1,
    name: '未透露',
  },
  {
    id: 2,
    name: '未运营已有原型',
  },
  {
    id: 3,
    name: '已内测',
  },
  {
    id: 4,
    name: '已运营',
  },
  {
    id: 5,
    name: '已盈利',
  },
];

class SelectPjoject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <Select onChange={this.props.onChange}>
        {data.map(item => (
          <Option key={item.name} value={(item.id).toString()}>{item.name}</Option>
        ))}
      </Select>
    );
  }
}

SelectPjoject.propTypes = {

};

export default SelectPjoject;
