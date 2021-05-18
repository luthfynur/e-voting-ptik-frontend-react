import React from 'react'
import { Upload, message, Popconfirm, Space, Modal, Table, Typography, Form, Input, Button, Select } from 'antd';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../api/auth';
import { useHistory } from 'react-router-dom'
import { Row, Col, Alert, Card } from 'antd';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {useDispatch, useSelector} from 'react-redux';
import { getCandidate } from '../../features/Kandidat/actions'
import { config } from '../../config';
import { addKandidat } from '../../api/kandidat'
import { UploadOutlined } from '@ant-design/icons';
import ImageUploader from 'react-images-upload';
import { deleteKandidat } from '../../api/kandidat'
import { getVotes } from '../../features/Vote/actions'
import debounce from 'debounce-promise'

const { Meta } = Card
const {Title} = Typography
const {TextArea} = Input
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


export default function Kandidat() {
  let { register, handleSubmit, errors, setError } = useForm();
  let [ status, setStatus ] = React.useState(statuslist.idle);
  let [ refresh, setRefresh ] = React.useState(0)
  let [ gambar, setGambar ] = React.useState([])
  let [ loading, setLoading ] = React.useState(0)
  let [ deletedKandidat, setDeletedKandidat ] = React.useState('')
  let history = useHistory();
  let [image, setImage] = React.useState({preview: '', raw: ''})
  let dispatch = useDispatch()
  const [form] = Form.useForm();
  let kandidat = useSelector(state => state.kandidat);
  let vote = useSelector(state => state.vote)
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const dataSource = kandidat.data
  const dataVoting = vote.data
  

  React.useEffect(() => {

    dispatch(getCandidate())
    dispatch(getVotes())
    console.log(dataVoting)
  }, [dispatch, refresh])

  const onDrop = (picture) => {
    setGambar([...picture, picture])
  }

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
    console.log(deleteKandidat)
    deleteKandidat(deletedKandidat)
    dispatch(getCandidate())
    setRefresh(refresh + 1)
    message.success('Sukses hapus kandidat')
  }

  const cancelDelete = () => {
    setRefresh(refresh + 1)
    message.error('Batal hapus kandidat')
  }
  
  const onSubmit = async formData => {
    // let form = formData = new FormData()
    // setStatus(statuslist.process);
    // console.log(form)
    // form.append('foto_kandidat', 'foto_kandidat')
    let payload = {
      nama: formData.nama,
      angkatan: formData.angkatan,
      foto_kandidat: formData.foto_kandidat,
      visi: formData.visi,
      misi: formData.misi
    }
    

    payload = new FormData()
    payload.append('foto_kandidat', gambar[0])
    payload.append('nama', formData.nama)
    payload.append('angkatan', formData.angkatan)
    payload.append('visi', formData.visi)
    payload.append('misi', formData.misi)
    console.log(payload)
    console.log('----------')
    setLoading(1)
    let { data } = await addKandidat(payload);
    console.log(data)
    if(data.error) {
      let fields = Object.keys(data.fields);
      fields.forEach(field => {
        setError(field, {type: 'server', message:
        data.fields[field]?.properties?.message})
      });
      setStatus(statuslist.error);
      message.error(data.message)
      setLoading(0)
      return 
    }
    setLoading(0)
    setRefresh(refresh + 1)
    setStatus(statuslist.success);
    setIsModalVisible(false);
    message.success('Sukses tambah kandidat')
    form.resetFields()
    history.push('/admin/kandidat')
  }
    return (
      <Row>
        <Col span={24}>
          <Modal
            title="Tambah Kandidat"
            visible={isModalVisible}
            width={700}
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
                  name="nama"
                  rules={[
                    {
                        required: true,
                        message: 'Masukkan nama kandidat'
                    },
                    {
                      min: 3,
                      message: 'Nama kandidat minimal 3 karakter'
                    },
                  ]}
              >
                  <Input name="nama" placeholder="Nama Kandidat" />
              </Form.Item>
              <Form.Item      
                name="angkatan"
                rules={[
                  {
                      required: true,
                      message: 'Masukkan angkatan kandidat'
                  },
                  {
                    min: 4,
                    max: 4,
                    message: 'Masukkan angkatan dengan benar'
                  },
                  {
                    pattern: /^(?:\d*)$/,
                    message: 'Angkatan menggunakan angka'
                  }
                ]}
              >
                  <Input name="angkatan" placeholder="Angkatan kandidat" />
              </Form.Item>
              <Form.Item      
                name="foto_kandidat"
                rules={[
                  {
                    required: true,
                    message: 'Masukkan foto kandidat'
                  },
                ]}
              >
                <ImageUploader
                  withIcon={true}
                  buttonText='Upload foto kandidat'
                  onChange={onDrop}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
                  withPreview={true}
                  singleImage={true}
                />
                {/* <input name='foto_kandidat' type='file' onChange={onChangeImage} /> */}
              </Form.Item>
              <Form.Item     
                  name="visi"
                  rules={[
                    {
                        required: true,
                        message: 'Masukkan visi kandidat'
                    },
                  ]}
              >
                  <TextArea rows={4} name="visi" placeholder="Visi Kandidat" />
              </Form.Item>
              <Form.Item     
                  name="misi"
                  rules={[
                    {
                        required: true,
                        message: 'Masukkan misi kandidat'
                    },
                  ]}
              >
                  <TextArea rows={4} name="misi" placeholder="Misi Kandidat" />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button style={{width: '100%'}} type="primary" htmlType="submit" loading={loading === 1 ? true : false}>
                  Tambah
                </Button>
              </Form.Item>
            </Form>  
        </Modal>
        <Button style={{marginBottom: 20}} type="primary" onClick={showModal}>
          Tambah Kandidat
        </Button>
      </Col>
      {dataSource.length === 0 ? <Col span={24}><Alert
          message="Belum ada kandidat"
          description="Anda dapat menambah kandidat dengan mengklik tombol Tambah Kandidat"
          type="info"
          showIcon
      /></Col> : '' }
        {dataSource.map((kand, index) => {
          return <Col span={8} ><Card
            hoverable
            style={{ width: 300, marginBottom: 20 }}
            cover={<img style={{objectFit:'cover', width:300, height:300}} alt="example" src={`${config.api_host}/upload/${kand.foto_kandidat}`} />}
            actions={[
              <Popconfirm 
                title="Apakah yakin ingin menghapus kandidat?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                >
                  <Button danger onClick={() => setDeletedKandidat(kand._id)} disabled={dataVoting.findIndex(x => x.kandidat1._id === kand._id || x.kandidat2._id === kand._id) !== -1 ? true : false}>Hapus</Button>
              </Popconfirm>
            ]}
          >
              <Meta title={kand.nama} description={kand.angkatan} />
            </Card> 
          </Col>
          })}
      </Row>  
    )
}
