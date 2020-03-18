export default function({ params, store, redirect, route }) {
  const id = +params.id
  const user = store.$auth.user
  const userPitchs = user.pitch.map((p) => p.id)
  const isAdmin = user.type === 'ADMIN'
  const isOwner = isAdmin || userPitchs.includes(id)
  const redirectRoute = route.path.replace('/edit', '')
  if (!isOwner) redirect(redirectRoute)
}
