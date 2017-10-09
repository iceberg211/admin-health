import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Button, Input, Icon } from 'antd';
import styles from './login.less';

const FormItem = Form.Item;


function Login({ form: {
  getFieldDecorator,
}, dispatch }) {
  const login = () => {
    dispatch({ type: 'app/login' });
  };

  return (
    <div className={styles.container}>
      <Form layout="vertical" className={styles.login}>
        <h1>欢迎来到健康创投</h1>
        <FormItem hasFeedback>
          {getFieldDecorator('userName', {
            rules: [{
              required: true,
              message: '请输入用户名!',
            }],
          })(
            <Input
              prefix={<Icon type="user" style={{ fontSize: 13 }} />}
              size="large" placeholder="用户名"
            />,
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: '请输入密码!',
            }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              size="large"
              type="password"
              placeholder="密码"
            />,
          )}
        </FormItem>
        <Button
          type="primary"
          htmlType="submit"
          onClick={login}
          className={styles.button}
        >
          登陆
        </Button>
      </Form>
    </div>

  );
}
Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,

};


export default connect(({ app, loading }) => ({ app, loading }))(Form.create()(Login));
