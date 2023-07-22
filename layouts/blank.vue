<template>
  <v-app light>
    <Nuxt />
  </v-app>
</template>
<script>
export default {
  middleware: 'auth',
}
</script>
