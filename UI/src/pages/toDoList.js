import { SnippetsOutlined, } from '@ant-design/icons'
import { Button, Card, Checkbox, Col, Form, Input, Modal, } from 'antd'
import React, { useState } from 'react'

const ToDoList = () => {
	const [count, setCount] = useState(0)
	const [toDoList, setToDoList] = useState([])
	const [form] = Form.useForm()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const showModal = () => setIsModalVisible(true)

	const handleCancel = () => {
		setIsModalVisible(false)
		form.resetFields()
	}

	const handleOk = () => {
		form.submit()
	}

	const onFinish = (newTask) => {
		const task = { id: Math.random(12), ...newTask, isCompleted: true }
		setToDoList([...toDoList, task])
		setIsModalVisible(false)
		handleCancel()
	}

	const handleChange = (event, id) => {
		toDoList.map((item) => {
			if (item.id === id) {
				setToDoList(toDoList.map((item) => {
					if (item.id === id) {
						item.isCompleted = !item.isCompleted
					}
					return item
				}))
				if (item.isCompleted) {
					setCount(count - 1)
				} else {
					setCount(count + 1)
				}
			}
		})
	}

	return (
		<>
			<Card style={{
				width: 986, borderRadius: '15px',
				marginbottom: '15px', border: '1.5px solid', marginTop: '25px'
			}}>
				<div style={{
					display: 'flex', height: "40px", alignItems: "center",
					borderRadius: "5px",
				}} >
					<h1 style={{ color: 'green', fontSize: "30px" }}><SnippetsOutlined style={{ color: 'green', fontSize: "30px" }} /> Task </h1>
					<Col>
						<div style={{
							display: 'flex', height: "40px", alignItems: "center",
							borderRadius: "5px",
						}} >
							<div style={{
								width: "auto", backgroundColor: 'transparent',
							}}  >
								<Button type="primary" onClick={showModal} style={{
									marginBottom: "10px", marginLeft: "20px",
								}}>
									Add Task
								</Button>

								<Modal
									title="Add Task"
									visible={isModalVisible}
									onOk={handleOk}
									onCancel={handleCancel}
									footer={[
										<Button key="back" onClick={handleCancel}>
											Cancel
										</Button>,
										<Button key="submit" type="primary" onClick={handleOk}>
											Submit
										</Button>,
									]}
								>
									<Form labelCol={{ xs: { span: 6 } }} wrapperCol={{ xs: { span: 12 } }} form={form} onFinish={(e) => onFinish(e)} scrollToFirstError>
										<Form.Item name="title" label="Title" rules={[{ required: true, message: "This field is required." }]}>
											<Input />
										</Form.Item>
									</Form>
								</Modal>
							</div>
						</div>
					</Col>

				</div>
				{/* <div style={{
					width: "auto", backgroundColor: '#f5f5f5', display: 'flex', height: "60px", alignItems: "center",
					borderRadius: "5px"
				}} >
					<div style={{
						marginLeft: '10px', fontSize: '20px', fontWeight: 'bold',
						display: "flex",
						gap: '10px'
					}}>
						<SnippetsOutlined />
						<BellOutlined />
						<InteractionOutlined />
					</div>
				</div> */}
				<div style={{
					width: "auto", display: 'flex',
				}}>
					<div style={{ width: '50%' }}>
						<div>Pending ({toDoList.length - count})</div>

						{toDoList.map((item, index) => {
							return (item.isCompleted && <div style={{
								width: "50%", display: 'flex', flexDirection: "column", height: "20px",
								borderRadius: "5px", marginTop: '15px'
							}} key={index}>
								<Checkbox style={{
									height: '35px', marginLeft: '10px'
								}} onChange={(e) => handleChange(e, item.id)}>{item.title}</Checkbox>

							</div>)
						})}
					</div>
					<div style={{ width: '50%' }}>
						<div>Completed ({count})</div>
						{toDoList.map((item, index) => {
							return (item.isCompleted === false && <div style={{
								width: "50%", display: 'flex', flexDirection: "column", height: "20px",
								borderRadius: "5px", marginTop: '15px',
							}} key={index} >
								<Checkbox style={{
									height: '35px', marginLeft: '10px', textDecoration: 'line-through'
								}} onChange={(e) => handleChange(e, item.id)} checked={true}
								>{item.title}</Checkbox>
							</div>)
						})}
					</div>
				</div>
			</Card>
		</>
	)
}

export default ToDoList
