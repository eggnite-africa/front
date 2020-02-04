export default function({ store, redirect }) {
  const isAdmin = store.$auth.user.type === 'ADMIN'
  if (!isAdmin) redirect('/')
}
