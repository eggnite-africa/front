export const state = () => ({
  name: '',
  tagline: '',
  description: '',
  logo: null,
  images: null,
  links: {
    website: 'test',
    github: '',
    appStore: '',
    googlePlay: ''
  },
  makers: null
})

export const mutations = {
  updateField(state, { field, value }) {
    state[field] = value
  },
  updateLink(state, { type, value }) {
    state.links[type] = value
  }
}
