<template>
  <div>
    <v-container>
      <div>
        <a href="/mode"
          ><v-icon size="100" class="" style="margin-left: 100%"
            >mdi-arrow-left-thick</v-icon
          ></a
        >
      </div>
      <div class="my-16"><v-textarea v-model="passport"></v-textarea></div>
      <div><v-btn class="pink" @click="onSaveData"> SAVE </v-btn></div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      passport: '',
    }
  },
  methods: {
    onSaveData() {
      this.$axios.$post('/machine', {
        detail: this.passport,
      })
    },
  },
}
</script>
