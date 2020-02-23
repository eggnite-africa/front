export const state = () => ({
  welcomeBannerHidden: false,
  loginDialog: false,
  joinDialog: false
})

export const mutations = {
  setState(state, { key, value }) {
    state[key] = value
  },
  openLoginDialog(state) {
    if (!this.$auth.loggedIn) state.loginDialog = true
    state.joinDialog = false
  },
  openJoinDialog(state) {
    state.loginDialog = false
    state.joinDialog = true
  }
}

export const actions = {
  async logout(state) {
    this.$router.push('/')
    await this.$auth.logout('local')
    await this.$apolloHelpers.onLogout()
  },
  async login(state, { username, password }) {
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
  },
  async uploadImage(state, file) {
    let link = ''
    const { signedUrl, url } = await this.$axios.$post('/sign-s3', {
      fileType: file.type
    })
    await fetch(signedUrl, {
      body: file,
      method: 'put'
    })
      .then(() => (link = url))
      .catch((e) => {
        throw new Error(e)
      })
    return link
  },
  async removeImage(state, link) {
    try {
      await this.$axios.$post('/delete-image', { link })
    } catch (e) {
      throw new Error('There was a problem deleting the image. please LMK!')
    }
  }
}
