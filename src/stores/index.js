import React, { createContext, useContext } from 'react'
import AuthStore from './auth'
import UserStore from './user'

const context = createContext({
  AuthStore,
  UserStore
})

// 调用useStores方法 就会解构出context中的东西
export const useStores = () => useContext(context)