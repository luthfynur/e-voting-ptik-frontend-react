import { Alert , Typography} from 'antd';
import React from 'react'
const {Title} = Typography

const Home = () =>{
    return(
    <div>
        <Title level={2}>Hi, Nama Mahasiswa</Title>
        <Alert
      message="Pengumuman"
      description="Info Description Info Description Info Description Info Description 
      Info Description Info Description Info Description Info Description
      Info Description Info Description Info Description Info Description
      Info Description Info Description Info Description Info Description
      Info Description Info Description Info Description Info Description"
      type="info"
      showIcon
    />
    </div>
    )
}

export default Home