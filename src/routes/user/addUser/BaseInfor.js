import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input, Button, Icon, Select, Card, InputNumber, message, Upload, Cascader } from 'antd';
import { fileApi } from '../../../utils/config';
import { financingRoundData } from '../../../utils/select';
import CityData from '../../../utils/city';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Avatar from '../../../components/Avatar/Avatar';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 },
};

/*
*
* 由于ant desingn的多选Select为数组值，因为后台默认接受为字符串,所以在上传是需要通过join(',')转换为字符串，在解析的时候需要通过
* split方法转换为数组
*/
class BaseInfor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  componentWillMount() {

  }
  save = () => {
    const {
      form: {
      validateFields,
      getFieldsValue,
      },
      edit, user, userExt, saveUser, renderOk,
      } = this.props;
    validateFields((errors) => {
      if (errors) {
        message.error('请补全所有必填字段');
        return;
      }
      // 用户基本信息
      const userPayLoad = getFieldsValue(['name', 'wechat', 'postions', 'email', 'icon', 'phone', 'qq', 'sex']);
      if ((typeof userPayLoad.icon) === 'object') {
        userPayLoad.icon = userPayLoad.icon.fileList.map((item) => {
          return item.response.data;
        }).toString();
      }
      const { postions } = userPayLoad;
      userPayLoad.city = Number(postions[1]);
      userPayLoad.province = Number(postions[0]);
      delete userPayLoad.postions;
      // 用户扩展信息
      const userExtPay = getFieldsValue(['brief', 'company', 'introduction', 'investAmountEnd', 'investAmountStart',
        'investCity', 'investRounds', 'investSum', 'job']);
      // 处理掉空字段
      if (userExtPay.investCity) userExtPay.investCity = userExtPay.investCity.join(',');
      if (userExtPay.investRounds) userExtPay.investRounds = userExtPay.investRounds.join(',');
      for (const key in userPayLoad) {
        if (userPayLoad[key] === null) {
          delete userPayLoad[key];
        }
      }
      for (const key in userExtPay) {
        if (userExtPay[key] === null) {
          delete userExtPay[key];
        }
      }
      if (edit) {
        userPayLoad.id = user.id;
        userExtPay.id = user.id;
      }
      saveUser({
        user: userPayLoad,
        userExt: userExtPay,
      });
    });
  };

  render() {
    const {
      form: {
      getFieldDecorator,
      validateFields,
      getFieldsValue,
      },
      edit, user, userExt, saveUser,
      } = this.props;
    // 解决初始化值的问题
    let investRounds;
    let investCity;
    let fileList = [];
    let renderOk = false;
    if (userExt.investRounds) investRounds = userExt.investRounds.split(',');
    if (userExt.investCity) investCity = userExt.investCity.split(',');
    if (edit && renderOk) {
      fileList = [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: user.icon,
      }];
      renderOk = true;
    }
    const upLoadprops = {
      action: fileApi,
      listType: 'picture',
      fileList,
    };
    return (
      <Card title="用户基本信息" bodyStyle={{ padding: 15 }}>
        <Form>
          <Row>
            <Col span={12}>
              {renderOk && <FormItem>
                <FormItem label="头像上传" {...formItemLayout}>
                  {getFieldDecorator('icon', {
                    initialValue: edit && user ? user.icon : user.icon,
                    rules: [{ required: true, message: '必填项，请输入' }],
                  })(<Upload {...upLoadprops}>
                    <Button>
                      <Icon type="upload" /> 上传
                    </Button>
                  </Upload>)}
                </FormItem>
              </FormItem>
              }
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="姓名" {...formItemLayout}>
                  {getFieldDecorator('name', {
                    initialValue: edit && user ? user.name : null,
                    rules: [{ required: true, message: '必填项，请输入' }],
                  })(<Input />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="性别" {...formItemLayout}>
                  {getFieldDecorator('sex', {
                    initialValue: edit && user ? String(user.sex) : null,
                  })(<Select>
                    <Option value="0">男</Option>
                    <Option value="1">女</Option>
                    <Option value="2">保密</Option>
                  </Select>)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="地区" {...formItemLayout}>
                  {getFieldDecorator('postions', {
                    initialValue: edit && user.province ?
                      [Number(user.province), Number(user.city)] : null,
                    rules: [{ required: true, message: '必填项，请输入' }],
                  })(<Cascader options={CityData.data} placeholder="选择省市" />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="手机号" {...formItemLayout}>
                  {getFieldDecorator('phone', {
                    initialValue: edit && user ? user.phone : null,
                    rules: [{ required: true, message: '必填项，请输入' }],
                  })(<Input />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="邮箱" {...formItemLayout}>
                  {getFieldDecorator('email', {
                    initialValue: edit && user ? user.email : null,
                  })(<Input />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="QQ" {...formItemLayout}>
                  {getFieldDecorator('qq', {
                    initialValue: edit && user ? user.qq : null,
                  })(<Input />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="微信" {...formItemLayout}>
                  {getFieldDecorator('wechat', {
                    initialValue: edit && user ? user.wechat : null,
                  })(<Input />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem>
                <FormItem label="一句话简介" {...layout}>
                  {getFieldDecorator('brief', {
                    rules: [{ required: true, message: '必填项，请输入' }],
                    initialValue: edit && userExt ? userExt.brief : null,
                  })(<Input />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem>
                <FormItem label="个人简介" {...layout}>
                  {getFieldDecorator('introduction', {
                    initialValue: edit && userExt ? userExt.introduction : null,
                  })(<TextArea />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="所在公司" {...formItemLayout}>
                  {getFieldDecorator('company', {
                    initialValue: edit && userExt ? userExt.company : null,
                  })(<Input />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="担任职务" {...formItemLayout}>
                  {getFieldDecorator('job', {
                    initialValue: edit && userExt ? userExt.job : null,
                  })(<Input />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="融资总数" {...formItemLayout}>
                  {getFieldDecorator('investSum', {
                    initialValue: edit && userExt ? userExt.investSum : null,
                  })(<InputNumber style={{ width: '180px' }} />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="起始投资金额" {...formItemLayout}>
                  {getFieldDecorator('investAmountStart', {
                    initialValue: edit && userExt ? userExt.investAmountStart : null,
                  })(<InputNumber style={{ width: '180px' }} />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="最大投资金额" {...formItemLayout}>
                  {getFieldDecorator('investAmountEnd', {
                    initialValue: edit && userExt ? userExt.investAmountEnd : null,
                  })(<InputNumber style={{ width: '180px' }} />)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="投资轮数" {...formItemLayout}>
                  {getFieldDecorator('investRounds', {
                    initialValue: edit && userExt ?
                      investRounds : undefined,
                  })(<Select
                    mode="multiple"
                  >
                    {financingRoundData.map(item => (
                      <Option key={item.name} value={(item.id).toString()}>{item.name}</Option>
                    ))}
                  </Select>)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <FormItem label="投资城市" {...formItemLayout}>
                  {getFieldDecorator('investCity', {
                    initialValue: edit && userExt ?
                      investCity : undefined,
                  })(<Select mode="multiple" >
                    <Option value="9">全部</Option>
                    <Option value="31002">北京</Option>
                    <Option value="31892">上海</Option>
                    <Option value="33225">广州</Option>
                    <Option value="33240">深圳</Option>
                    <Option value="31914">南京</Option>
                    <Option value="32055">杭州</Option>
                    <Option value="33614">成都</Option>
                  </Select>)}
                </FormItem>
              </FormItem>
            </Col>
            <Col span={24}>
              <Button onClick={this.save} style={{ width: '100%' }} type="primary">{edit ? '修改用户' : '保存用户'}</Button>
            </Col>
          </Row>
        </Form >
      </Card >
    );
  }
}

BaseInfor.propTypes = {
  form: PropTypes.object,
  userExt: PropTypes.object,
  user: PropTypes.object,
};

export default Form.create()(BaseInfor);

