<template>
  <b-overlay :show="busy == true" class="container">

    <h1 class="subheading-font">New Scan Entry</h1>
    <b-form class="details-font">
      <p class="date">Date/ Time</p>
      <p class="date-details">{{ today() }}</p>
      <p class="staff">Staff Email</p>
      <p class="staff-details">{{ scan.staffEmail }}</p>
      <p class="staff">Staff Name</p>
      <p class="staff-details">{{ scan.staffName }}</p>
      <p class="staff">Scan Location</p>
      <p class="staff-details">HQ</p>

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

      <!-- qr code scanner -->
      <h1 class="subheading-font">Scanner</h1>
      <p class="details-font">Scan the QR code on seed packet.</p>
      <div sm=6 md=4>
        <b-alert variant="success" class="green-alert" :show="green.dismissCountDown"
          @dismissed="green.dismissCountDown = 0" @dismiss-count-down="greenCountDownChanged">{{ green.alert
          }}</b-alert>
      </div>

      <div sm=6 md=4>
        <b-alert variant="danger" class="red-alert" :show="red.dismissCountDown" @dismissed="red.dismissCountDown = 0"
          @dismiss-count-down="redCountDownChanged">{{ red.alert }}</b-alert>
      </div>

      <div sm=6 md=4>
        <b-alert variant="warning" class="yellow-alert" :show="yellow.dismissCountDown"
          @dismissed="yellow.dismissCountDown = 0" @dismiss-count-down="yellowCountDownChanged">{{ yellow.alert
          }}</b-alert>
      </div>

      <!--scanner on-->
      <div class="on-scanner" style="height: 300px;" v-if="scannerAppear">

        <qrcode-stream @init="loadCamera" @decode="decodeQR" :track="true" :paused="true">
          <div class="loading-indicator" v-if="loading">
            <p>Scanner Loading...</p>
          </div>
        </qrcode-stream>
      </div>

      <!--scanner off-->
      <div style="text-align: center; margin-top: 50px;">
        <span v-if="!scannerAppear">
          <div class="off-scanner" style="height: 300px;">
            <p class="off-text">Scanner is</p>
            <p class="off-text2">OFF</p>
          </div>
          <b-btn size="md" class="btn-success button-scan" @click.prevent="scannerAppear = !scannerAppear">ON</b-btn>
        </span>
        <span v-else>
          <b-btn size="md" class="btn-danger button-scan"
            @click.prevent="scannerAppear = !scannerAppear">OFF</b-btn></span>
      </div>

      <hr style="margin-top: 50px;">

      <h3 class="subheading-font">Scan List</h3>
      <div v-if="scan.scanList.length">
        <div v-for="(x, index) in $v.scan.scanList.$each.$iter" :key="x.seedId.$model" :index="index">

          <b-card class="item-card">
            <b-row class="mb-3 itemBg">

              <b-col cols="12" lg="12" style="text-align: right;">
                <b-icon class="delete" variant=danger icon="trash-fill" @click.prevent="removeRow(index)"></b-icon>
              </b-col>

              <b-col cols=12 lg="6" class="details-font">
                <b-form-group class="seed" label="Seed">
                  <b-form-textarea style="border-radius: 20px; padding-left: 15px; width: 290px;" :options="seedOptions"
                    readonly v-model="x.seedRef.$model" size="md"></b-form-textarea></b-form-group>
              </b-col>

              <b-col lg="12" cols="12">
                <b-form-group class="quantity" label="Quantity*">
                  <b-form-input type="number"
                    style="border-radius: 20px; padding-left: 15px; width: 290px; margin-bottom: 10px;"
                    v-model="x.quantity.$model" size="md" min="1"></b-form-input>
                </b-form-group>
                <p v-if="x.quantity.$error" style="color:red">
                  Quantity required.
                </p>
                <p v-if="!x.quantity.minValue" style="color:red">
                  Minimum scan quantity is 1 packtet.
                </p>
              </b-col>

              <b-col lg="12" cols="12" v-show="scan.action == 1">
                <b-form-group class="quantity" label="Expiry Year*">
                  <b-form-select type="number"
                    style="border-radius: 20px; padding-left: 15px; width: 290px; margin-bottom: 10px;"
                    v-model="x.expYear.$model" size="md" :options="expYearOptions"></b-form-select>
                </b-form-group>
                <p v-if="x.expYear.$error" style="color:red">
                  Expiry year required.
                </p>
              </b-col>

            </b-row>

          </b-card>
        </div>

        <div style="text-align: center;">
          <b-button variant="success" class="xs mt-2 button-scan" @click.prevent="checkInput">SUBMIT</b-button>
        </div>

      </div>

      <div v-else class="mb-4">
        No item scanned. Turn on scanner to start.
      </div>

      <b-alert variant="danger" class="red-alert m-2" dismissible :show="scanFailAlert != ''">
        {{ scanFailAlert }}
      </b-alert>
    </b-form>
  </b-overlay>

</template>

<script>
import axios from 'axios';
import { required, minValue } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      busy: true,
      locationOptions: [],
      actionOptions: [],
      scanFailAlert: '',
      destinationAlert: '',
      expYearOptions: [
        { value: '', text: 'Please select expiry year.' },
        { value: 2021, text: "2021" },
        { value: 2022, text: "2022" },
        { value: 2023, text: "2023" },
      ],
      scan: {
        staffEmail: JSON.parse(localStorage.user).user.email,
        staffName: JSON.parse(localStorage.user).user.name,
        scanLocation: 1,
        scanDestination: 0,
        action: 0,
        scanList: [
          // {seedId: "wellgrow-14-400", cultivarId:14, quantity: 2, seedRef:"WELLGROW SEEDS-Rocket(wellgrow-14-400)", expYear:0}, 
          // {seedId: "wellgrow-24-120", cultivarId:24, quantity: 5, seedRef:"WELLGROW SEEDS-Red Mizuna(wellgrow-24-120)", expYear:''}, 
        ],
      },

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
      scannerAppear: false,

      loading: '',
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
      await this.today()
      await this.getExpYear()
      await this.getCultivar()
      await this.getSeeds()
      await this.getLocation()
      await this.getAction()
      this.busy = false
    },

    // only for action==2!!!
    // refactor needed
    bindExpYear(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].expYear = 1
      }
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

<style>
.title-font {
  font-family: 'Cooper Black', sans-serif;
  font-weight: bold;
  color: #2bb573;
  font-size: 40px;
  margin-top: 30px;
}

.subheading-font {
  font-family: 'Nunito', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #2bb573;
  margin-top: 40px;
}

.details-font {
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  margin-top: -8px;
  margin-left: 2px;
  font-weight: 500;
  /* text-align: center;
  line-height: 24px; */
  color: #28273d;
}

.details-font .date {
  margin-top: 20px;
  color: gray;
  letter-spacing: 1.2px;
}

.details-font .date-details {
  font-size: 16px;
  margin-top: -16px;
  font-weight: 600;
}

.details-font .staff {
  margin-top: -5px;
  color: gray;
  letter-spacing: 1.2px;
}

.details-font .staff-details {
  font-size: 16px;
  margin-top: -16px;
  font-weight: 600;
}

.details-font .status {
  margin-top: 30px;
  color: gray;
  letter-spacing: 1px;
}

.details-font .location {
  margin-top: 10px;
  color: gray;
  letter-spacing: 1px;
}

.details-font .seed {
  margin-top: 0px;
  color: gray;
  letter-spacing: 1px;
}

.details-font .quantity {
  margin-top: 0px;
  margin-bottom: -5px;
  color: gray;
  letter-spacing: 1px;
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
  margin-top: 10px;
  margin-bottom: -10px;
  max-height: 480px;
  max-width: 480px;
  width: 100%;
  height: 100%;
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

.off-text {
  font-family: 'Nunito', sans-serif;
  padding-top: 120px;
  font-size: 14px;
  color: white;
  text-align: center;
  letter-spacing: 1px;
}

.off-text2 {
  font-family: 'Nunito', sans-serif;
  margin-top: -20px;
  margin-left: 3px;
  font-weight: bolder;
  letter-spacing: 2px;
  font-size: 26px;
  color: white;
  text-align: center;
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

/* .btn-block {
  max-width: 250px;
  width: 100%;
  text-align: center!important;
} */

.item-card {
  max-width: 350px;
  margin-top: 20px;
  margin-bottom: 18px;
  padding-left: 5px;
  padding-right: 5px;
  /* display: flex; */
  border-color: transparent !important;
  border-radius: 10px !important;
  box-shadow: 0.01px 1.5px 12px rgb(0, 0, 0, 0.12) !important;
}

/* .entry-form {
  border-radius: 20px; padding-left: 15px; width: 300px;
}

.card-form {
  border-radius: 20px; 
  padding-left: 15px; 
  width: 290px;
} */

.delete {
  width: 20px;
  height: 20px;
}

/* .itemBg{
  background-color:#7fd3a1;
  padding-top:20px;
  padding-bottom: 20px; 
} */
</style>
