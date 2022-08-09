import React from 'react'
import { Button, Card, Checkbox, Col, DatePicker, message, PageHeader, Row, Upload } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import ToDoList from './toDoList';
const dateFormat = 'YYYY/MM/DD';

const Resources = () => {

    const plainOptions = ['Unit Price', 'Cash Allocation', 'UT Cash Allow Reports(TD)', 'Data Dump'];
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const props = {
        name: 'file',
        action: 'http://localhost:4000/DataUpload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            const isLt2M = (info.file.size / 1024 / 1024) < 2;
            if (!isLt2M) {
                return message.error('File must smaller than 2MB!');
            }

            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    }


    return (
        <>
            <ToDoList />
            <div style={{ marginTop: '25px' }}>
                <Row>
                    <>
                        <Card style={{
                            width: 985, display: "flex", justifyContent: "center", borderRadius: '15px',
                            marginbottom: '15px', border: '1.5px solid'
                        }}>
                            <PageHeader className="site-page-header"
                                subTitle="Processing Data and Price Import" style={{ marginLeft: "135px", fontWeight: "bold" }}
                            ></PageHeader>
                            <div style={{ marginLeft: "28px" }}>
                                <span>Processing Trade Date: </span>
                                <DatePicker onChange={onChange} defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
                                <Upload {...props} >
                                    <Button icon={<UploadOutlined />} type="primary" style={{ borderRadius: '10px', width: "200px", height: "35px", marginLeft: "10px" }}>Upload File</Button>
                                </Upload>
                                <div >
                                    <Checkbox style={{ marginTop: "15px", marginLeft: "150px" }}>Import Price</Checkbox>
                                    <Link to="/resources" style={{ marginLeft: "10px" }}>Label30</Link>
                                </div>
                            </div>
                        </Card>
                    </>
                </Row>
                <Row >
                    <Card style={{
                        width: 985, display: "flex", justifyContent: "center", borderRadius: '15px', marginTop: "10px",
                        marginbottom: '15px', border: '1.5px solid'
                    }}>
                        <PageHeader className="site-page-header"
                            subTitle="Reports and Data Dump" style={{ marginLeft: "150px", fontWeight: "bold" }}
                        ></PageHeader>

                        <div style={{ marginLeft: "-10px" }}>
                            <Checkbox.Group options={plainOptions} />
                            <br />
                            <br />
                            <Row style={{ marginLeft: "20px" }}>
                                <Col span={6}><Link to="/">Label25</Link></Col>
                                <Col span={6}><Link to="/">Label26</Link></Col>
                                <Col span={8}><Link to="/">Label27</Link></Col>
                                <Col span={4}><Link to="/">Label28</Link></Col>
                            </Row>
                        </div>
                    </Card>
                </Row>
            </div>
        </>
    )
}

export default Resources
