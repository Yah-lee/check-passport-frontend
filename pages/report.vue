<template>
  <v-container>
    <div>
      <!-- back -->
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
      <v-card flat>
        <v-card-title>Report</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="filters.startDate"
                label="Start date"
                type="date"
                dense
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="filters.endDate"
                label="End date"
                type="date"
                dense
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="filters.detail"
                label="Search detail"
                dense
                hide-details="auto"
                clearable
                @keyup.enter="getReport"
              ></v-text-field>
            </v-col>
            <v-col cols="auto" class="d-flex align-center">
              <v-btn color="primary" @click="getReport">
                <v-icon left>mdi-magnify</v-icon>
                Search</v-btn
              >
              <v-btn color="error" class="mx-3" @click="onReset">
                <v-icon left>mdi-restart</v-icon>

                Reset
              </v-btn>
              <download-excel :data="reports">
                <v-btn outlined>
                  <v-icon left>mdi-download</v-icon>
                  Download</v-btn
                >
              </download-excel>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-data-table :headers="headers" :items="reports" dense>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Report',
  data() {
    return {
      headers: [
        { text: 'detail', value: 'detail' },
        { text: 'passport_type', value: 'passport_type' },
        { text: 'first_name', value: 'first_name' },
        { text: 'last_name', value: 'last_name' },
        { text: 'gender', value: 'gender' },
        { text: 'nationality', value: 'nationality' },
        { text: 'birthday', value: 'birthday' },
        { text: 'issue_country', value: 'issue_country' },
        { text: 'passport_number', value: 'passport_number' },
        { text: 'expired_date', value: 'expired_date' },
      ],
      filters: {},
    }
  },
  computed: {
    reports() {
      return this.$store.state.report.report
    },
  },
  mounted() {
    this.filters.startDate = this.$moment().format('YYYY-MM-DD')
    this.filters.endDate = this.$moment().format('YYYY-MM-DD')

    this.getReport()
  },
  methods: {
    getReport() {
      this.$store.dispatch('report/getReport', this.filters)
    },
    onReset() {
      delete this.filters.detail
      this.getReport()
    },
  },
}
</script>
