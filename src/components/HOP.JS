import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ppHOC = WrappedComponent =>
  class pp extends Component {
    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  };

