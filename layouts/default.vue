<template>
  <v-app light>
    <v-container>
      <a href="#">
        <div>
          <v-icon size="50" style="margin-left: 100%" @click="logout">mdi-logout</v-icon>
        </div>
      </a>
    </v-container>
    <Nuxt />
  </v-app>
</template>
<script>
export default {
  middleware: "unAuth",

  methods: {
    logout() {
      this.$cookies.remove("token");
      this.$router.push("/login");
    },
  },
};
</script>
