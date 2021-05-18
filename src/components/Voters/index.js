import React from 'react'
import { message, Popconfirm, Space, Modal, Table, Typography, Form, Input, Button, Select } from 'antd';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../api/auth';
import { deleteUser } from '../../api/users'
import { useHistory } from 'react-router-dom'
import { Row, Col, Alert, Card } from 'antd';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {useDispatch, useSelector} from 'react-redux';
import { getUser } from '../../features/Users/actions'
import { delUser } from '../../features/Users/actions'
import debounce from 'debounce-promise'

const {Title} = Typography
const style = { background: '#FAFAD2', padding: '10px 10px 10px 10px' };

const layout = {
    labelCol: {
      span: 0,
    },
    wrapperCol: {
      span: 24,
    },
  };

const tailLayout = {
    wrapperCol: {
      offset: 0,
      span: 0,
    },
};

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
}


export default function Voters() {
  let { register, handleSubmit, errors, setError } = useForm();
  let [ status, setStatus ] = React.useState(statuslist.idle);
  let [ refresh, setRefresh ] = React.useState(0)
  let [ loading, setLoading ] = React.useState(0)
  let [ deletedUser, setDeletedUser ] = React.useState('')
  let history = useHistory();
  let dispatch = useDispatch()
  const [form] = Form.useForm();
  let users = useSelector(state => state.users);
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const dataSource = users.data
  let temporaryData = []

  React.useEffect(() => {
    dispatch(getUser())
  }, [dispatch, refresh, deletedUser])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    form.resetFields()
    setIsModalVisible(false);
  };

  const confirmDelete = () => {
    console.log(deletedUser)
    deleteUser(deletedUser)
    dispatch(getUser())
    setRefresh(refresh + 1)
    message.success('Sukses hapus data')
  }
  const cancelDelete = () => {
    
    setRefresh(refresh + 1)
    message.error('Batal hapus data')
  }
  
  
  const onSubmit = async formData => {
    let { password, password_confirmation } = formData;
// (2) cek password vs password_confirmation
    if(password !== password_confirmation) {
      return setError('password_confirmation', {type: 'equality', message: 'Konfirmasi password harus dama dengan password'});
    }

    setStatus(statuslist.process);
    setLoading(1)
    let { data } = await registerUser(formData);
    if(data.error) {
      // (2) dapatkan field terkait jika ada errors
      let fields = Object.keys(data.fields);
      // (3) untuk masing-masing field kita terapkan error dan tangkap pesan errornya
      fields.forEach(field => {
        setError(field, {type: 'server', message:
        data.fields[field]?.properties?.message})
      });
      setStatus(statuslist.error);
      message.error(errors.nim?.message)
      setLoading(0)
      return 
    }
    setLoading(0)
    setRefresh(refresh + 1)
    setStatus(statuslist.success);
    setIsModalVisible(false);
    message.success('Sukses tambah voter')
    form.resetFields()
    history.push('/admin/voters')
  }

  const columns = [
    {
      title: 'Nama',
      dataIndex: 'full_name',
      key: 'full_name',
      
    },
    {
      title: 'NIM',
      dataIndex: 'nim',
      key: 'nim',
    },
    {
      title: 'Angkatan',
      dataIndex: 'angkatan',
      key: 'angkatan',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.angkatan - b.angkatan  
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm 
            title="Apakah yakin ingin menghapus data?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            >
            <Button danger onClick={() => setDeletedUser(record._id)}>Hapus</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
    return (
      <Row>
        <Col span={24} >
        <Modal
        title="Tambah Voter"
        visible={isModalVisible}
        onOk={onSubmit}
        onCancel={handleCancel}
        footer={null}
      >
         
            <Form
                form={form}
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onSubmit}
            >
                <Form.Item
                    
                    name="full_name"
                    rules={[
                    {
                        required: true,
                        message: 'Masukkan nama lengkap anda!'
                    },
                    ]}
                >
                    <Input name="full_name" placeholder="Nama Lengkap" />
                </Form.Item>

                <Form.Item
                    
                    name="nim"
                    rules={[
                    {
                        required: true,
                        message: 'Masukkan NIM anda!'
                    },
                    {
                      min: 10,
                      message: 'NIM anda kependekan'
                    },
                    {
                      max: 10,
                      message: 'NIM anda kepanjangan'
                    }
                    ]}
                >
                    <Input name="nim" placeholder="NIM" />
                </Form.Item>
            
                <Form.Item
                    
                    name="angkatan"
                    rules={[
                    {
                        required: true,
                        message: 'Masukkan angkatan'
                    },
                    {
                      min: 4,
                      max: 4,
                      message: 'Masukkan angkatan yang bener'
                    },
                    {
                      pattern: /^(?:\d*)$/,
                      message: 'Angkatan itu pake angka'
                    }
                    ]}
                >
                    <Input name="angkatan" placeholder="Angkatan" />
                </Form.Item>
                    
                <Form.Item
                    name="email"
                    rules={[
                      {
                        type: 'email',
                        message: 'Email tidak valid'
                      },
                    {
                        required: true,
                        message: 'Masukkan email anda!',
                    },
                    ]}
                >
                    <Input size="default" name="email" placeholder="Email" />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button style={{width: '100%'}} type="primary" htmlType="submit" loading={loading === 1 ? true : false}>
                    Tambah
                    </Button>
                </Form.Item>
            </Form>    
            
            </Modal>
            <Button type="primary" onClick={showModal}>
        Tambah Voter
      </Button>
      <br/>
      <br/>
      <Table dataSource={dataSource} columns={columns} />
        </Col>
        <Col span={0}>
        
        </Col>
      </Row>  
    )
}
