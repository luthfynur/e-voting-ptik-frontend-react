import React from 'react'
import { Typography, Form, Input, Button, Select } from 'antd';
const {Title} = Typography

const layout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 16,
    },
  };

const tailLayout = {
    wrapperCol: {
      offset: 17,
      span: 24,
    },
};

const InputPKL = () => {
    const onFinish = values => {
        console.log('Success:', values);
      };
    
    const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Title level={2}>Surat PKL</Title>
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
                    label="No Surat"
                    name="noSurat"
                    rules={[
                    {
                        required: true,
                        message: 'Masukkan nomor surat!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
            
                <Form.Item
                    label="Nama"
                    name="nama"
                    rules={[
                    {
                        required: true,
                        message: 'Masukkan nama!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="NIM"
                    name="nim"
                    rules={[
                    {
                        required: true,
                        message: 'Masukkan NIM!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Fakultas"
                    name="fakultas"
                    rules={[
                    {
                        required: true,
                        message: 'Masukkan fakultas!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Program Studi"
                    name="prodi"
                    rules={[
                    {
                        required: true,
                        message: 'Masukkan program studi!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Semester"
                    name="semester"
                    rules={[
                    {
                        required: true,
                        message: 'Masukkan semester!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="No HP"
                    name="hp"
                    rules={[
                    {
                        required: true,
                        message: 'Masukkan no hp!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Alamat PKL"
                    name="alamat"
                    rules={[
                    {
                        required: true,
                        message: 'Masukkan alamat pkl!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Lama PKL"
                    name="durasi"
                    rules={[
                    {
                        required: true,
                        message: 'Masukkan lama pkl!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tujuan PKL"
                    name="tujuan"
                    rules={[
                    {
                        required: true,
                        message: 'Masukkan tujuan 1!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Buat Surat
                    </Button>
                </Form.Item>
            </Form>
        </div>    
    )
}

export default InputPKL