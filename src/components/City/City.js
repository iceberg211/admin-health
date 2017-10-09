import React, { Component } from 'react';
import { Cascader } from 'antd';
import cityData from '../../utils/city';

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
    if (this.props.value != null) {
      const position = this.props.value;
      this.setState({
        province: Number(position[0]),
        city: Number(position[1]),
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value != null) {
      const position = nextProps;
      this.setState({
        province: Number(position[0]),
        city: Number(position[1]),
      });
    }
  }
  render() {
    return (
      <Cascader
        defaultValue={[this.state.province, this.state.city]}
        options={cityData.data}
        onChange={this.props.onChange}
        placeholder={this.state.position}
      />
    );
  }
}

City.propTypes = {

};

export default City;
