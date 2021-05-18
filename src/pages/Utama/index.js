import React from 'react'
import {Layout, Menu, Row, Col, Alert, message, Modal} from 'antd'
import './dashboard.css'
import {HomeOutlined,
        FormOutlined, 
        MailOutlined, 
        LogoutOutlined,
        BulbOutlined
} from '@ant-design/icons';
import {Link, Route, Switch} from 'react-router-dom'
import Home from '../../components/StatusSurat'
import Voters from '../../components/Voters'
import Kandidat from '../../components/Kandidat'
import Vote from '../../components/Vote'
import { Avatar, Affix, Image, Divider, Button, Card } from 'antd';
import logo from '../../logo-unj.png'
import ilus from '../../evoting.png'
import {useDispatch, useSelector} from 'react-redux';
import { getVotes } from '../../features/Vote/actions'
import { config } from '../../config';
import { addVote } from '../../api/vote'
import { ExclamationCircleOutlined, BarChartOutlined, DashboardOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const { Header, Sider, Content, Footer} = Layout;
const { Meta } = Card
const { SubMenu } = Menu;

const Utama = () =>{
    const [top, setTop] = React.useState(0);
    let [ refresh, setRefresh ] = React.useState(0)
    let dispatch = useDispatch()
    let auth = useSelector(state => state.auth)
    let votes = useSelector(state => state.vote);
    let dataSource = votes.data
    let user = auth.user
    const [isModalVisible1, setIsModalVisible1] = React.useState(false);
    const [isModalVisible2, setIsModalVisible2] = React.useState(false);

    const showModal1 = () => {
        setIsModalVisible1(true);
    };

    const handleOk1 = () => {
        setIsModalVisible1(false);
    };

    const handleCancel1 = () => {
        setIsModalVisible1(false);
    };

    const showModal2 = () => {
        setIsModalVisible2(true);
    };

    const handleOk2 = () => {
        setIsModalVisible2(false);
    };

    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };

    const tambahVote = async (id, formData) => {
        await addVote(id, formData)
        setRefresh(refresh + 1)
        message.success('Sukses memilih kandidat')
        console.log(dataSource)
    }

    function showConfirm(voteId, voteData) {
        confirm({
          title: 'Apakah kamu yakin ingin memilih kandidat ini?',
          icon: <ExclamationCircleOutlined />,
          content: 'Klik ok untuk melanjutkan',
          onOk() {
            tambahVote(voteId, voteData)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    React.useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getVotes())
        //console.log('jalan')
        //console.log(dataSource.filter((vote) => vote.status === 'berlangsung').map((vote) =>{ return vote}))
      }, [dispatch, refresh])
    return(
        <div>
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
                <Layout>
                    <Sider style={{marginBottom:25}} className="site-layout-background" width={400} breakpoint="lg" collapsedWidth="0">
                        {!user ? <h1 style={{fontWeight:'bold',fontSize:35, marginLeft: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 20}}>Selamat datang di aplikasi e-voting PTIK!</h1> : <h1 style={{fontSize:35, marginLeft: 20, padding: 20}}>Pilih kandidat pilihan kamu dengan cara mengklik tombol vote di bawah foto kandidat</h1> }
                        {!user ? <h1 style={{fontSize:15, marginLeft: 20, paddingLeft: 20, paddingRight: 20}}>Login sekarang untuk memilih kandidat ketua BEMP favoritmu!</h1> : ''}
                        <Image width='400' src={ilus}/>
                    </Sider>
                    <Content className="konten">
                        <Divider orientation='left' style={{fontSize: 21}}>Voting Berlangsung</Divider>
                        {  dataSource.length === 0 || dataSource.findIndex(x => x.status === 'berlangsung') === -1  ? <div style={{width: '100%', background: 'white'}}>
                            {/* <Alert
                                message="Belum ada voting yang berlangsung"
                                description="Silahkan tunggu tanggal pemilihan"
                                type="info"
                                showIcon
                            /> */}
                            <h1 style={{fontSize:30,textAlign:'center', color: 'gray', paddingTop: 50}}>Belum ada voting</h1>
                            <img style={{width: 600, paddingLeft:150}} src='/images/no_voting.png' />

                            {!user ? <div style={{height:125}} /> : <div style={{height:201}} /> } 
                            </div> 
                            : <Row>
                            <Col span={24} >
                            {dataSource.filter(vote => vote.status === 'berlangsung').map((vote, index) => {
                                return <div style={{background: '#FFFFFF', marginBottom: 20 }}>
                                    <Modal
                                        style={{textAlign: 'center'}}
                                        title={`Visi dan Misi ${vote.kandidat1.nama}`}
                                        visible={isModalVisible1}
                                        onOk={handleOk1}
                                        onCancel={handleCancel1}
                                    >
                                        <div>
                                        <h1>Visi</h1>
                                        <pre>{vote.kandidat1.visi}</pre>
                                        <br />
                                        <br />
                                        <h1>Misi</h1>
                                        <pre style={{textAlign: 'left'}}>{vote.kandidat1.misi}</pre>
                                        </div>
                                    </Modal>
                                    <Modal
                                        style={{textAlign: 'center'}}
                                        title={`Visi dan Misi ${vote.kandidat2.nama}`}
                                        visible={isModalVisible2}
                                        onOk={handleOk2}
                                        onCancel={handleCancel2}
                                    >
                                        <div>
                                        <h1>Visi</h1>
                                        <pre>{vote.kandidat2.visi}</pre>
                                        <br />
                                        <br />
                                        <h1>Misi</h1>
                                        <pre style={{textAlign: 'left'}}>{vote.kandidat2.misi}</pre>
                                        </div>
                                    </Modal>
                                    <Row style={{marginTop: 10}}gutter={16}>
                                        <Col className="gutter-row" span={12}>
                                            <Avatar size={50} style={{ marginLeft: 200, marginTop:20,color: '#ffffff', backgroundColor: '#008000' }}>1</Avatar>
                                        </Col>
                                        <Col className="gutter-row" span={0}>
                                       
                                        </Col>
                                        <Col className="gutter-row" span={12}>
                                            <Avatar size={50} style={{ marginLeft: 200, marginTop:20,color: '#ffffff', backgroundColor: '#008000' }}>2</Avatar>
                                        </Col>
                                    </Row> 
                                    <Row style={{padding: 25 }} gutter={50}>
                                        <Col span={12} >
                                            <Card hoverable
                                            actions={[
                                                <Button onClick={showModal1}><BulbOutlined /> VISI DAN MISI</Button>
                                              ]}
                                            style={{ width: 400, marginBottom: 20 }}
                                            cover={<Image style={{objectFit:'cover'}}height={400} width={400} alt="example" src={`${config.api_host}/upload/${vote.kandidat1.foto_kandidat}`} />}>
                                            <Meta title={vote.kandidat1.nama} description={`Angkatan ${vote.kandidat1.angkatan}`} />
                                            </Card> 
                                        </Col>
                                        <Col span={12} >
                                            <Card hoverable
                                            actions={[
                                                <Button onClick={showModal2}><BulbOutlined /> VISI DAN MISI</Button>
                                              ]}
                                            style={{ width: 400, marginBottom: 20 }}
                                            cover={<Image style={{objectFit:'cover'}}height={400} width={400} alt="example" src={`${config.api_host}/upload/${vote.kandidat2.foto_kandidat}`} />}>
                                            <Meta title={vote.kandidat2.nama} description={`Angkatan ${vote.kandidat2.angkatan}`} />
                                            </Card> 
                                        </Col>
                                    </Row>
                                    <Row gutter={0}>
                                        <Col className="gutter-row" span={10}>
                                            {/* { user && vote.votedUser.length === 0 ? <Row style={{marginBottom:20}}>
                                                <Col span={12}>
                                                </Col>
                                                <Col span={2}>
                                                    <Button  type='primary' onClick={() => tambahVote(vote._id, { vote1: user.nim})}>Vote!</Button>
                                                </Col>
                                                <Col span={4}></Col>
                                                </Row> : '' } */}
                                            { user && user.role === 'user' && vote.votedUser.findIndex(x => x.nim === user.nim) === -1 && <Row style={{marginBottom:20}}>
                                                 <Col span={12}>
                                                 </Col>
                                                 <Col span={4}>
                                                     <Button  type='primary' onClick={()=>showConfirm(vote._id, { vote1: user.nim })} disabled={vote.votedUser.findIndex(x => x.nim === user.nim) !== -1 ? true : false}>Vote!</Button>
                                                 </Col>
                                                 <Col span={4}></Col>
                                                 </Row>
                                            }
                                            { user && user.role === 'user'&& vote.votedUser.findIndex(x => x.nim === user.nim) !== -1 && <Row style={{marginBottom:20}}>
                                                 <Col span={10}>
                                                 </Col>
                                                 <Col span={4}>
                                                     <Button  type='primary' onClick={() => showConfirm(vote._id, { vote1: user.nim })} disabled={vote.votedUser.findIndex(x => x.nim === user.nim) !== -1 ? true : false}>Anda sudah memilih</Button>
                                                 </Col>
                                                 <Col span={4}></Col>
                                                 </Row>
                                            }
                                        </Col>
                                        <Col className="gutter-row" span={0}>
                                            <div style={{textAlign: 'center'}}>col-6</div>
                                        </Col>
                                        <Col className="gutter-row" span={10}>
                                            {/* { user && vote.votedUser.length === 0 ? <Row style={{marginBottom:20}}>
                                                    <Col span={17}>
                                                    </Col>
                                                    <Col span={2}>
                                                        <Button  type='primary' onClick={() => tambahVote(vote._id, { vote2: user.nim})}>Vote!</Button>
                                                    </Col>
                                                    <Col span={4}></Col>
                                                    </Row> : '' } */}
                                                { user && user.role === 'user' && vote.votedUser.findIndex(x => x.nim === user.nim) === -1 && <Row style={{marginBottom:20}}>
                                                    <Col span={17}>
                                                    </Col>
                                                    <Col span={4}>
                                                        <Button  type='primary' onClick={() => showConfirm(vote._id, { vote2: user.nim })} disabled={vote.votedUser.findIndex(x => x.nim === user.nim) !== -1 ? true : false}>Vote!</Button>
                                                    </Col>
                                                    <Col span={4}></Col>
                                                    </Row>
                                                }
                                                { user && user.role === 'user' && vote.votedUser.findIndex(x => x.nim === user.nim) !== -1 && <Row style={{marginBottom:20}}>
                                                    <Col span={14}>
                                                    </Col>
                                                    <Col span={4}>
                                                        <Button  type='primary' onClick={() => showConfirm(vote._id, { vote2: user.nim })} disabled={vote.votedUser.findIndex(x => x.nim === user.nim) !== -1 ? true : false}>Anda sudah memilih</Button>
                                                    </Col>
                                                    <Col span={4}></Col>
                                                    </Row>
                                                 }
                                        </Col>
                                    </Row> 
                                </div>
                            }) }
                            </Col>
                        </Row>}
                    </Content>
                </Layout>
                <Footer style={{ color: 'white', background: 'black', textAlign: 'center' }}>E-Voting ©2020 Created by Kelompok 8 RBPL. Admin? Login<a href='#/admin/login'> di sini</a></Footer>
            </Layout>
        </div>
    )
}

export default Utama