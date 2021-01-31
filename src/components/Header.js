import React from 'react'
import LogoUrl from './logo.svg'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 100px;
  background-color: #02101f;
`

const Logo = styled.img`
  height: 30px;
`

// 因为Link本身就是一个组件而不是标签 在组件上修改样式 需要将styled转成函数
const StyledLink = styled(NavLink)`
  color: #fff;
  margin-left: 30px;
  &.active{
    border-bottom: 1px solid #fff;
  }
`

function Component() {
  return (
    <Header>
      <Logo src={LogoUrl} />
      <nav>
        <StyledLink to="/" exact activeClassName="active">首页</StyledLink>
        <StyledLink to="/history" activeClassName="active">上传历史</StyledLink>
        <StyledLink to="/about" activeClassName="active">关于</StyledLink>
      </nav>
    </Header>
  )
}

export default Component