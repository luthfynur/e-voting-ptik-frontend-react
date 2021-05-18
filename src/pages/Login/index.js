import React from 'react'
import {Layout, Row, Col, Card } from 'antd';
import './login.css'
import { Form, Input, Button} from 'antd';
import { Avatar } from 'antd';
import logo from '../../logo-unj.png'
import { Alert, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import {useHistory, Redirect, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {userLogin} from '../../features/Auth/actions';
import { login } from '../../api/auth';


const { Title } = Typography;

const { Header, Footer} = Layout;

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };

const tailLayout = {
    wrapperCol: { offset: 19, span: 24 },
};

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
}

export default function Login() {
  const { errors, setError } = useForm();
  const [status, setStatus] = React.useState(statuslist.idle);
  const [nongol, setNongol] = React.useState(0)
  const [loading, setLoading] = React.useState(0)
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async ({nim, password}) => {
    setStatus(statuslist.process);
    console.log(status)
    setLoading(1)
    let { data } = await login(nim, password);
    console.log(data)
    if(data.error){
      setNongol(1)
      setLoading(0)
      setError('password', {type: 'invalidCredential', message: data.message});
      setStatus(statuslist.error);
    } else {
      setLoading(0)
      let {user, token} = data;
      dispatch(userLogin(user, token));
      history.push('/');
    }
    setLoading(0)
    setStatus(statuslist.success);
    console.log(status)
  }

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [loading])

  return(
      <Layout>
      <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Row style={{paddingTop: 8}}>
              <Col style={{paddingLeft: 25}} xs={{span:3}} xl={{span:2}} lg={{span:1}}>
                  <Avatar style={{width: 60, height: 60}} src={logo} />
              </Col>
              <Col xs={{span:21}} xl={{span:22}} lg={{span:22}}>
              <Link to='/'><h1  style={{fontSize:27}} className='title'>E-Voting PTIK</h1></Link>
              </Col>
          </Row> 
      </Header>
      <Row className="login">
          <Col xs={{span:2}} xl={{span:8}} lg={{span:8}} />
          <Col xs={{span:20}} xl={{span:8}} lg={{span:8}}>
              <Card style={{marginTop:30}} className='kartu' title='Silahkan Login'>
              <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish = {onSubmit}
              
              >
              <Form.Item
                  name="nim"
                  rules={[{ required: true, message: 'Masukkan NIM Anda!' }]}
              >
                  <Input name="nim" placeholder="NIM" />
              </Form.Item>

              <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Masukkan password Anda' }]}
              >
                  <Input.Password name="password" placeholder="Password"/>
              </Form.Item>

              <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" loading={loading === 1 ? true : false}>
                  Submit
                  </Button>
              </Form.Item>
              </Form>
              </Card>
              {nongol === 1 && <Alert
                message={errors.password?.message}
                description='Periksa kembali nim dan password Anda'
                type="error"
                showIcon
              />}
          </Col>
          <Col xs={{span:2}} xl={{span:8}} lg={{span:8}} />
      </Row>
      <Footer style={{ color: 'white', background: 'black', textAlign: 'center' }}>E-Voting ©2020 Created by Kelompok 8 RBPL. Admin? Login<a href='#/admin/login'> di sini</a></Footer>
      </Layout>
  )
}