<template>
  <div
    class="d-flex justify-center align-center"
    style="
      height: 100vh;
      background-image: url('');
      background-size: cover;
      background-position: center;
    "
  >
    <div class="text-center" style="margin-top: -200px">
      <v-icon size="180">mdi-police-badge</v-icon>
      <div>
        <div class="text-center">
          <v-text-field label="USER NAME" v-model="USERNAME"></v-text-field>
        </div>
        <div>
          <v-text-field
            label="PASSWORD"
            type="password"
            name="password"
            v-model="PASSWORD"
          ></v-text-field>
        </div>

        <div>
          <v-btn class="grey darken-1" style="width: 300px" @click="login"
            >Sign in</v-btn
          >
        </div>
        <div class="my-16"><a href="/create">Create an account</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios' // Import the axios library

export default {
  data() {
    return {
      USERNAME: '',
      PASSWORD: '',
    }
  },
  layout: 'blank',
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:4000/user/login', {
          username: this.USERNAME,
          password: this.PASSWORD,
        })
        if (response.data && response.data.id) {
           this.$cookies.set('token', response.data.username)
          this.$router.push('/mode')
        } else {
          console.log('Login failed: Invalid username or password')
        }
      } catch (error) {
        console.error('An error occurred during login: ', error)
      }
    },
  },
}
</script>
