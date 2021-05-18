import React from 'react'
import {Layout, Row, Col, Card } from 'antd';
import './login.css'
import { Form, Input, Button, Affix} from 'antd';
import { Avatar } from 'antd';
import logo from '../../logo-unj.png'
import { Alert, Typography, message } from 'antd';
import { useForm } from 'react-hook-form';
import {useHistory, Redirect, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {userLogin} from '../../features/Auth/actions';
import { updatePassword } from '../../api/users';
import { config } from '../../config';
import { ExclamationCircleOutlined, BarChartOutlined, DashboardOutlined } from '@ant-design/icons';
import { refresh } from 'less';


const { Title } = Typography;

const { Header, Footer} = Layout;

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };

const tailLayout = {
    wrapperCol: { offset: 20, span: 24 },
};

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
}

export default function VoterProfil() {
  const [ error, setError ] = React.useState('')
  const [status, setStatus] = React.useState(statuslist.idle);
  const [nongol, setNongol] = React.useState(0)
  const [top, setTop] = React.useState(0);
  const dispatch = useDispatch();
  let auth = useSelector(state => state.auth)
  const history = useHistory();
  const [form] = Form.useForm();
  const user = auth.user

  const onSubmit = async formData => {
    
    setStatus(statuslist.process);
    console.log(status)
    console.log(form)
    let { data } = await updatePassword(auth.user._id, formData);
    console.log(data)
    if(data.error){
      setNongol(1)
      setStatus(statuslist.error);
      setError(data.message)
      //message.error(data.message)
    } else {
      setNongol(0)
      form.resetFields()
      message.success('Sukses mengganti password')
    }
    setStatus(statuslist.success);
    console.log(status)
  }

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [nongol])

  return(
      <Layout>
        <Affix offset={top}>
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
      <Row className="login">
          <Col xs={{span:2}} xl={{span:8}} lg={{span:8}} />
          <Col xs={{span:20}} xl={{span:8}} lg={{span:8}}>
              <Card className='kartu' title='Update Password'>
              <Form
              form={form}
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish = {onSubmit}
              
              >
              <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Masukkan password lama' }, 
                {
                  min: 8,
                  message: 'Password minimal 8 karakter'
                }]}
              >
                  <Input.Password name="password" placeholder="Password lama" />
              </Form.Item>

              <Form.Item
                  name="new_password"
                  rules={[
                  {
                      required: true,
                      message: 'Masukkan password baru',
                  },
                  {
                    min: 8,
                    message: 'Password kependekan'
                  }
                  ]}
                  hasFeedback
                >
                    <Input.Password name='new_password' placeholder="Password Baru" />
                </Form.Item>
                <Form.Item
                    name="password_confirmation"
                    dependencies={['new_password']}
                    rules={[
                      {
                        required: true,
                        message: 'Konfirmasi password baru',
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue('new_password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject('Password baru tidak cocok');
                        },
                      }),
                    ]}
                >
                    <Input.Password name="password_confirmation" placeholder="Konfirmasi Password Baru" />
                </Form.Item>

              <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                  Submit
                  </Button>
              </Form.Item>
              </Form>
              </Card>
              {nongol === 1 && <Alert
                message={error}
                description='Periksa kembali password lama Anda. Jika lupa silahkan hubungi admin'
                type="error"
                showIcon
              />}
          </Col>
          <Col xs={{span:2}} xl={{span:8}} lg={{span:8}} />
      </Row>
      <Footer style={{ color: 'white', background: 'black', textAlign: 'center' }}>E-Voting ©2020 Created by Kelompok 8 RBPL</Footer>
      </Layout>
  )
}