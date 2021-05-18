import React from 'react'
import {Layout, Menu, Row, Col} from 'antd'
import './dashboard.css'
import {HomeOutlined,
        ContactsOutlined, 
        TeamOutlined,
        PushpinOutlined,
        LogoutOutlined,
        BarChartOutlined, 
        DashboardOutlined
} from '@ant-design/icons';
import {Link, Route, Switch} from 'react-router-dom'
import Home from '../../components/StatusSurat'
import Voters from '../../components/Voters'
import Kandidat from '../../components/Kandidat'
import Vote from '../../components/Vote'
import HomeAdmin from '../../components/HomeAdmin'
import { Avatar, Affix, Button } from 'antd';
import logo from '../../logo-unj.png'
import { useSelector } from 'react-redux';

const { Header, Sider, Content, Footer} = Layout;
const { SubMenu } = Menu;

const AdminDashboard = () =>{
    const [top, setTop] = React.useState(0);
    let href = window.location.href.split('/')
    href = href[5]
    let auth = useSelector(state => state.auth)
    const user = auth.user
    console.log(href)
    return(
        <div>
            <Layout style={{ minHeight: '100vh' }}>
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
                            {/* {user && user.role === 'admin' ? <Link to='/admin/home'><h3 className='title' style={{textAlign: "right", marginRight: 0}}>&nbsp;&nbsp;<DashboardOutlined /> Dashboard</h3></Link>: ''} */}
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
                    <Sider style={{overflow: 'auto', height: '100vh',position: 'fixed',left: 0,}} className="site-layout-background" width={300} breakpoint="lg" collapsedWidth="0">
                        <Menu defaultSelectedKeys={['/'+href]} selectedKeys={['/'+href]} style={{height:'100%',}} theme='dark' mode="inline">
                            <Menu.Item key="/home">
                                <HomeOutlined style={{fontSize: 21, paddingLeft:20}} />
                                <Link style={{fontSize: 21, paddingLeft: 20}} to="/admin/home">Home</Link>
                            </Menu.Item>
                            <Menu.Item key="/voters">
                                <TeamOutlined style={{fontSize: 21, paddingLeft:20}} />
                                <Link style={{fontSize: 21, paddingLeft: 20}} to="/admin/voters">Voter</Link>
                            </Menu.Item>
                            <Menu.Item key="/kandidat">
                                <ContactsOutlined style={{fontSize: 21, paddingLeft:20}} />
                                <Link style={{fontSize: 21, paddingLeft: 20}} to="/admin/kandidat">Kandidat</Link>
                            </Menu.Item>
                            <Menu.Item key="/vote">
                                <PushpinOutlined style={{fontSize: 21, paddingLeft:20}} />
                                <Link style={{fontSize: 21, paddingLeft: 20}} to="/admin/vote">Voting</Link>
                            </Menu.Item>
                            <Menu.Item key="/logout">
                                <LogoutOutlined style={{fontSize: 21, paddingLeft:20}} />
                                <Link style={{fontSize: 21, paddingLeft: 20}} to="/admin/logout">Logout</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{marginLeft: 300}}>
                    <Content className="konten">
                        <Switch>
                            <Route path="/admin/home">
                                <HomeAdmin />
                            </Route>
                            <Route path="/admin/voters">
                                <Voters />
                            </Route>
                            <Route path="/admin/kandidat">
                                <Kandidat />
                            </Route>
                            <Route path="/admin/vote">
                                <Vote />
                            </Route>
                        </Switch>    
                    </Content>
                    <Footer style={{ color:'white', textAlign: 'center', marginTop:0, background:'#000000'}}>E-Voting ©2020 Created by Kelompok 8 RBPL</Footer>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}

export default AdminDashboard