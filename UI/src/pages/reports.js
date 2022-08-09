import React from 'react'
import { Card, Checkbox, Col, Radio, Row } from 'antd';
import { Box, FormControl, InputLabel, LinearProgress, ListItemText, MenuItem, OutlinedInput } from '@mui/material';
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, StopOutlined } from '@ant-design/icons';
import Checkboxs from '@mui/material/Checkbox';
import Selects from '@mui/material/Select';
import { Link } from 'react-router-dom';
import { Collapse } from 'antd';
import ToDoList from './toDoList';
const { Panel } = Collapse;

const Reports = () => {
    const onCollapseChange = (key) => {
        console.log(key);
    };
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const [productData, setProductData] = React.useState([]);
    const [progress, setProgress] = React.useState(0);
    const [showProgress, setShowProgress] = React.useState(false);
    const [showPrs, setShowPrs] = React.useState(false);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 50;
                return Math.min(oldProgress + diff, 100);
            });
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, []);
    const title = ['MPF', 'OSRO', 'Macau Pension', 'MSUT', 'MIT', 'PRS', 'PHDAA']

    const handleChange = (event) => {
        const data = event.target.value.map((item) => {
            return item;
        })

        if (data[0] === 'PRS') {
            setShowPrs(true)
        } else {
            setShowPrs(false)
        }

        if (data.length > 0) {
            setShowProgress(true);
            setTimeout(() => {
                setShowProgress(false);
            }, 2000);
        }

        const { target: { value } } = event;
        setProductData(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <>
            <ToDoList />
            <div style={{ marginTop: '25px' }}>
                <Row>
                    <>
                        <Card style={{
                            width: 490, borderRadius: '15px',
                            marginbottom: '15px', border: '1.5px solid'
                        }}>
                            {/* <PageHeader className="site-page-header"
                            subTitle="Reports and Data Dump"
                            style={{
                                marginTop: "-10px",
                            }}
                        ></PageHeader> */}
                            <ul style={{
                                marginTop: "5px", fontSize: "22px"
                            }}>
                                <li>Reports and Data Dump</li>
                            </ul>
                            <div style={{ marginLeft: "40px" }}>
                                {/* <span>Processing Trade Date: </span> */}
                                <Checkbox>Unit Price</Checkbox>
                                <Checkbox>Cash Allocation</Checkbox>
                                <Checkbox>Data Dump</Checkbox>
                                <Checkbox style={{ marginLeft: "-0px", marginTop: "5px" }}>UT Cash Allow Reports(TD)</Checkbox>
                            </div>
                        </Card>
                        <Card style={{
                            width: 480, borderRadius: '15px',
                            border: '1.5px solid', marginLeft: '15px'
                        }}>
                            <ul style={{
                                marginTop: "5px", fontSize: "22px"
                            }}>
                                <li>Processing Data and Price Import</li>
                            </ul>
                            <div style={{ marginLeft: "40px" }}>
                                <span>Processing Trade Date: </span>
                                <Checkbox style={{}}>Import Price</Checkbox>
                            </div>
                        </Card>
                    </>
                </Row>
                <h3 style={{
                    marginTop: "10px",
                }}><b>Select Platform(s) to process:</b></h3>

                <div className="site-card-border-less-wrapper">
                    <Row>
                        <Col span={8}>
                            <Card style={{
                                width: 985, borderRadius: '15px',
                                marginbottom: '15px', border: '1.5px solid'
                            }} >
                                <div>
                                    <FormControl sx={{ m: 1, width: 300 }} style={{
                                        width: '100%', color: 'black'
                                    }}>
                                        <InputLabel id="demo-multiple-checkbox-label">Select Product</InputLabel>
                                        <Selects
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={productData}
                                            onChange={handleChange}
                                            input={<OutlinedInput label="Select Product" />}
                                            renderValue={(selected) => selected.join(',')}
                                            MenuProps={MenuProps}
                                        >
                                            {title.map((name) => (
                                                <MenuItem key={name} value={name} >
                                                    <Checkboxs checked={productData.indexOf(name) > -1} />
                                                    <ListItemText primary={name} />
                                                </MenuItem>
                                            ))}
                                        </Selects>
                                    </FormControl>
                                    {showProgress &&
                                        <Box sx={{ width: '100%' }}>
                                            <LinearProgress variant="determinate" value={progress} />
                                        </Box>}
                                </div>
                                <ul style={{ marginTop: "8px", fontSize: "22px" }}>
                                    <li>Details</li>
                                </ul>
                                <div style={{ marginTop: "10px", marginLeft: '40px', display: 'flex' }}>
                                    <div>
                                        <p><Checkbox>Import and process</Checkbox><Link to='/'>Label1</Link></p>
                                        <p><Checkbox>Generate CF Report</Checkbox><Link to='/'>Label2</Link></p>
                                        <p><Checkbox>Generate Fields</Checkbox><Link to='/'>Label3</Link></p>
                                    </div>
                                    {showPrs &&
                                        <div style={{ marginLeft: '200px' }}>
                                            <Radio value={1}>Generate Rebalance(PRS)</Radio> <br />
                                            <Radio value={1} style={{ marginTop: "10px" }}>Generate Cash and Rebalance(PRS)</Radio>
                                        </div>
                                    }
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <h3 style={{
                    marginTop: "10px",
                }}><b>Process summary</b></h3>
                <div className="site-card-border-less-wrapper">
                    <Row>
                        <Col span={8}>
                            <Card style={{
                                width: 985, borderRadius: '15px',
                                marginbottom: '15px', border: '1.5px solid'
                            }} >
                                <Collapse onChange={onCollapseChange} style={{ fontSize: "18px" }}>
                                    <Panel header="MPF" key="1">
                                        <p style={{ fontSize: "18px" }}><ExclamationCircleOutlined style={{ color: 'blue', fontSize: "20px", fontWeight: "bold" }} /> Import and process - In-Progress </p>
                                        <p style={{ fontSize: "18px" }}><CheckCircleOutlined style={{ color: 'green', fontSize: "20px", fontWeight: "bold" }} /> Generate CF Report - Completed</p>
                                        <p style={{ fontSize: "18px" }}><CloseCircleOutlined style={{ color: 'red', fontSize: "20px", fontWeight: "bold" }} /> Generate Fields - Failed-Exception message</p>
                                    </Panel>
                                </Collapse>
                                <Collapse onChange={onCollapseChange} style={{ fontSize: "18px" }}>
                                    <Panel header="MOST" key="1">
                                        <p style={{ fontSize: "18px" }}><StopOutlined style={{ color: 'red', fontSize: "20px", fontWeight: "bold" }} /> Import and process - Invalid Data</p>
                                        <p style={{ fontSize: "18px" }}><CheckCircleOutlined style={{ color: 'green', fontSize: "20px", fontWeight: "bold" }} /> Generate CF Report - Successfully Completed</p>
                                        <p style={{ fontSize: "18px" }}><CheckCircleOutlined style={{ color: 'green', fontSize: "20px", fontWeight: "bold" }} /> Generate Fields - Successfully Completed</p>
                                    </Panel>
                                </Collapse>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div >
        </>
    )
}

export default Reports
