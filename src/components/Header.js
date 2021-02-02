import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'antd'
import { useStores } from '../stores'
import { observer } from 'mobx-react'
import LogoUrl from './logo.svg'

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 100px;
  background-color: #02101f;
  color: #fff;
`
const Logo = styled.img`
  height: 30px;
`
const Login = styled.div`
  margin-left: auto;
`

// 因为NavLink本身就是一个组件而不是标签 在组件上修改样式 需要将styled转成函数
const StyledLink = styled(NavLink)`
  color: #fff;
  margin-left: 30px;
  &.active{
    border-bottom: 1px solid #fff;
  }
`

const StyledButton = styled(Button)`
  margin-left: 10px;
`

const ComponentHeader = observer(() => {

  const { UserStore, AuthStore } = useStores()
  const history = useHistory()

  const handleLogin = () => {
    console.log('跳转到登录页面')
    history.push('/login')
  }

  const handleLogout = () => {
    AuthStore.logout()
  }

  const handleRegister = () => {
    console.log('跳转到注册页面')
    history.push('/register')
  }

  return (
    <Header>
      <Logo src={LogoUrl} />
      <nav>
        <StyledLink to="/" exact activeClassName="active">首页</StyledLink>
        <StyledLink to="/history" activeClassName="active">上传历史</StyledLink>
        <StyledLink to="/about" activeClassName="active">关于</StyledLink>
      </nav>
      <Login>
        {
          UserStore.currentUser ? <>{UserStore.currentUser.attributes.username}<StyledButton type="primary" onClick={handleLogout}>注销</StyledButton></> :
            <>
              <StyledButton type="primary" onClick={handleLogin}>登录</StyledButton>
              <StyledButton type="primary" onClick={handleRegister}>注册</StyledButton>
            </>
        }
      </Login>
    </Header>
  )
})


export default ComponentHeader