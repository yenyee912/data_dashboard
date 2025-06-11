<template>
  <div class="scan-page">
    <!-- <b-overlay> -->
    <div class="left-pane">
      <h1 class="heading-font">New Scan Entry</h1>
      <b-form class="details-font">
        <div class="text-row">
          <p class="details-font">Date Time</p>
          <p class="details-font-value">{{ currentTime }}</p>
        </div>
        <div class="text-row">
          <p class="details-font">Staff Name</p>
          <p class="details-font-value">{{ scan.staffName }} ({{ scan.staffId }})</p>
        </div>
        <div class="text-row">
          <p class="details-font">Scan Location</p>
          <p class="details-font-value">HQ</p>
        </div>

        <b-form-group class="location" label="Action*">
          <b-form-select class="col-lg-4" style="border-radius: 20px; padding-left: 15px; width: 300px;"
            :options="actionOptions" v-model="scan.action" size="md"></b-form-select>
          <p v-if="$v.scan.action.$error" style="color:red">
            Scan action required.
          </p>
        </b-form-group>

        <b-form-group class="location" label="Destination*" v-if="scan.action == 2">
          <b-form-select class="col-lg-4 drop-style" style="border-radius: 20px; padding-left: 15px; width: 300px;"
            v-model="scan.scanDestination" :options="locationOptions" size="md"></b-form-select>
          <p v-if="$v.scan.scanDestination.$error || destinationAlert != ''" style="color:red">
            Scan destination required.
          </p>
        </b-form-group>

        <hr style="margin-top: 50px;">

        <!-- scanner alert -->
        <h1 class="heading-font">Scanner</h1>
        <p class="details-font">Scan the QR code on seed packet.</p>
        <div sm=6 md=4>
          <b-alert variant="success" class="green-alert" :show="green.dismissCountDown"
            @dismissed="green.dismissCountDown = 0" @dismiss-count-down="greenCountDownChanged">{{ green.alert
            }}</b-alert>
          <b-alert variant="danger" class="red-alert" :show="red.dismissCountDown" @dismissed="red.dismissCountDown = 0"
            @dismiss-count-down="redCountDownChanged">{{ red.alert }}</b-alert>
          <b-alert variant="warning" class="yellow-alert" :show="yellow.dismissCountDown"
            @dismissed="yellow.dismissCountDown = 0" @dismiss-count-down="yellowCountDownChanged">{{ yellow.alert
            }}</b-alert>
        </div>

        <!--qr code scanner-->
        <div class="on-scanner mt-3" v-if="scannerAppear">
          <scanner-box @scan-item="handleScanData"></scanner-box>

          <!-- <qrcode-stream @init="loadCamera" @decode="decodeQR" :track="true" :paused="true">
            <div class="loading-indicator" v-if="loading">
              <p>Scanner Loading...</p>
            </div>
            </qrcode-stream> -->
        </div>

        <!--scanner off-->
        <div style="text-align: center; margin-top: 50px;">
          <span v-if="!scannerAppear">
            <div class="off-scanner text-row" style="height: 300px;">
              <p>Scanner is</p>
              <p>OFF</p>
            </div>
            <b-btn size="md" class="btn-success button-scan" @click.prevent="scannerAppear = !scannerAppear">ON</b-btn>
          </span>
          <span v-else>
            <b-btn size="md" class="btn-danger button-scan"
              @click.prevent="scannerAppear = !scannerAppear">OFF</b-btn></span>
        </div>
        <b-alert variant="danger" class="red-alert m-2" dismissible :show="scanFailAlert != ''">
          {{ scanFailAlert }}
        </b-alert>
      </b-form>
    </div>

    <div class="right-pane">
      <scan-item-list :item-scan-list="scan.scanList" @remove-item="removeRow"></scan-item-list>
    </div>

    <!-- </b-overlay> -->
  </div>

</template>

<script>
import axios from 'axios';
import { required, minValue } from "vuelidate/lib/validators";
import ScannerBox from "../../components/ScannerBox.vue"
import ScanItemList from '@/components/ScanItemList.vue';

export default {
  components: {
    ScannerBox,
    ScanItemList

  },
  data() {
    return {
      nowTime: new Date(),
      busy: true,
      loading: '',
      scannerAppear: false,

      locationOptions: [
        { value: 0, text: 'Please select a farm.' },
        { value: 1, text: 'to Farm A' },
        { value: 2, text: 'to Farm B' }
      ],
      actionOptions: [
        { value: 1, text: 'to HQ Inventory' },
        { value: 2, text: 'to Farm' },
      ],
      expYearOptions: [
        { value: '', text: 'Please select expiry year.' },
        { value: 2021, text: "2021" },
        { value: 2022, text: "2022" },
        { value: 2023, text: "2023" },
      ],
      scan: {
        staffEmail: JSON.parse(localStorage.user).user.email,
        staffName: JSON.parse(localStorage.user).user.name,
        staffId: JSON.parse(localStorage.user).user.id,
        scanLocation: 1,
        scanDestination: 0,
        action: 1,
        scanList: [
          { seedId: "wellgrow-14-400", cultivarId: 14, quantity: 2, seedRef: "WELLGROW SEEDS-Rocket(wellgrow-14-400)", expYear: 0 },
          { seedId: "wellgrow-24-120", cultivarId: 24, quantity: 5, seedRef: "WELLGROW SEEDS-Red Mizuna(wellgrow-24-120)", expYear: '' },
        ],
      },
      scanFailAlert: '',
      destinationAlert: '',
      red: {
        alert: '',
        dismissSecs: 3,
        dismissCountDown: 0,
        showDismissibleAlert: false,
      },

      green: {
        alert: '',
        dismissSecs: 3,
        dismissCountDown: 0,
        showDismissibleAlert: false,
      },

      yellow: {
        alert: '',
        dismissSecs: 3,
        dismissCountDown: 0,
        showDismissibleAlert: false,
      },

      seedOptions: [],
      cultivarOptions: [],

      cameraSettings: {
        facingMode: {
          ideal: 'none'
        }
      },
    }

  },

  computed: {
    currentTime() {
      return this.nowTime.toLocaleString();
    }

  },

  validations: {
    scan: {
      //scanLocation choosen
      scanDestination: { required },
      action: { required, minValue: minValue(1) },
      scanList: {
        required,
        $each: {
          seedId: { required },
          seedRef: { required },
          cultivarId: { required, minValue: minValue(1) },
          //0=no expYear selected, 1 is when scan action==2(scan-out)
          expYear: { required, minValue: minValue(1) },
          quantity: { required, minValue: minValue(1) }
        }
      }
    }
  },

  methods: {
    async callAPI() {
      this.busy = true
      // await this.today()
      // await this.getExpYear()
      // await this.getCultivar()
      // await this.getSeeds()
      // await this.getLocation()
      // await this.getAction()
      this.busy = false
    },

    handleScanData(x) {
      console.log(x)

    },


    greenCountDownChanged(a) {
      this.green.dismissCountDown = a
    },

    redCountDownChanged(b) {
      this.red.dismissCountDown = b
    },

    yellowCountDownChanged(c) {
      this.yellow.dismissCountDown = c
    },

    async getLocation() {
      const x = await axios.get(`${process.env.VUE_APP_ROOT_API}/locations`)
      try {
        let tempArr = x.data.data
        this.locationOptions.push({ value: 0, text: "Please select your destination." })
        for (let i = 2; i < tempArr.length; i++) {
          this.locationOptions.push({ value: tempArr[i].id, text: tempArr[i].location })
        }
      }
      catch (err) {
        console.log(err.message)
      }
    },

    async getAction() {
      const x = await axios.get(`${process.env.VUE_APP_ROOT_API}/seed_inventory/actions`)
      try {
        let tempArr = x.data.data
        this.actionOptions.push({ value: 0, text: "Please select your action." })
        this.actionOptions.push({ value: tempArr[1].id, text: tempArr[1].action })
        this.actionOptions.push({ value: tempArr[2].id, text: tempArr[2].action })
      }
      catch (err) {
        console.log(err.message)
      }
    },

    async checkInput() {
      if (this.scan.action == 2) {
        await this.bindExpYear(this.scan.scanList)

        // check destination  
        if (this.scan.scanDestination <= 1) {
          this.destinationAlert = 'Please select a destination.'
        }

        // if all no problem, vuelidate
        else {
          this.$v.scan.$touch();
          if (this.$v.$invalid)
            console.log('Validation fail. Please try again.')

          else
            await this.submitScanList()
        }
      }

      else if (this.scan.action == 1) {
        this.scan.scanDestination = 0
        this.$v.scan.$touch();
        if (this.$v.$invalid)
          console.log('Validation fail. Please try again.')
        else
          await this.submitScanList()
      }

      else {
        this.$v.scan.$touch();
        if (this.$v.$invalid)
          console.log('Validation fail. Please try again.')
        else
          await this.submitScanList()
      }

    },

    async submitScanList() {
      const x = await axios.post(`${process.env.VUE_APP_ROOT_API}/seed_inventory/scans/`, this.scan)
      try {
        // console.log(x.data)
        this.$router.push({
          name: 'NewScanEntry',
          params: { id: x.data.scanRecordEntry._id, msg: x.data }
        })
      }
      catch (err) {
        this.scanFailAlert = 'Server error. Please try again.'
        console.log(err.message, x)
      }
    },

    async loadCamera(promise) {
      this.loading = true

      try {
        await promise
      }

      catch (error) {
        console.error(error)
      }

      finally {
        this.loading = false
      }

    },

    decodeQR(decodedString) {
      let scannedItem = JSON.parse(decodedString)
      let exist = false;
      let valid = false;
      this.green.alert = ''
      this.yellow.alert = ''
      this.red.alert = ''

      if (decodedString) {
        //check is it valid?
        this.seedOptions.forEach(element => {
          if (scannedItem.id == element.seedId) {
            scannedItem.seedRef = `${element.brand}-${element.displayCultivar} (${element.seedId})`
            scannedItem.cultivarId = element.cultivarId
            valid = true
          }
        });

        if (valid == true) {
          //check exist
          if (this.scan.scanList.length > 0) {
            for (let i = 0; i < this.scan.scanList.length; i++) {
              if (this.scan.scanList[i].seedId == scannedItem.id) {
                exist = true
              }
            }

            if (exist == true) {
              this.yellow.alert = `${scannedItem.id} already added into list. Please fill in its quantity.`
              this.yellow.dismissCountDown = this.yellow.dismissSecs
            }

            else {
              this.scan.scanList.push({ seedId: scannedItem.id, cultivarId: scannedItem.cultivarId, quantity: 1, seedRef: scannedItem.seedRef, expYear: 0 })
              this.green.alert = `${scannedItem.id} added to list.`
              this.green.dismissCountDown = this.green.dismissSecs
            }

          }
          else {
            this.scan.scanList.push({ seedId: scannedItem.id, quantity: 1, cultivarId: scannedItem.cultivarId, seedRef: scannedItem.seedRef, expYear: 0 })
            this.green.alert = `${scannedItem.id} added to list.`
            this.green.dismissCountDown = this.green.dismissSecs

          }

        }

        else {
          this.red.alert = 'Oops, this is not a valid QR code.'
          this.red.dismissCountDown = this.red.dismissSecs

        }

      }

    },

    async getCultivar() {
      const x = await axios.get(`${process.env.VUE_APP_ROOT_API}/cultivars`)
      try {
        let tempArr = x.data.data
        for (var i in tempArr) {
          var name = tempArr[i].name
          var id = tempArr[i].id
          this.cultivarOptions.push({ value: id, text: name })
        }
      } catch (err) {
        console.log(err.message)
      }
    },

    async getSeeds() {
      const x = await axios.get(
        `${process.env.VUE_APP_ROOT_API}/seeds`
      )
      try {
        this.seedOptions = x.data.data
        for (let i in this.seedOptions) {
          for (let j in this.cultivarOptions) {
            if (this.seedOptions[i].cultivarId == this.cultivarOptions[j].value) {
              this.seedOptions[i].displayCultivar = this.cultivarOptions[j].text
            }
          }
        }

      } catch (err) {
        console.log(err.message)
      }
    },

    removeRow(index) {
      console.log(index)
      this.scan.scanList.splice(index, 1)
    },

    today() {
      return (this.dateTime)
    },

    async getExpYear() {
      for (let i = 1; i <= 3; i++) {
        let year = 2025 // do this later
        this.expYearOptions.push({ value: year, text: year.toString() })
      }
    }
  },

  mounted() {
    this.callAPI()
    // navigator.mediaDevices.getUserMedia({video:true})
  }
}
</script>

<style scoped>
.scan-page {
  font-family: 'Nunito', sans-serif;
  color: #2bb573;
  text-align: center;
  justify-content: center;
  display: flex;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}

.right-pane {
  width: 30vh;
  box-sizing: border-box;
  overflow: scroll;
  flex: 1;
}

.left-pane {
  width: 70vh;
  box-sizing: border-box;
  flex: 1;
  border-right: 1px solid;
}

.heading-font {
  color: #2bb573;
  /* must have as the subheading color will overwrite it */
  font-size: 28px;
  font-weight: 700;
  margin-top: 40px;
}

.details-font-value {
  font-size: 14px;
  /* margin-top: -8px;
  margin-left: 2px; */
  /* text-align: center;
  line-height: 24px; */
  color: #28273d;
  font-weight: bold;
}

.details-font {
  /* margin-top: 20px; */
  color: gray;
  letter-spacing: 1.2px;
  font-weight: 500;
}

.text-row {
  display: flex;
  justify-content: center;
  /* center horizontally */
  align-items: center;
  /* optional: center vertically */
  gap: 10px;
  /* optional spacing between p tags */
}


.loading-indicator {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  letter-spacing: 1.2px;
  text-align: center;
  margin-top: 135px;
}

.red-alert {
  margin-bottom: 20px;
  margin-top: 20px;
  color: red;
  font-weight: bold;
}

.yellow-alert {
  margin-bottom: 20px;
  margin-top: 20px;
  color: sienna;
  font-weight: bold;
}

.green-alert {
  margin-bottom: 20px;
  margin-top: 20px;
  color: green;
  font-weight: bold;
}

.on-scanner {
  /* margin-top: 10px;
  margin-bottom: -10px;
  max-height: 480px;
  max-width: 480px; */
  width: 100%;
  height: 100%;
  justify-content: center;
}

.off-scanner {
  margin-top: -40px;
  margin-bottom: 40px;
  /* height: 250px; 
  width: 250px;  */
  max-height: 480px;
  max-width: 480px;
  width: 100%;
  height: 100%;
  background-color: black;
}


.button-scan {
  font-family: 'Nunito', sans-serif;
  font-weight: 600 !important;
  letter-spacing: 1px;
  border-radius: 50px !important;
  margin-top: -20px;
  margin-bottom: 0px;
  max-width: 120px;
  width: 100%;
}
</style>
