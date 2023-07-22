<template>
  <div>
    <v-container>
      <div class="text-center text-h1 my-16">
        Mode
        <div class="my-16">
          <v-row>
            <v-col cols="6">
              <div class="text-center">
                <v-btn class="" to="/machine" style="width: 380px; height: 200px"
                  >machine-readable passport</v-btn
                >
              </div>
            </v-col>
            <v-col cols="6">
              <div class="text-center">
                <v-btn class="" to="/manual" style="width: 380px; height: 200px">manual</v-btn>
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
