import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;
const data = [{
  id: 1,
  name: '种子轮',
},
{
  id: 2,
  name: '天使轮',
},
{
  id: 3,
  name: 'Pre-A轮',
},
{
  id: 4,
  name: 'A轮',
},
{
  id: 5,
  name: 'A+轮',
},
{
  id: 6,
  name: 'B轮',
},
{
  id: 7,
  name: 'B+轮',
},
{
  id: 8,
  name: 'C轮',
},
{
  id: 9,
  name: 'D轮',
},
{
  id: 10,
  name: 'E轮',
},
{
  id: 11,
  name: 'F轮-上市前',
},
{
  id: 12,
  name: 'IPO上市',
},
{
  id: 13,
  name: 'IPO上市后',
},
{
  id: 14,
  name: '新三板',
},
{
  id: 15,
  name: '战略投资',
},
{
  id: 16,
  name: '不明确',
},
{
  id: 17,
  name: '其他',
}];


class SelectRound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // select: [''],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value != null) {
      let select = nextProps.value;
      select = select.toString().split(',');
      this.setState({
        select,
      });
    }
  }

  render() {
    return (
      <Select
        defaultValue={this.state.select}
        mode="multiple" onChange={this.props.onChange}
      >
        {data.map(item => (
          <Option key={item.name} value={(item.id).toString()}>{item.name}</Option>
        ))}
      </Select>
    );
  }
}
SelectRound.propTypes = {

};

export default SelectRound;
