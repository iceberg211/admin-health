import React, { Component } from 'react';
import { Upload, Icon, Button } from 'antd';
import { fileApi } from '../../utils/config';

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value != null) {
      const fileList = [{
        uid: -1,
        name: '头像.png',
        status: 'done',
        thumbUrl: nextProps.value,
        url: nextProps.value,
      }];
      this.setState({
        value: nextProps.value,
        fileList,
      });
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    console.log(file);
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }


  render() {
    return (
      <Upload
        action={fileApi}
        defalutfileList={[...this.state.fileList]}
        onChange={this.props.onChange}
        beforeUpload={this.beforeUpload}
        listType={'picture'}
      >
        <Button>
          <Icon type="upload" /> 上传
        </Button>
      </Upload >
    );
  }
}

export default Avatar;
