<template>
  <div></div>
</template>

<script>
export default {
  middleware: [
    'auth',
    'isAccountOwner',
    ({ store, redirect }) => {
      if (store.$auth.user)
        redirect(`/u/${store.$auth.user.username}/settings/account`)
      else redirect('/')
    }
  ],
  head() {
    return {
      meta: [
        {
          name: 'robots',
          content: 'noindex,nofollow'
        }
      ]
    }
  }
}
</script>
