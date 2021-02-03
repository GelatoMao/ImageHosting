// 用于管理上传图片的数据
import { observable, action, makeObservable } from 'mobx'
import { Uploader } from '../models'
import { message } from 'antd'

class ImageStore {
  // 处理mobx6以上版本兼容导致渲染延时问题 
  constructor() {
    makeObservable(this)
  }

  // 属性
  @observable filename = ""
  @observable file = null
  @observable isLoading = false
  @observable serverFile = null

  @action setFilename(newFilename) {
    this.filename = newFilename
  }

  @action setFile(newFile) {
    this.file = newFile
  }

  @action upload() {
    this.isLoading = true
    // 每次上传的时候设置serverFile为null 防止上传图片的过程中展示的还是上次的图片
    this.serverFile = null
    return new Promise((resolve, reject) => {
      Uploader.add(this.file, this.filename).then(serverFile => {
        this.serverFile = serverFile
        resolve(serverFile)
      }).catch(err => {
        message.error('上传失败')
        reject(err)
      }).finally(() => {
        this.isLoading = false
      })
    })
  }

  @action reset() {
    this.isLoading = false
    this.serverFile = null
  }
}

export default new ImageStore()
