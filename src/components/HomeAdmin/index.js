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
import { getCandidate } from '../../features/Kandidat/actions'
import { getVotes } from '../../features/Vote/actions'


export default function HomeAdmin() {
  let [ refresh, setRefresh ] = React.useState(0)
  let dispatch = useDispatch()
  let users = useSelector(state => state.users);
  let kandidat = useSelector(state => state.kandidat)
  let voting = useSelector(state => state.vote)
  const jumlahUser = users.count
  const jumlahKandidat = kandidat.count
  const jumlahVoting = voting.count

  React.useEffect(() => {
    dispatch(getUser())
    dispatch(getCandidate())
    dispatch(getVotes())
  }, [dispatch, refresh])

    return (
      <Row gutter={16}>
        <Col style={{marginBottom: 25}} span={24}>
          <Alert
            message="Selamat datang di aplikasi admin e-voting BEMP PTIK!"
            description="Anda dapat mengelola data voter, kandidat dan voting melalui menu di sebelah kiri"
            type="success"
          />
        </Col>
        <Col span={8}>
          <Card title='Jumlah Voter' style={{textAlign: 'center'}}>
            <h1 style={{fontSize: 60, textAlign: 'center', fontWeight: 'bold'}}>{jumlahUser}</h1>
          </Card>
        </Col>
        <Col span={8}>
          <Card title='Jumlah Kandidat' style={{textAlign: 'center'}}>
            <h1 style={{fontSize: 60, textAlign: 'center', fontWeight: 'bold'}}>{jumlahKandidat}</h1>
          </Card>
        </Col>
        <Col span={8}>
          <Card title='Jumlah Voting' style={{textAlign: 'center'}}>
            <h1 style={{fontSize: 60, textAlign: 'center', fontWeight: 'bold'}}>{jumlahVoting}</h1>
          </Card>
        </Col>
      </Row>  
    )
}
