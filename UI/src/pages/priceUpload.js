import React, { useMemo, useState } from 'react'
import {
	Card,
	Checkbox,
	DatePicker,
	Form,
	Input,
	InputNumber,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import ToDoList from './toDoList';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const columnDefs = [
	{ field: 'Mit', type: 'dimension', cellRenderer: productCellRenderer },
	{ field: 'Code', type: 'dimension', cellRenderer: productCellRenderer },
	{ field: 'CurrencyCode', type: 'dimension', cellRenderer: productCellRenderer },
	{ field: 'Subscription', type: 'dimension', cellRenderer: productCellRenderer },
	{ field: 'Redemption', type: 'dimension', cellRenderer: productCellRenderer },
	{ field: 'Expense', type: 'dimension', cellRenderer: productCellRenderer },
	{ field: 'Net', type: 'dimension', cellRenderer: productCellRenderer },
]

const rowData = [
	{
		Mit: 'Tohn Brown',
		Code: 'as',
		CurrencyCode: 'FDF',
		Subscription: 78,
		Redemption: 45,
		Expense: '$1,565',
		Net: 10
	},
	{
		Mit: 'Vim Green',
		Code: 'fg',
		CurrencyCode: 'ADS',
		Subscription: 28,
		Redemption: 42,
		Expense: '$1,423',
		Net: 12
	},
	{
		Mit: 'Koe Black',
		Code: 'hg',
		CurrencyCode: 'WEW',
		Subscription: 18,
		Redemption: 41,
		Expense: '$1,767',
		Net: 11
	},
	{
		Mit: 'Woe Black',
		Code: 'jh',
		CurrencyCode: 'HHF',
		Subscription: 79,
		Redemption: 49,
		Expense: '$1,654',
		Net: 19
	},
	{
		Mit: 'Tohn Brown',
		Code: 'as',
		CurrencyCode: 'FDF',
		Subscription: 78,
		Redemption: 45,
		Expense: '$1,565',
		Net: 10
	},
	{
		Mit: 'Tisabled User',
		Code: 'kk',
		CurrencyCode: 'AS',
		Subscription: 77,
		Redemption: 41,
		Expense: '$1,342',
		Net: 15
	},
	{
		Mit: 'John Brown',
		Code: 'vc',
		CurrencyCode: 'FE',
		Subscription: 32,
		Redemption: 12,
		Expense: '$1,767',
		Net: 17
	},
	{
		Mit: 'Joe Black',
		Code: 'nb',
		CurrencyCode: 'USD',
		Subscription: 54,
		Redemption: 42,
		Expense: '$1,256',
		Net: 87
	},
];

function numberParser(params) {
	return parseInt(params.newValue);
}

function productCellRenderer(params) {
	if (params.value === undefined || params.value === null) {
		return null;
	} else {
		return (
			<React.Fragment>
				{params.value}
			</React.Fragment>
		);
	}
}

const PriceUpload = () => {
	const [componentSize, setComponentSize] = useState('default');
	const [componentDisabled, setComponentDisabled] = useState(true);

	const onFormLayoutChange = ({ size, disabled }) => {
		setComponentSize(size);
		setComponentDisabled(disabled);
	};

	const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);

	const defaultColDef = useMemo(() => {
		return {
			sortable: true,
			resizable: true,
			filter: true,
			minWidth: 120,
			flex: 1,
		};
	}, []);

	const columnTypes = useMemo(() => {
		return {
			numberValue: {
				enableValue: true,
				aggFunc: 'sum',
				editable: true,
				valueParser: numberParser,
			},
			dimension: {
				enableRowGroup: true,
				enablePivot: true,
			},
		};
	}, []);

	return (
		<>
			<ToDoList />
			<Card style={{
				width: 1000, borderRadius: '15px',
				marginbottom: '15px', border: '1.5px solid', marginTop: '25px'
			}}>
				<ul style={{
					marginTop: "5px", fontSize: "22px",
				}}>
					<li>Price Upload</li>
				</ul>
				<Form
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 14 }}
					layout="horizontal"
					initialValues={{ size: componentSize }}
					onValuesChange={onFormLayoutChange}
					size={componentSize}
				>

					<Form.Item label="ISIN">
						<Input />
					</Form.Item>
					<Form.Item label="Fund name">
						<Input />
					</Form.Item>
					<Form.Item label="Price" >
						<InputNumber style={{
							width: "100%",
						}} />
					</Form.Item>
					<Form.Item label="Price date">
						<DatePicker style={{
							width: "100%",
						}} />
					</Form.Item>
					<Checkbox
						style={{
							marginLeft: "160px",
						}}
						checked={componentDisabled}
						onChange={(e) => setComponentDisabled(e.target.checked)}
					>
						Is available
					</Checkbox>
					<Dragger style={{
						marginTop: "10px", width: "550px", height: "35px",
						marginLeft: "160px",
					}}>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">Click or drag file to this area to upload</p>
					</Dragger>
					<div className="grid-wrapper">
						<div style={containerStyle}>
							<div style={{ height: 345, width: '100%', marginTop: '35px' }} className="ag-theme-alpine" >
								<AgGridReact
									rowData={rowData}
									columnDefs={columnDefs}
									defaultColDef={defaultColDef}
									columnTypes={columnTypes}
									groupDefaultExpanded={-1}
									rowGroupPanelShow={'always'}
									animateRows={true}
								></AgGridReact>
							</div>
						</div>
					</div>
				</Form>
			</Card>
		</>
	);
}

export default PriceUpload


