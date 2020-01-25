<template>
  <div></div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    return redirect(`/u/${store.$auth.user.username}/settings/account`)
  }
}
</script>
