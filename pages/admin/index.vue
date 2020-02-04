<template>
  <div>Admin area</div>
</template>

<script>
export default {
  name: 'AdminArea',
  middleware: ['auth', 'isAdmin']
}
</script>
