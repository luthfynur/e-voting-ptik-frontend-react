import React from 'react'
import { DatePicker, message, Popconfirm, Space, Modal, Table, Typography, Form, Input, Button, Select } from 'antd';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom'
import { Divider, Row, Col, Alert, Card } from 'antd';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {useDispatch, useSelector} from 'react-redux';
import { getVotes } from '../../features/Vote/actions'
import { addVote } from '../../api/vote'
import { addVoting } from '../../api/vote'
import { getCandidate } from '../../features/Kandidat/actions'
//import { delUser } from '../../features/Users/actions'
import { config } from '../../config';
import moment from 'moment'
import { deleteVoting } from '../../api/vote'
const { Meta } = Card
const { Option } = Select
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
  let [ deletedVoting, setDeletedVoting ] = React.useState('')
  let [ filterAngkatan, setFilterAngkatan ] = React.useState(0)
  let history = useHistory();
  let dispatch = useDispatch()
  const [form] = Form.useForm();
  let votes = useSelector(state => state.vote);
  let kandidat = useSelector(state => state.kandidat)
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const dataSource = votes.data
  const namaKandidat = kandidat.data
 
  const tambahVote = async (id, formData) => {
    await addVote(id, formData)
    setRefresh(refresh + 1)
    message.success('Sukses ubah status')
    console.log(dataSource)
  }

  React.useEffect(() => {
    dispatch(getVotes())
    dispatch(getCandidate())
  }, [dispatch, refresh])

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
    deleteVoting(deletedVoting)
    dispatch(getVotes())
    setRefresh(refresh + 1)
    message.success('Sukses hapus voting')
  }

  const cancelDelete = () => {
    setRefresh(refresh + 1)
    message.error('Batal hapus voting')
  }
  
  
  const onSubmit = async formData => {
    setStatus(statuslist.process);
    setLoading(1)
    let { data } = await addVoting(formData);
    if(data.error) {
      let fields = Object.keys(data.fields);
      fields.forEach(field => {
        setError(field, {type: 'server', message:
        data.fields[field]?.properties?.message})
        message.error(data.message)
      });
      console.log(data)
      setStatus(statuslist.error);
      setLoading(0)
      return 
    }
    setLoading(0)
    setRefresh(refresh + 1)
    setStatus(statuslist.success);
    setIsModalVisible(false);
    message.success('Sukses tambah voting')
    form.resetFields()
    history.push('/admin/vote')
  }

  
  //console.log(dataSource)
  const columns = [
    {
      title: 'Tahun',
      dataIndex: '_id',
      key: 'tahun',
      
    },
    {
      title: 'Kandidat 1',
      dataIndex: 'jumlah',
      key: 'kandidat1',
    },
    {
      title: 'Kandidat 2',
      dataIndex: 'kandidat2',
      key: 'kandidat2',
    },
    {
      title: 'Suara 1',
      dataIndex: 'suara1',
      key: 'email'
    }
    // {
    //   title: 'Aksi',
    //   key: 'action',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <Popconfirm 
    //         title="Apakah yakin ingin menghapus data?"
    //         onConfirm={confirmDelete}
    //         onCancel={cancelDelete}
    //         >
    //         <Button danger onClick={delUser(record._id)}>Hapus</Button>
    //       </Popconfirm>
    //     </Space>
    //   ),
    // },
  ];
    return (
      <Row>
        <Col span={24} >
        <Modal
          title="Tambah Voting"
          visible={isModalVisible}
          width={350}
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
                    
                    name="tahun"
                    rules={[
                    {
                        required: true,
                        message: 'Masukkan tahun'
                    },
                    {
                      min: 4,
                      max: 4,
                      message: 'Masukkan tahun yang bener'
                    },
                    {
                      pattern: /^(?:\d*)$/,
                      message: 'Tahun itu pakai angka'
                    }
                    ]}
                >
                    <Input onChange={e => setFilterAngkatan(e.target.value)} name="tahun" placeholder="Tahun Voting" />
                    
              </Form.Item>
              <Form.Item      
                name="kandidat1"
                rules={[
                  {
                    required: true,
                    message: 'Masukkan kandidat pertama'
                  },
                ]}
              >
               
                <Select placeholder='Pilih Kandidat Pertama' style={{width: 301}}>
                  {namaKandidat.filter(data => data.angkatan === filterAngkatan).map((kandidat, index) => {
                    return <Option value={kandidat.nama}>{kandidat.nama}</Option>
                  })}
                </Select>
              </Form.Item>
              <Form.Item      
                name="kandidat2"
                rules={[
                  {
                    required: true,
                    message: 'Masukkan kandidat kedua'
                  },
                ]}
              >
                <Select placeholder='Pilih Kandidat Kedua' style={{width: 301}}>
                  {namaKandidat.filter(data => data.angkatan === filterAngkatan).map((kandidat, index) => {
                    return <Option value={kandidat.nama}>{kandidat.nama}</Option>
                  })}
                </Select>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button style={{width: '100%'}} type="primary" htmlType="submit" loading={loading === 1 ? true : false}>
                  Submit
                </Button>
              </Form.Item>
            </Form>  
        </Modal>
      <Button style={{marginBottom: 20}} type="primary" onClick={showModal}>
        Tambah Voting
      </Button>
      {dataSource.length === 0 ? <Alert
          message="Belum ada voting"
          description="Anda dapat membuat voting dengan mengklik tombol Tambah Voting"
          type="info"
          showIcon
      /> : '' }
      {dataSource.map((vote, index) => {
              return <Card title={`Tahun ${vote.tahun}`} style={{background: '#FFFFFF', marginBottom: 20 }}
                actions={[
                  <h1>Voting {vote.status}</h1>,
                  <h1>{vote.tampil === 'ya' ? 'Hasil voting telah diumukan' : 'Hasil voting dirahasiakan' }</h1>,     
                  <Popconfirm 
                    title="Apakah yakin ingin menghapus voting?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                  >
                    <Button type="primary" disabled={vote.status === 'berlangsung' || vote.tampil === 'ya' ? true : false} danger onClick={() => setDeletedVoting(vote._id)}>Hapus Voting</Button>
                  </Popconfirm>
                ]}><Row style={{paddingLeft: 25, paddingRight:25}} gutter={50}>
                
                
                {/* <Card style={{ width: 1000, marginBottom: 0 }}> */}
                  <Col span={12} >
                    <Card hoverable
                      actions={[
                      <h1 style={{fontWeight: 'bold', fontSize: 25  }}>Jumlah Suara: {vote.voter1.length}</h1>
                      ]}
                      style={{ width: 450, marginBottom: 20 }}
                      cover={<img style={{objectFit:'cover'}}height={400} alt="example" src={`${config.api_host}/upload/${vote.kandidat1.foto_kandidat}`} />}>
                      <Meta title={vote.kandidat1.nama} description={`Angkatan ${vote.kandidat1.angkatan}`} />
                    </Card> 
                  </Col>
                  <Col span={12} >
                    <Card hoverable
                       actions={[
                        <h1 style={{fontWeight: 'bold', fontSize: 25  }}>Jumlah Suara: {vote.voter2.length}</h1>
                        ]}
                      style={{ width: 450, marginBottom: 20 }}
                      cover={<img style={{objectFit:'cover'}}height={400} alt="example" src={`${config.api_host}/upload/${vote.kandidat2.foto_kandidat}`} />}>
                      <Meta title={vote.kandidat2.nama} description={`Angkatan ${vote.kandidat2.angkatan}`} />
                    </Card> 
                  </Col>
                  
                  <Col span={12}>
                  {vote.status === 'berlangsung' ?  <Button type="primary "danger disabled={vote.tampil === 'ya' ? true : false} onClick={() => tambahVote(vote._id, { status: 'selesai'})}>Berhentikan voting</Button> 
                  : <Button type="primary" disabled={vote.tampil === 'ya' ? true : false} onClick={() => tambahVote(vote._id, { status: 'berlangsung'})}>Selenggarakan voting</Button>}
                  <br />
                  <br />
                  {vote.tampil === 'tidak' ?  <Button disabled={vote.status === 'berlangsung' ? true : false } type="primary " onClick={() => tambahVote(vote._id, { tampil: 'ya'})}>Umumkan hasil voting</Button> 
                  : <Button danger type="primary" disabled={vote.status === 'berlangsung' ? true : false } onClick={() => tambahVote(vote._id, { tampil: 'tidak'})}>Rahasiakan hasil voting</Button>}
                  </Col>
                {/* </Card> */}
              </Row>
              {/* <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                <h1 style={{textAlign: 'center'}}>Jumlah Suara: {vote.voter1.length}</h1>
                </Col>
                <Col className="gutter-row" span={0}>
                  <div style={{textAlign: 'center'}}>col-6</div>
                </Col>
                <Col className="gutter-row" span={12}>
                  <h1 style={{textAlign: 'center'}}>Jumlah Suara: {vote.voter2.length}</h1>
                </Col>
              </Row>  */}
              {/* <Row>
                <Col className="gutter-row" span={12}>
                <Form onFinish={tambahVote(vote._id, )}>
                  <Form.Item name="status">
                    <Input name="status" value='berlangsung' />
                 </Form.Item>
                 <Button type="primary" htmlType="submit">
                    Tambah
                  </Button>
                </Form>
                
                <Button type="primary" disabled={vote.status === 'berlangsung' ? true : false} onClick={() => tambahVote(vote._id, { status: 'berlangsung'})}>Mulai</Button>
                <Button type="primary "danger disabled={vote.status === 'selesai' ? true : false} onClick={() => tambahVote(vote._id, { status: 'selesai'})}>Berhenti</Button>
                </Col>
              </Row> */}
            </Card>
          })}
        </Col>
        <Col span={0}>
        
        </Col>
      </Row>  
    )
}
