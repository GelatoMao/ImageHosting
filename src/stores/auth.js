// 处理登录注册相关的状态和行为
import { observable, action, makeObservable } from 'mobx'
import { Auth } from '../models'
import UserStore from './user'

class AuthStore {
  // 处理mobx6以上版本兼容导致渲染延时问题 
  constructor() {
    makeObservable(this)
  }

  // 属性
  @observable values = {
    username: '',
    password: ''
  };

  // 方法
  @action setUsername(username) {
    this.values.username = username
  }

  @action setPassword(password) {
    this.values.password = password
  }

  @action login() {
    return new Promise((resolve, reject) => {
      Auth.login(this.values.username, this.values.password)
        .then(user => {
          UserStore.pullUser()
          resolve(user)
        }).catch(err => {
          UserStore.resetUser()
          reject(err)
        })
    })
  }

  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password)
        .then(user => {
          UserStore.pullUser()
          resolve(user)
        }).catch((err) => {
          UserStore.resetUser()
          reject(err)
        })
    })
  }

  @action logout() {
    Auth.logout()
    UserStore.resetUser()
  }
}

export default new AuthStore()
