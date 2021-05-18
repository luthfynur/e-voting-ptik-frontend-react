import React, {Component} from 'react'
import {Table, Row, Typography} from 'antd';
const {Title} = Typography
class StatusSurat extends Component{
    render(){
        const columns = [{
            title: 'No',
            dataIndex: 'no',
            key: 'no'
          }, {
            title: 'Jenis Surat',
            dataIndex: 'jenis',
            key: 'jenis',
        },
          {
            title: 'Tanggal Buat',
            dataIndex: 'tanggalBuat',
            key: 'tanggalBuat',
        },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        }];

        const data = [
            {
              no: '1',
              jenis: 'Surat PKL',
              tanggalBuat: '01/01/1945',
              status: 'Selesai'
            },
            {
              no: '2',
              jenis: 'Surat Keterangan Mahasiswa',
              tanggalBuat: '02/01/1945',
              status: 'Sedang proses di BAKHUM'
            },
            {
              no: '3',
              jenis: 'Pra Transkrip',
              tanggalBuat: '03/01/1945',
              status: 'Ambil di BAKHUM'
            },
          ];

        return(
            <div>
            <Row>
              <Title level={2}>Status Surat</Title>
            </Row>
            <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}
export default StatusSurat