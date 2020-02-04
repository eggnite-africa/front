export default function({ params, store, redirect, route }) {
  const name = params.name.replace(/-/gi, ' ')
  const user = store.$auth.user
  const userProducts = user.products.map((p) => p.name)
  const isAdmin = user.type === 'ADMIN'
  const isOwner = isAdmin || userProducts.includes(name)
  const redirectRoute = route.path.replace('/edit', '')
  if (!isOwner) redirect(redirectRoute)
}
