export default function({ params, store, redirect }) {
  const user = store.$auth.user
  const isAdmin = user.type === 'ADMIN'
  const isOwner = isAdmin || params.username === user.username
  if (!isOwner) redirect('/')
}
