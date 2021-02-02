import React, { createContext, useContext } from 'react'
import AuthStore from './auth'
import UserStore from './user'
import ImageStore from './image'

const context = createContext({
  AuthStore,
  UserStore,
  ImageStore
})

window.store = {
  AuthStore,
  UserStore,
  ImageStore
}

// 调用useStores方法 就会解构出context中的东西
export const useStores = () => useContext(context)