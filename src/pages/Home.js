import React from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../stores'
import Uploader from '../components/Uploader'

const Home = observer(() => {
  const { UserStore } = useStores()
  const User = () => <>Hello {UserStore.currentUser.attributes.username}</>
  return (
    <>
      {
        UserStore.currentUser ? <User /> : "用户没有登录"
      }
      <Uploader />
    </>
  )
})

export default Home