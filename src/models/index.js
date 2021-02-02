import AV, { Query, User } from 'leancloud-storage'

AV.init({
  appId: "R72DS9VJcKpeUsAoilodYc67-9Nh9j0Va",
  appKey: "IFaaVRRCHQPkyw4g3VBwzD6T",
  serverURL: "https://r72ds9vj.lc-cn-e1-shared.com"
})

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

export { Auth }