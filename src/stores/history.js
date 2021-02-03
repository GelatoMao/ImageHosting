// 处理登录注册相关的状态和行为
import { observable, action, makeObservable } from 'mobx'
import { Uploader } from '../models'
import { message } from 'antd'

class HistoryStore {
  // 处理mobx6以上版本兼容导致渲染延时问题 
  constructor() {
    makeObservable(this)
  }

  // 属性
  @observable list = []
  @observable isLoading = false
  @observable hasMore = true
  limit = 10

  @action append(newList) {
    this.list = this.list.concat(newList)
  }

  @action find() {
    this.isLoading = true
    Uploader.find({ page: this.page, limit: this.limit })
      .then(newList => {
        this.append(newList)
        this.page++
        if (newList.length < this.limit) {
          this.hasMore = false
        }
      }).catch(error => {
        message.error('加载失败')
      }).finally(() => {
        this.isLoading = false
      })
  }

  @action reset() {
    this.list = []
    this.isLoading = false
    this.hasMore = true
    this.page = 0
  }

}

export default new HistoryStore()
