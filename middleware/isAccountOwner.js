export default function({ params, store, redirect }) {
  if (params.username !== store.$auth.user.username) redirect('/')
}
