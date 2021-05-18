import React from 'react'
import { Table, Input, Button, Typography } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const {Title} = Typography
const data = [
  {
    key: '1',
    nosurat: '1213',
    fakultas: 'Fakultas Teknik',
    tanggalBuat: '02/01/1945',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    nosurat: '1214',
    fakultas: 'Fakultas Ekonomi',
    tanggalBuat: '02/01/1945',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    nosurat: '1215',
    fakultas: 'Fakultas Bahasa',
    tanggalBuat: '02/01/1945',
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    nosurat: '1216',
    fakultas: 'Fakultas Teknik',
    tanggalBuat: '02/01/1945',
    address: 'London No. 2 Lake Park',
  },
];

class AdminSuratKetMhs extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
       
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const columns = [
      {
        title: 'No Surat',
        dataIndex: 'nosurat',
        key: 'nosurat',
        width: '30%',
        ...this.getColumnSearchProps('nosurat'),
      },
      {
        title: 'Fakultas',
        dataIndex: 'fakultas',
        key: 'fakultas',
        width: '20%',
      },
      {
        title: 'Tanggal',
        dataIndex: 'tanggalBuat',
        key: 'tanggalBuat',
      },
      {
        title: 'Aksi',
        key: 'aksi',
        render: (text, record) => (
            <div>
            <a>Proses</a>
            <br></br>
            <a>Hapus</a>
            </div>
        ),
      },
    ];
    return (
        <div>
            <Title level={2}>Surat Keterangan Mahasiswa</Title>
            <Table columns={columns} dataSource={data} />
        </div>
    );
  }
}

export default AdminSuratKetMhs