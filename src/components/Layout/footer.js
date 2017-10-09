import React from 'react';
import PropTypes from 'prop-types';
import styles from './layout.less';

const Footer = ({ text }) => {
  return (
    <div className={styles.footer}>
      {text}
    </div>

  );
};

Footer.propTypes = {
  text: PropTypes.string,
};

export default Footer;
