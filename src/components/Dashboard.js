import React from 'react'
import {Layout, Menu, Row, Col} from 'antd'
import './dashboard.css'
import {HomeOutlined,
        FormOutlined, 
        MailOutlined, 
        LogoutOutlined
} from '@ant-design/icons';
import {Link, Route, Switch} from 'react-router-dom'
import StatusSurat from './StatusSurat';
import Home from './Home'
import { Avatar } from 'antd';
import logo from '../logo-unj.png'


const { Header, Sider, Content} = Layout;
const { SubMenu } = Menu;

const Dashboard = () =>{
    return(
        <div>
            <Layout>
                <Header className="header">
                    <Row>
                        <Col xs={{span:3}} xl={{span:1}} lg={{span:1}}>
                            <Avatar src={logo} />
                        </Col>
                        <Col xs={{span:21}} xl={{span:22}} lg={{span:22}}>
                            <h1 className="title">Sistem Pelayanan BAKHUM</h1>
                        </Col>
                    </Row> 
                </Header>
                <Layout>
                    <Sider className="site-layout-background" width={300} breakpoint="lg" collapsedWidth="0">
                        <Menu defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <HomeOutlined />
                                <Link to="/home">Home</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <MailOutlined />
                                <Link to="/status">Status Surat</Link>
                            </Menu.Item>
                            <SubMenu key="sub1" title={<span><FormOutlined /><span>Buat Surat</span></span>}>
                                <Menu.Item key="3"><Link to="/suratketeranganmhs">Surat Keterangan Mahasiswa</Link></Menu.Item>
                                <Menu.Item key="4"><Link to="/pkl">Surat PKL</Link></Menu.Item>
                                <Menu.Item key="5"><Link to="/suratcuti">Surat Cuti</Link></Menu.Item>
                                <Menu.Item key="6"><Link to="/pratranskrip">Pra Transkrip</Link></Menu.Item>
                            </SubMenu>
                            <Menu.Item key="7">
                                <LogoutOutlined />
                                <span>Logout</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content className="konten">
                         
                    </Content>
                </Layout>
            </Layout>
            
        </div>
    )
}

export default Dashboard