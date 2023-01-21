import { Col, Layout, Row, Space, Table, Typography } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import type { ColumnsType } from 'antd/es/table';
import { useAppSelector } from '../../../State/hooks';

export interface DataType {
    key: number;
    name: string;
    gender: string;
    email: string;
    mobile: number;
    technology: string;
    profilePicture: string;
  }

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    // color: '#fff',
    backgroundColor:"#fff",
  };

  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: 'rgb(71 68 68 / 88%)',
    backgroundColor: '#fff',
    fontWeight: 'bold',
  };

  const { Title } = Typography;
  
const View = () => {  
      const columns: ColumnsType<Object> = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
        },
         { title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Mobile',
          dataIndex: 'mobile',
          key: 'mobile',
        },
        {
          title: 'Technology',
          dataIndex: 'technology',
          key: 'technology',
        },
        {
          title: 'ProfilePicture',
          dataIndex: 'profilePicture',
          key: 'profilePicture',
          render: datIndex => <img alt="viewImage" height={100} width={100} src={datIndex.toString()} />
        },
      ]; 
      
      const user=useAppSelector((state)=>state.create.userData);
      console.log(user);
  return (
    <Space   direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Typography style={{display: 'flex',justifyContent:"center"}}>
    <Title >View User Details</Title>
    </Typography>
    <Layout>
      <Content style={contentStyle}><Row>
      <Col span={24}>

      <Table columns={columns} dataSource={user} />
      </Col>
      </Row>
      </Content>
      <Footer style={footerStyle}>Waquar Mahboob© 2023 - 2024</Footer>
      </Layout>
      </Space>
  )
}

export default View
