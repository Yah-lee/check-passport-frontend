<template>
  <div>
    <v-container>
      <div class="text-center text-h1 my-16">
        LPB
        <div class="my-16">
          <v-row justify="center">
            <v-col cols="3">
              <div class="text-center">
                <v-btn class="" to="/machine" style="height: 200px" block
                  >machine-readable passport</v-btn
                >
              </div>
            </v-col>
            <v-col cols="3">
              <div class="text-center">
                <v-btn class="" to="/manual" style="height: 200px" block
                  >manual</v-btn
                >
              </div>
            </v-col>
            <v-col cols="3">
              <div class="text-center">
                <v-btn class="" to="/createUser" style="height: 200px" block
                  >Create User</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
middleware: 'auth'
</script>
