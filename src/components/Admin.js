import React from 'react'
import {Layout, Menu, Row, Col} from 'antd'
import './dashboard.css'
import {HomeOutlined,
    FormOutlined, 
    MailOutlined, 
    LogoutOutlined
} from '@ant-design/icons';
import {Link, Route, Switch} from 'react-router-dom'
import { Avatar } from 'antd';
import logo from '../logo-unj.png'
import AdminPengumuman from './AdminPengumuman';
import AdminSuratPKL from './AdminSuratPKL';
import AdminSuratKetMhs from './AdminSuratKetMhs';
import AdminSuratCuti from './AdminSuratCuti';
import AdminPraTranskrip from './AdminPraTranskrip';

const { Header, Sider, Content} = Layout;
const { SubMenu } = Menu;

const Admin = () =>{
    return(
        <div>
            <Layout>
                <Header className="header">
                    <Row>
                        <Col xs={{span:3}} xl={{span:1}} lg={{span:1}}>
                            <Avatar src={logo} />
                        </Col>
                        <Col xs={{span:21}} xl={{span:22}} lg={{span:22}}>
                            <h1 className="title">Admin BAKHUM</h1>
                        </Col>
                    </Row> 
                </Header>
                <Layout>
                    <Sider className="site-layout-background" width={300} breakpoint="lg" collapsedWidth="0">
                        <Menu defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <HomeOutlined />
                                <Link to="/admin/pengumuman">Buat Pengumuman</Link>
                            </Menu.Item>
                            <SubMenu key="sub1" title={<span><FormOutlined /><span>Surat</span></span>}>
                                <Menu.Item key="2"><Link to="/admin/suratketeranganmhs">Surat Keterangan Mahasiswa</Link></Menu.Item>
                                <Menu.Item key="3"><Link to="/admin/pkl">Surat PKL</Link></Menu.Item>
                                <Menu.Item key="4"><Link to="/admin/suratcuti">Surat Cuti</Link></Menu.Item>
                                <Menu.Item key="5"><Link to="/admin/pratranskrip">Pra Transkrip</Link></Menu.Item>
                            </SubMenu>
                            <Menu.Item key="6">
                                <LogoutOutlined />
                                <span>Logout</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content className="konten">
                        <Switch>
                            <Route path="/admin/pengumuman">
                                <AdminPengumuman />
                            </Route>
                            <Route path="/admin/pkl">
                                <AdminSuratPKL />
                            </Route>
                            <Route path="/admin/suratketeranganmhs">
                               <AdminSuratKetMhs />
                            </Route>
                            <Route path="/admin/suratcuti">
                                <AdminSuratCuti />
                            </Route>
                            <Route path="/admin/pratranskrip">
                               <AdminPraTranskrip />
                            </Route>
                        </Switch>    
                    </Content>
                </Layout>
            </Layout>
            
        </div>
    )
}

export default Admin