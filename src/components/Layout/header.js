import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import styles from './layout.less';


const SubMenu = Menu.SubMenu;

const Header = ({ logout, name }) => {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <h2>{name}</h2>
      </div>
      <div className={styles.right} >
        迎您光临管理中心:<span className={styles.admin}> 管理员</span>
        <div className={styles.rightWarpper}>
          <div className={styles.button}>
            <Icon type="mail" />
          </div>
          <Menu mode="horizontal" className={styles.menu} onClick={logout}>
            <SubMenu
              title={<span>
                <Icon type="user" />
              </span>}
            >
              <Menu.Item key="logout">
                退出登陆
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
    </div >

  );
};

Header.propTypes = {
  logout: PropTypes.func,
  name: PropTypes.string,
};

export default Header;
