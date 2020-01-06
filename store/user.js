export const state = () => ({
  email: null,
  username: null,
  password: null,
  profilePicture: null,
  firstName: null,
  lastName: null,
  sex: null,
  birthdate: '1999',
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
  submitSocialMediaLink(state, link) {
    const links = [...state.socialMediaLinks]
    const linkIndex = links.findIndex(({ media }) => media === link.media)

    if (linkIndex === -1) {
      links.push(link)
    } else {
      links[linkIndex] = link
    }
    state.socialMediaLinks = [...links]
  }
}
