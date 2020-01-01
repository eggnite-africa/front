export const state = () => ({
  email: null,
  username: null,
  password: null,
  profilePicture: null,
  firstName: null,
  lastName: null,
  sex: null,
  birthdate: null,
  occupation: null,
  university: null,
  city: null,
  bio: null,
  socialMediaLinks: [],
  addLinks: false
})

export const mutations = {
  updateField(state, { field, value }) {
    state[field] = value
  },
  addSocialMediaLink(state, { link }) {
    state.socialMediaLinks.push(link)
  }
}
