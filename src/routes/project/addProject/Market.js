import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;


const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 },
};

const Market = (props) => {
  const {
    form: {
        getFieldDecorator,
    },
    projectMarketAnalysisRsBean,
    edit,
    } = props;
  return (
    <Row>
      <Col span={24}>
        <FormItem>
          <FormItem label="目标用户群" {...layout}>
            {getFieldDecorator('targetUsers', {
              initialValue: edit && projectMarketAnalysisRsBean ?
                projectMarketAnalysisRsBean.targetUsers : null,
            })(<TextArea />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={24}>
        <FormItem>
          <FormItem label="盈利模式" {...layout}>
            {getFieldDecorator('profitModel', {
              initialValue: edit && projectMarketAnalysisRsBean ?
                projectMarketAnalysisRsBean.profitModel : null,
            })(<TextArea />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={24}>
        <FormItem>
          <FormItem label="竞争对手" {...layout}>
            {getFieldDecorator('rival', {
              initialValue: edit && projectMarketAnalysisRsBean ?
                projectMarketAnalysisRsBean.rival : null,
            })(<TextArea />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={24}>
        <FormItem>
          <FormItem label="优势资源" {...layout}>
            {getFieldDecorator('advantage', {
              initialValue: edit && projectMarketAnalysisRsBean ?
                projectMarketAnalysisRsBean.advantage : null,
            })(<TextArea />)}
          </FormItem>
        </FormItem>
      </Col>
    </Row>
  );
};

Market.propTypes = {
  form: PropTypes.object,
  edit: PropTypes.bool,
};

export default Market;

