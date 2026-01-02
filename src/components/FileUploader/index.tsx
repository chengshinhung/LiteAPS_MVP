import React from 'react';
import { Upload, Button, App } from 'antd';
import { UploadOutlined, FileTextOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

interface FileUploaderProps {
  onUploadSuccess: () => void;
  disabled?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadSuccess, disabled }) => {
  const { message } = App.useApp();

  const props: UploadProps = {
    name: 'file',
    accept: '.csv',
    showUploadList: false,
    beforeUpload: (file) => {
      const isCSV = file.type === 'text/csv' || file.name.endsWith('.csv');
      if (!isCSV) {
        message.error('請上傳 CSV 檔案！');
        return Upload.LIST_IGNORE;
      }
      
      // Simulate upload success
      setTimeout(() => {
        message.success('解析成功：讀取 150 筆工單');
        onUploadSuccess();
      }, 500);
      
      return false; // Prevent actual upload
    },
    disabled: disabled,
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', border: '1px dashed #d9d9d9', borderRadius: '8px', background: '#fafafa' }}>
      <p className="ant-upload-drag-icon">
        <FileTextOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
      </p>
      <p className="ant-upload-text" style={{ margin: '10px 0' }}>點擊或拖若檔案至此區域上傳</p>
      <p className="ant-upload-hint" style={{ color: '#8c8c8c', marginBottom: '16px' }}>
        支援單次上傳。嚴禁上傳公司內部敏感數據或其他違禁文件
      </p>
      <Upload {...props}>
        <Button icon={<UploadOutlined />} type="primary" disabled={disabled}>
          選擇 CSV 檔案
        </Button>
      </Upload>
    </div>
  );
};

export default FileUploader;
