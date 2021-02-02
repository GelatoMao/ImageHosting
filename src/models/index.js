import AV, { Query, User } from 'leancloud-storage'

AV.init({
  appId: "R72DS9VJcKpeUsAoilodYc67-9Nh9j0Va",
  appKey: "IFaaVRRCHQPkyw4g3VBwzD6T",
  serverURL: "https://r72ds9vj.lc-cn-e1-shared.com"
})

// 用户注册登录
const Auth = {
  register(username, password) {
    let user = new User()
    user.setUsername(username)
    user.setPassword(password)
    return new Promise((resolve, reject) => {
      user.signUp().then(loginUser => resolve(loginUser), error => reject(error))
    })
  },

  login(username, password) {
    return new Promise((resolve, reject) => {
      User.logIn(username, password).then(loginUser => resolve(loginUser), error => reject(error));
    })
  },

  logout() {
    User.logOut()
  },

  getCurrentUser() {
    return User.current()
  }

}


// 上传图片
const Uploader = {
  add(file, filename) {
    const item = new AV.Object('Image')
    const avFile = new AV.File(filename, file)
    item.set('filename', filename)
    item.set('owner', AV.User.current())
    item.set('url', avFile)
    return new Promise((resolve, reject) => {
      item.save().then(serverFile => resolve(serverFile), err => reject(err))
    })
  }
}
export { Auth, Uploader }