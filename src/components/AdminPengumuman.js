import React from 'react'
import { Input, Typography, Form, Button } from 'antd';

const { TextArea } = Input;
const {Title} = Typography

const layout = {
    labelCol: {
      span: 2,
    },
    wrapperCol: {
      span: 16,
    },
  };

const tailLayout = {
    wrapperCol: {
      offset: 14,
      span: 24,
    },
};

const AdminPengumuman = () => {
    const onFinish = values => {
        console.log('Success:', values);
      };
    
    const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    };

    return(
        <div>
            <Title level={2}>Buat Pengumuman</Title>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
            
                <Form.Item
                    label="Judul"
                    name="judul"
                    rules={[
                    {
                        required: true,
                        message: 'Masukkan judul!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Isi"
                    name="isi"
                    rules={[
                    {
                        required: true,
                        message: 'Masukkan isi!',
                    },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Buat Pengumuman
                    </Button>
                </Form.Item>
            </Form>
        </div>
       
    )
}

export default AdminPengumuman