<template>
  <v-container>
    <div>
      <h1>Test Usre</h1>
      <div></div>
      <v-text-field v-model="username" label="username"></v-text-field>
      <v-text-field v-model="password" label="password"></v-text-field>
      <v-text-field v-model="fullname" label="fullname"></v-text-field>
      <v-btn @click="createUser">Insert</v-btn>
      <div>
        <div v-for="item in users" :key="item.id" class="red mb-4">
          {{ item.username }}
          <div>{{ item.password }}</div>
          <div>{{ item.fullname }}</div>
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      users: [],
      username: '',
      password: '',
      fullname: '',
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser() {
      const ip = await this.$axios.$get('http://localhost:4000/users')
      this.users = ip
    },
    async createUser() {
      await this.$axios.$post('http://localhost:4000/users', {
        username: this.username,
        password: this.password,
        fullname: this.fullname,
      })
      this.getUser()
      this.username = ''
      this.password = ''
      this.fullname = ''

    },
  },
}
</script>
