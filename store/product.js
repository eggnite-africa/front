export const state = () => ({
  id: '',
  name: '',
  tagline: '',
  description: '',
  logo: '',
  pictures: [],
  makers: [],
  website: '',
  github: '',
  appStore: '',
  playStore: ''
})

export const mutations = {
  updateField(state, { fieldName, value }) {
    state[fieldName] = value
  }
}
