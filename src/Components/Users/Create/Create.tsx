import React, { useState } from "react";
import { Col, RadioChangeEvent, Row, Space, Modal,Card, Layout } from "antd";
import { Button, Checkbox, Form, Input, Radio, message, Upload ,Typography} from "antd";
import type { UploadProps } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { addUserDetails } from "./createPageSlice";
import { useAppDispatch } from "../../../State/hooks";
import { Content, Footer } from "antd/es/layout/layout";

export interface PreviewDataType {
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
  color: '#fff',
  backgroundColor:"#fff",
};
const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: 'rgb(71 68 68 / 88%)',
  backgroundColor: '#fff',
  fontWeight: 'bold',
};


const { Meta } = Card;
const { Title } = Typography;

const Create = () => {
  const CheckboxGroup = Checkbox.Group;
  const [profilePicObj, setprofilePicObj] = useState<string>("");
  const [isPreview, setIsPreview] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewDataType>({name:"",
    gender:"",
    email:"",
    mobile:0,
    technology:"",
    profilePicture:"",})
  const [genderValue, setgenderValue] = useState<string>("");
  const [tecnologyChecked, setTecnologyChecked] = useState<CheckboxValueType[]>(
    []
  );
  const dispatch = useAppDispatch();
  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpg";
      const isJPEG = file.type === "image/jpeg";
      if (!isPNG && !isJPG && !isJPEG) {
        message.error(`${file.name} is not in supported image format.`);
        return Upload.LIST_IGNORE;
      } else {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result?.toString();
          setprofilePicObj(base64String as string);
        };

        reader.readAsDataURL(file);
        return false;
      }
    },
    name: "file",
    action: "#",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading" && status !== "error") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    onRemove(file) {
      message.warning(`${file.name} file removed`);
    },
  };

  const plainOptions = [
    {
      label: "C",
      value: "C",
    },
    {
      label: "C++",
      value: "C++",
    },
    {
      label: "Java",
      value: "Java",
    },
    {
      label: "Python",
      value: "Python",
    },
    {
      label: "Javascript",
      value: "Javascript",
    },
  ];

  const onTechnologyChange = (list: CheckboxValueType[]) => {
    setTecnologyChecked(list);
  };

  const showPreview = () => {
    setIsPreview(true);
  };

  const handleOk = () => {
    setIsPreview(false);
    onFinish(previewData)

  };

  const handleCancel = () => {
    setIsPreview(false);
    
  };

  const onGenderChange = (e: RadioChangeEvent) => {
    console.log("Gender", e.target.value);
    setgenderValue(e.target.value);
  };

  const onFinish = (values: any) => {

    if (values.profilePicture.fileList.length) {
      if(!isPreview){
        values.technology =values.technology.toString();
        showPreview()
        setPreviewData(values)
      }else{
      values.profilePicture = profilePicObj;
      dispatch(addUserDetails(values));
      console.log("Success:", values);
      }
      
      
    } else {
      message.error("Please Upload Your Profile Picture First!");
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    
    
       <Space   direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Typography style={{display: 'flex',justifyContent:"center"}}>
    <Title >Create User</Title>
    </Typography>
    <Layout>
      <Content style={contentStyle}><Row>
      <Col span={18}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
              pattern: new RegExp("^[a-zA-Z_ ]*$"),
            },
          ]}
        >
          <Input placeholder="Enter Your name" />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[
            {
              required: true,
              message: "Please Select your gender!",
            },
          ]}
        >
          <Radio.Group onChange={onGenderChange} value={genderValue}>
            <Radio value={"Male"}>Male</Radio>
            <Radio value={"Female"}>Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { type: "email", message: "The input is not valid E-mail!" },
            { required: true, message: "Please input your Email!" },
          ]}
        >
          <Input placeholder="Enter Your email" />
        </Form.Item>

        <Form.Item
          label="Mobile"
          name="mobile"
          rules={[
            {
              required: true,
              message: "Please input your Mobile Number !",
              pattern: new RegExp("^[08976][0-9]{9}"),
            },
          ]}
        >
          <Input placeholder="Enter Your Mobile Numbers" maxLength={10} />
        </Form.Item>

        <Form.Item
          label="Technology"
          name="technology"
          rules={[
            { required: true, message: "Please input your Technology !" },
          ]}
        >
          <CheckboxGroup
            options={plainOptions}
            value={tecnologyChecked}
            onChange={onTechnologyChange}
          />
        </Form.Item>

        <Form.Item
          label="ProfilePicture"
          name="profilePicture"
          valuePropName="profilePicture"
          rules={[
            { required: true, message: "Please upload your Profile Picture !" },
          ]}
        >
          <Upload.Dragger
            accept="image/png, image/jpeg, image/jpg,"
            {...uploadProps}
            maxCount={1}
          >
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Modal title="Basic Modal" open={isPreview} onOk={handleOk} onCancel={handleCancel}>
      <Card
    hoverable
    style={{ width: 475 }}
    cover={<img alt={JSON.stringify(previewData.name)} src={profilePicObj.toString()} />}
  >
    <Meta title="Name" description={previewData.name} />
    <Meta title="Gender" description={previewData.gender} />
    <Meta title="Email" description={previewData.email} />
    <Meta title="Mobile" description={previewData.mobile} />
    <Meta title="Technology" description={previewData.technology} />
  </Card>
      </Modal>
      </Col>
    </Row></Content>
      <Footer style={footerStyle}>Waquar Mahboob© 2023 - 2024</Footer>
    </Layout>
    </Space>
      
    
  );
};

export default Create;
