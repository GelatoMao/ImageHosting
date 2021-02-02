import React from 'react'
import styled from 'styled-components'
import { useStores } from '../stores'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button } from 'antd'

const Wrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.2);
  border-radius: 4px;
  padding: 20px;
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
}

const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16,
  },
}

const ComponentRegister = () => {

  const { AuthStore } = useStores()
  const history = useHistory()

  const onFinish = (values) => {
    AuthStore.setUsername(values.username)
    AuthStore.setPassword(values.password)
    AuthStore.register().then(() => {
      console.log('注册成功，跳转到首页')
      history.push('/')
    }).catch(() => {
      console.log('注册失败')
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  // rule本身规则 value用户输入
  const validateUsername = (rule, value) => {
    if (/\W/.test(value)) return Promise.reject('只能是数字字母下划线')
    if (value.length < 4 || value.length > 10) return Promise.reject('长度为4到10个字符')
    return Promise.resolve()
  }

  // 返回的是一个对象
  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(rule, value) {
      if (getFieldValue('password') === value) return Promise.resolve()
      return Promise.reject('两次密码不一致')
    }
  })

  return (
    <Wrapper>
      <Title>春田花花图床注册</Title>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名！',
            },
            {
              validator: validateUsername
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
            {
              min: 4,
              message: '最少4个字符'
            },
            {
              max: 10,
              message: '最大10个字符'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: '请确认密码!',
            },
            validateConfirmPassword
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            注册
        </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default ComponentRegister
