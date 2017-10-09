import React from 'react';
import { Link } from 'dva/router';
import { Menu, Icon } from 'antd';
import styles from './layout.less';
import menu from '../../utils/menu';

const topMenus = menu.map(item => item.key);

const getMenus = function (menuArray, siderFold, parentPath) {
  parentPath = parentPath || '/';
  return menuArray.map((item) => {
    if (item.child) {
      return (
        <Menu.SubMenu key={item.key} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
          {getMenus(item.child, siderFold, `${parentPath + item.key}/`)}
        </Menu.SubMenu>
      );
    } else {
      return (
        < Menu.Item key={item.key} >
          <Link to={parentPath + item.key}>
            {item.icon ? <Icon type={item.icon} /> : ''}
            {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
          </Link>
        </Menu.Item >
      );
    }
  });
};

function Sider({ siderFold, darkTheme, location }) {
  const menuItems = getMenus(menu, siderFold);

  // const onOpenChange = (openKeys) => {
  //   const latestOpenKey = openKeys.find(key => !(navOpenKeys.indexOf(key) > -1));
  //   const latestCloseKey = navOpenKeys.find(key => !(openKeys.indexOf(key) > -1));
  //   let nextOpenKeys = [];
  //   if (latestOpenKey) {
  //     nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
  //   }
  //   if (latestCloseKey) {
  //     nextOpenKeys = getAncestorKeys(latestCloseKey);
  //   }
  //   changeOpenKeys(nextOpenKeys);
  // };
  // const getAncestorKeys = (key) => {
  //   const map = {
  //     navigation2: ['navigation'],
  //   };
  //   return map[key] || [];
  // };
  // // 菜单栏收起时，不能操作openKeys
  // const menuProps = !siderFold ? {
  //   onOpenChange,
  //   openKeys: navOpenKeys,
  // } : {};

  return (
    <div className={styles.sider}>
      <Menu
        mode={siderFold ? 'vertical' : 'inline'}
        theme={darkTheme ? 'dark' : 'light'}
        defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split('/').length - 1] || 'infor']}
        defaultOpenKeys={['home']}
      >
        {menuItems}
      </Menu>
    </div>

  );
}

Sider.propTypes = {
};

export default Sider;
