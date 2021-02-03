import React, { createContext, useContext } from 'react'
import AuthStore from './auth'
import UserStore from './user'
import ImageStore from './image'
import HistoryStore from './history'

const context = createContext({
  AuthStore,
  UserStore,
  ImageStore,
  HistoryStore
})

window.store = {
  AuthStore,
  UserStore,
  ImageStore
}

// 调用useStores方法 就会解构出context中的东西
export const useStores = () => useContext(context)