<template>
  <div>
    <v-container>
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
      <div>
        <v-textarea
          v-model="passport"
          ref="myTextarea"
          clearable
          @keyup.enter="onEnter"
        ></v-textarea>
      </div>
      <div>
        <v-btn color="primary" @click="onSaveData">
          <v-icon left>mdi-content-save-outline</v-icon>

          SAVE
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      passport: '',
      enterCounting: 0,
    }
  },
  mounted() {
    this.$refs.myTextarea.focus()
  },
  methods: {
    onSaveData() {
      console.log('hiiiiii')
      this.$axios
        .$post('/machine', {
          detail: this.passport,
        })
        .then((res) => {
          this.$toast.success('Insert successful')
          this.passport = null
          this.$refs.myTextarea.focus()
        })
    },
    onEnter(e) {
      if (this.passport?.replace(/(^[ \t]*\n)/gm, '')) {
        if (this.enterCounting >= 3) {
          // this.onSaveData()
          this.enterCounting = 0
          this.passport = null
          this.$toast.success('Insert successful')
          this.$refs.myTextarea.focus()
          return
        }
        this.enterCounting++
      } else {
        this.passport = null
        this.$refs.myTextarea.focus()
      }
    },
  },
}
</script>
