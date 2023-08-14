<template>
  <div>
    <v-container>
      <div>
        <v-btn depressed fab style="position: absolute; right: 10px; top: 10%" @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </div>
      <v-textarea ref="myTextarea" v-model="passport" clearable @keydown="extractData"
        @keyup.enter="showDialog"></v-textarea>
      <div class="d-flex">
        <v-btn class="primary mr-3" :loading="loading" @click="onSaveData">
          <v-icon left>mdi-content-save-outline</v-icon>
          SAVE
        </v-btn>
        <v-btn outlined color="primary" class="mr-3" to="/report">
          report
        </v-btn>
        <v-btn class="error" @click="onClearData">
          <v-icon left>mdi-restart</v-icon>

          CLEAR</v-btn>
      </div>
      <v-row class="mt-10">
        <v-col v-for="(item, index) in Object.keys(data)" :key="index" cols="12" md="3" sm="6">
          <v-text-field v-model="data[item]" :label="item" :value="data[item]"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      plusEnter: 0,
      dialog: false,
      loading: false,
      empty: null,
      passport: '',
      data: {},
      items: [],
    }
  },
  mounted() {
    this.$refs.myTextarea.focus()
  },
  watch: {
    passport(value) {
      if (!value) {
        this.passport = ''
        this.data = {}
      }
      if (!value?.replace(/(^[ \t]*\n)/gm, '')) {
        this.data = {}
      }
    },
  },
  methods: {
    mrzParseTwoLine(line1, line2) {
      const parseResultInfo = ['']
      let passportMRZ = {}
      let type = line1.substring(0, 1)
      if (!/[I|P|V]/.test(type)) return false
      if (type === 'P') {
        passportMRZ.type = 'PASSPORT (TD-3)'
      } else if (type === 'V') {
        if (line1.length === 44) {
          passportMRZ.type = 'VISA (MRV-A)'
        } else if (line1.length === 36) {
          passportMRZ.type = 'VISA (MRV-B)'
        }
      } else if (type === 'I') {
        passportMRZ.type = 'ID CARD (TD-2)'
      }
      // Get issuing State infomation
      let nation = line1.substring(2, 5)
      if (/[0-9]/.test(nation)) return false
      if (nation[nation.length - 1] === '<') {
        nation = nation.substr(0, 2)
      }
      passportMRZ.nationality = nation
      // Get surname information
      line1 = line1.substring(5)
      var pos = line1.indexOf('<<')
      let surName = line1.substring(0, pos)
      if (/[0-9]/.test(surName)) return false
      surName = surName.replace(/\</g, ' ')
      passportMRZ.surname = surName
      // Get givenname information
      let givenName = line1.substring(surName.length + 2)
      if (/[0-9]/.test(givenName)) return false
      givenName = givenName.replace(/\</g, ' ')
      givenName = givenName.trim()
      passportMRZ.givenname = givenName
      // Get passport number information
      let passportNumber
      passportNumber = line2.substring(0, 9)
      passportNumber = passportNumber.replace(/\</g, ' ')
      passportMRZ.passportnumber = passportNumber
      // Get Nationality information
      let issueCountry = line2.substr(10, 3)
      if (/[0-9]/.test(issueCountry)) return false
      if (issueCountry[issueCountry.length - 1] == '<') {
        issueCountry = issueCountry.substr(0, 2)
      }
      passportMRZ.issuecountry = issueCountry
      // Get date of birth information
      let birth = line2.substr(13, 6)
      let date = new Date()
      let currentYear = date.getFullYear()
      if (parseInt(birth.substr(0, 2)) > currentYear % 100) {
        birth = '19' + birth
      } else {
        birth = '20' + birth
      }
      birth = birth.slice(0, 4) + '-' + birth.slice(4, 6) + '-' + birth.slice(6)
      if (/[A-Za-z]/.test(birth)) return false
      passportMRZ.birth = birth
      // Get gender information
      let gender = line2[20]
      if (!/[M|F|x|<]/.test(gender)) return false
      passportMRZ.gender = gender
      // Get date of expiry information
      let expiry = line2.substr(21, 6)
      if (/[A-Za-z]/.test(expiry)) return falseœ
      if (parseInt(expiry.substring(0, 2)) >= 60) {
        expiry = '19' + expiry
      } else {
        expiry = '20' + expiry
      }
      expiry =
        expiry.slice(0, 4) + '-' + expiry.slice(4, 6) + '-' + expiry.slice(6)
      passportMRZ.expiry = expiry
      parseResultInfo.splice(0, parseResultInfo.length)
      for (let i in passportMRZ) {
        parseResultInfo.push(passportMRZ[i])
      }
      return passportMRZ
    },

    mrzParseThreeLine(line1, line2, line3) {
      const parseResultInfo = ['']
      let passportMRZ = {}
      let type = line1.substring(0, 1)
      if (!/[I|P|V]/.test(type)) return false
      passportMRZ.type = 'ID CARD (TD-1)'
      // Get nationality infomation
      let nation = line2.substring(15, 18)
      if (/[0-9]/.test(nation)) return false
      nation = nation.replace(/\</g, '')
      passportMRZ.nationality = nation
      // Get surname information
      var pos = line3.indexOf('<<')
      let surName = line3.substring(0, pos)
      if (/[0-9]/.test(surName)) return false
      surName = surName.replace(/\</g, ' ')
      passportMRZ.surname = surName
      // Get givenname information
      let givenName = line3.substring(surName.length + 2)
      if (/[0-9]/.test(givenName)) return false
      givenName = givenName.replace(/\</g, ' ')
      givenName = givenName.trim()
      passportMRZ.givenname = givenName
      // Get passport number information
      let passportNumber
      passportNumber = line1.substring(5, 14)
      passportNumber = passportNumber.replace(/\</g, ' ')
      passportMRZ.passportnumber = passportNumber
      // Get issuing country or organization information
      let issueCountry = line1.substring(2, 5)
      if (/[0-9]/.test(issueCountry)) return false
      issueCountry = issueCountry.replace(/\</g, '')
      passportMRZ.issuecountry = issueCountry
      // console.log(issueCountry)
      // Get date of birth information
      let birth = line2.substring(0, 6)
      if (/[A-Za-z]/.test(birth)) return false
      let date = new Date()
      let currentYear = date.getFullYear()
      if (parseInt(birth.substr(0, 2)) > currentYear % 100) {
        birth = '19' + birth
      } else {
        birth = '20' + birth
      }
      birth = birth.slice(0, 4) + '-' + birth.slice(4, 6) + '-' + birth.slice(6)
      passportMRZ.birth = birth
      // Get gender information
      let gender = line2[7]
      if (!/[M|F|X|<]/.test(gender)) return false
      gender = gender.replace('<', 'X')
      passportMRZ.gender = gender
      // Get date of expiry information
      let expiry = '20' + line2.substring(8, 14)
      if (/[A-Za-z]/.test(expiry)) return false
      expiry =
        expiry.slice(0, 4) + '-' + expiry.slice(4, 6) + '-' + expiry.slice(6)
      passportMRZ.expiry = expiry
      parseResultInfo.splice(0, parseResultInfo.length)
      for (let i in passportMRZ) {
        parseResultInfo.push(passportMRZ[i])
      }
      return passportMRZ
    },
    extractData() {
      const lines = this.passport.split('\n')
      if (lines.length >= 2) {
        const response = this.mrzParseTwoLine(lines[0], lines[1])
        this.data = { ...response }
      }
    },
    async save() {
      try {
        const response = await fetch('http://localhost:4000/machine')
        const ip = await response.json()
        this.users = ip
      } catch (error) {
        console.error(error)
      }
    },

    async saveinformation() {
      try {
        await fetch('http://localhost:4000/machine', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        })
        this.save()
      } catch (error) {
        console.error(error)
      }
    },
    async onSaveData() {
      if (this.password === null && this.password === '') {
        return alert('scan password before!')
      }
      this.loading = true
      await this.$axios
        .$post('/machine', {
          detail: this.passport,
          passport_type: this.data.type,
          first_name: this.data.surname,
          last_name: this.data.givenname,
          gender: this.data.gender,
          nationality: this.data.nationality,
          birthday: this.data.birth,
          issue_country: this.data.issuecountry,
          passport_number: this.data.passportnumber,
          expired_date: this.data.expiry,
        })
        .then((data) => {
          this.$toast.success('insert success')
          this.loading = false
          this.data = {}
          this.passport = ''
          this.plusEnter = 0
          this.$refs.myTextarea.focus()
          this.dialog = false
        })
    },
    onGetData() {
      this.$axios.$get('/machine').then((data) => {
        this.items = data
      })
    },
    onClearData() {
      this.plusEnter = 0
      this.data = {}
      this.passport = ''
      this.$refs.myTextarea.focus()
    },
    showDialog() {
      if (this.passport?.replace(/(^[ \t]*\n)/gm, '')) {
        this.plusEnter = this.plusEnter + 1
        if (this.plusEnter === 4) {
          this.onSaveData()
        }
      } else {
        this.passport = ''
      }
    },
  },
}
</script>
