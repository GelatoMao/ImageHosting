// 存储用户信息
import { observable, action, makeObservable } from 'mobx'
import { Auth } from '../models'


class UserStore {
  // 处理mobx6以上版本兼容导致渲染延时问题
  constructor() {
    makeObservable(this)
  }

  @observable currentUser = null

  @action pullUser() {
    this.currentUser = Auth.getCurrentUser()
  }

  @action resetUser() {
    this.currentUser = null
  }

}

export default new UserStore()
