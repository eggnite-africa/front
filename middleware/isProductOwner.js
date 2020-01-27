export default function({ params, store, redirect, route }) {
  const name = params.name.replace(/-/g, ' ')
  const userProducts = store.$auth.user.products.map((p) => p.name)
  const isProductOwner = userProducts.includes(name)
  const redirectRoute = route.path.replace('/edit', '')
  if (!isProductOwner) redirect(redirectRoute)
}
