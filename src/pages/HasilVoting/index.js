import React from 'react'
import { DatePicker, message, Popconfirm, Space, Modal, Table, Typography, Form, Input, Button, Select } from 'antd';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom'
import { Divider, Row, Col, Alert, Card, Layout, Affix } from 'antd';
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
import { Avatar, Image} from 'antd';
import logo from '../../logo-unj.png'
import { ExclamationCircleOutlined, BarChartOutlined, DashboardOutlined } from '@ant-design/icons';
import {Link, Route, Switch} from 'react-router-dom'

const { Meta } = Card
const { Option } = Select
const {Title} = Typography
const style = { background: '#FAFAD2', padding: '10px 10px 10px 10px' };
const { Header, Sider, Content, Footer} = Layout;

export default function HasilVoting() {
  const [top, setTop] = React.useState(0);
  let [ refresh, setRefresh ] = React.useState(0)
  let auth = useSelector(state => state.auth)
  let dispatch = useDispatch()
  let votes = useSelector(state => state.vote);
  let kandidat = useSelector(state => state.kandidat)
  const dataSource = votes.data
  const namaKandidat = kandidat.data
  let user = auth.user

  React.useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getVotes())
    dispatch(getCandidate())
  }, [dispatch, refresh])

  return (
    <Layout>
      <Affix offsetTop={top}>
      <Header className="header">
          <Row style={{paddingTop: 8}}>
              <Col style={{paddingLeft:25}} xs={{span:3}} xl={{span:2}} lg={{span:1}}>
                  <Avatar style={{width:60, height: 60}} src={logo} />
              </Col>
              
              <Col xs={{span:17}} xl={{span:4}} lg={{span:22}}>
                  <Link to='/'><h1 style={{textAlign: 'left', fontSize: 27}} className='title'>E-Voting PTIK</h1></Link>
              </Col>
              <Col xs={{span:17}} xl={{span:5}} lg={{span:22}}>
                  <Row>
                  <Link to='/hasil'><h3 className='title'><BarChartOutlined /> Hasil Voting</h3></Link>
                  {user && user.role === 'admin' ? <Link to='/admin/home'><h3 className='title' style={{textAlign: "right", marginRight: 0}}>&nbsp;&nbsp;<DashboardOutlined /> Dashboard</h3></Link>: ''}
                  </Row>  
              </Col>
              <Col xs={{span:17}} xl={{span:8}} lg={{span:22}}>
                  
              </Col>
              <Col xs={{span:17}} xl={{span:4}} lg={{span:22}}>
                  {user ? <Link to='/profil'><h3 className='title' style={{textAlign: "right", marginRight: 10}}>{user.full_name}</h3></Link>: ''}
              </Col>
              <Col xs={{span:4}} xl={{span:1  }} lg={{span:4}}>
                  {user ?  <Button type="primary">
                      <Link to="/logout">Logout</Link>
                  </Button> :
                  <Button type="primary">
                      <Link to="/login">Login</Link>
                  </Button>
                  }
              </Col>
          </Row> 
      </Header>
      </Affix>
      <Col style={{background: 'white'}} span={24}>
      <Divider style={{fontSize: 21}}>Hasil Voting yang Telah Selesai</Divider>
          {dataSource.length === 0 || dataSource.findIndex(x => x.tampil === 'ya') === -1 ? <div style={{background: 'white', width: '100%'}}>
          <h1 style={{fontSize:30,textAlign:'center', color: 'gray', paddingTop: 50}}>Belum ada voting yang diumumkan</h1>
                            <img style={{width: 1000, paddingLeft:400}} src='/images/no_voting.png' />
          </div> : '' }
      </Col>
      <Content>
      <Row style={{minHeight: 10}}>
        <Col span={24} >
        
        {dataSource.filter(vote => vote.tampil === 'ya').map((vote, index) => {
          return <Card
          title={`Tahun ${vote.tahun}`} style={{background: '#FFFFFF', marginBottom: 20 }}
            ><Row style={{paddingLeft: 180, paddingRight:25}} gutter={0}>
            {/* <Card style={{ width: 1000, marginBottom: 0 }}> */}
              <Col span={12} >
                <Card hoverable
                  actions={[
                  <h1 style={{fontWeight: 'bold', fontSize: 25  }}>Jumlah Suara: {vote.voter1.length}</h1>
                  ]}
                  style={{ width: 450, marginBottom: 20 }}
                  cover={<img style={{objectFit:'cover'}}height={400} alt="example" src={`${config.api_host}/upload/${vote.kandidat1.foto_kandidat}`} />}>
                  <Meta title={vote.kandidat1.nama} description={vote.kandidat1.angkatan} />
                </Card> 
              </Col>
              <Col span={12} >
                <Card hoverable
                    actions={[
                    <h1 style={{fontWeight: 'bold', fontSize: 25  }}>Jumlah Suara: {vote.voter2.length}</h1>
                    ]}
                  style={{ width: 450, marginBottom: 20 }}
                  cover={<img style={{objectFit:'cover'}}height={400} alt="example" src={`${config.api_host}/upload/${vote.kandidat2.foto_kandidat}`} />}>
                  <Meta title={vote.kandidat2.nama} description={vote.kandidat2.angkatan} />
                </Card> 
              </Col>
            </Row>
            {vote.voter1.length === vote.voter2.length && <Divider orientation="center" style={{fontSize: 25}}>Hasil seri</Divider>}
            {vote.voter1.length > vote.voter2.length && <Divider orientation='center' style={{fontSize: 25}}>Pemenang: {vote.kandidat1.nama}</Divider>}
            {vote.voter1.length < vote.voter2.length && <Divider orientation='center' style={{fontSize: 25}}>Pemenang: {vote.kandidat2.nama}</Divider>}      
          </Card>
        })}
        </Col>
        <Col span={0}>
        
        </Col>
      </Row>
      </Content>
      <Footer style={{ color: 'white', background: 'black', textAlign: 'center' }}>E-Voting ©2020 Created by Kelompok 8 RBPL</Footer>
    </Layout> 
  )
}
