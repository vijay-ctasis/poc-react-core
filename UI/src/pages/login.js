import { Button, Card, Checkbox, Form, Input, message } from 'antd'
import React from 'react'


const Login = () => {
	const data = (value) => {
		let username = 'senthil@gmail.com'
		let password = 'senthil@123'
		if (value.username === username && value.password === password) {
			return true
		} else {
			return false
		}
	}

	const onFinish = (values) => {
		const result = data(values)
		if (result === true) {
			message.success('Login Successfully')
			setTimeout(() => {
				window.location.href = '/'
			}, 1000)
		} else {
			message.error('Please enter valid username and password');
		}
	}

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Card style={{
			width: 500, borderRadius: '15px',
			marginbottom: '15px', border: '1.5px solid', marginTop: '25px', margin: '0 auto'
		}}>
			<Form
				name="basic"
				labelCol={{
					span: 8,
				}}
				wrapperCol={{
					span: 16,
				}}
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				style={{
					float: "left",
					marginLeft: "50px",
					marginTop: "20px",
				}}
			>
				<Form.Item
					label="Username"
					name="username"
					rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="remember"
					valuePropName="checked"
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Card>
	)
}

export default Login
