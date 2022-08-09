import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Typography, Input, PageHeader, Tabs } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import { FilterOutlined, SearchOutlined, SortAscendingOutlined } from '@ant-design/icons';
import ToDoList from './toDoList';
const { Paragraph } = Typography;
const { TabPane } = Tabs;

const FundTools = () => {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState();
    const { Search } = Input;

    const [editableStr, setEditableStr] = useState('Please select the policy you wish to make transaction.');
    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
        { field: 'make', filter: true },
        { field: 'model', filter: true },
        { field: 'price' }
    ]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true
    }));
    // Example of consuming Grid Event
    const cellClickedListener = useCallback(event => {
        console.log('cellClicked', event);
    }, []);
    const onChange = (key) => {
        console.log(key);
    };

    // Example load data from sever
    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/row-data.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData.slice(0, 3)))
    }, []);
    return (
        <>
            <ToDoList />
            <PageHeader
                className="site-page-header"
                // onBack={() => null}
                title="Select a policy"
            />
            <Paragraph >{editableStr}</Paragraph>
            <div className="searchWrap">
                {/* <Search
                placeholder="input search text"
                className="desearch"
            /> */}
                <Input placeholder="Dashboad" prefix={<SearchOutlined />} />
                <div className="location">
                    <Button type="primary" style={{ margin: "5px" }} shape="circle" icon={<FilterOutlined />} />
                    <Button type="primary" shape="circle" icon={<SortAscendingOutlined />} />
                </div>

            </div>
            <span>  View By:</span>
            <Tabs onChange={onChange} type="card" style={{ marginTop: '24px' }} >
                <TabPane tab="Basic Information" key="1">
                    <div className="ag-theme-alpine" style={{ width: 603, height: 200 }}>
                        <AgGridReact
                            ref={gridRef} // Ref for accessing Grid's API
                            rowData={rowData} // Row Data for Rows
                            columnDefs={columnDefs} // Column Defs for Columns
                            defaultColDef={defaultColDef} // Default Column Properties
                            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                            rowSelection='multiple' // Options - allows click selection of rows
                            onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                        />
                    </div>
                </TabPane>
                <TabPane tab="Full Information" key="2">
                    Full Information
                </TabPane>
            </Tabs>

        </>
    )
}

export default FundTools
