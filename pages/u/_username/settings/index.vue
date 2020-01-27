<template>
  <div></div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    if (store.$auth.user)
      redirect(`/u/${store.$auth.user.username}/settings/account`)
    else redirect('/')
  }
}
</script>
