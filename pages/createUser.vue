<template>
  <div>
    <div>
      <v-btn
        depressed
        fab
        style="position: absolute; right: 10px; top: 10%"
        @click="$router.go(-1)"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
    <v-card flat max-width="450" class="mx-auto">
      <v-card-title>Create a user</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.username"
              label="Username"
              dense
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.password"
              label="Password"
              type="password"
              dense
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-btn color="primary" @click="onCreateUser">Create</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
    }
  },
  methods: {
    onCreateUser() {
      this.$axios.post('http://localhost:4000/user', this.form).then((data) => {
        this.$toast.success('User created successful')
        this.form.username = null
        this.form.password = null
      })
    },
  },
}
</script>
