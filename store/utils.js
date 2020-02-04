export const state = () => ({
  welcomeBannerHidden: false,
  loginDialog: false
})

export const mutations = {
  setState(state, { key, value }) {
    state[key] = value
  },
  openLoginDialog(state) {
    if (!this.$auth.loggedIn) state.loginDialog = true
  }
}

export const actions = {
  async logout() {
    this.$router.push('/')
    return Promise.all([
      await this.$auth.logout('local'),
      await this.$apolloHelpers.onLogout()
    ])
  },
  async login(_, { username, password }) {
    await this.$auth
      .loginWith('local', {
        data: {
          username,
          password
        }
      })
      .then(async () => {
        const token = await this.$auth.$storage
          .getLocalStorage('_token.local')
          .split('Bearer ')[1]
        await this.$apolloHelpers.onLogin(token)
      })
  }
}
