<template>
  <b-overlay :show="busy == true" class="container">
    <div class="on-scanner" style="height: 300px;" v-if="scannerAppear">

      <qrcode-stream @init="loadCamera" @decode="decodeQR" :track="true" :paused="true">
        <div class="loading-indicator" v-if="loading">
          <p>Scanner Loading...</p>
        </div>
      </qrcode-stream>
    </div>

    <!--button-->
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
  </b-overlay>
</template>

<script>
export default {
  data() {
    return {
      busy: true,
      locationOptions: [],
      actionOptions: [],
      scanFailAlert: '',
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
          { seedId: "wellgrow-14-400", cultivarId: 14, quantity: 2, seedRef: "WELLGROW SEEDS-Rocket(wellgrow-14-400)", expYear: 2023 },
          // {seedId: "wellgrow-24-120", cultivarId:24, quantity: 5, seedRef:"WELLGROW SEEDS-Red Mizuna(wellgrow-24-120)", expYear:''}, 
        ],
      },

      red: {
        dismissSecs: 3,
        dismissCountDown: 0,
        showDismissibleAlert: false,
      },

      green: {
        dismissSecs: 3,
        dismissCountDown: 0,
        showDismissibleAlert: false,
      },

      yellow: {
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
      rAlert: '',
      gAlert: '',
      yAlert: '',

      loading: '',
    }

  },

  validations: {
    name: 'scanner',
    scan: {
      scanDestination: { required },
      action: { required },
      scanList: {
        required,
        $each: {
          seedId: { required },
          seedRef: { required },
          cultivarId: { required },
          expYear: { required },
          quantity: {
            required,
            minValue: 1
          }
        }
      }
    }
  },

}
</script>

<style></style>