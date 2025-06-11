<template>
  <div class="scanner-display">
    <qrcode-stream @init="loadCamera" @decode="decodeQR" :track="true" :paused="true">
      <!-- <div class="loading-indicator" v-if="loading">
        <p>Scanner Loading...</p>
      </div> -->
    </qrcode-stream>
  </div>
</template>

<script>
export default {
  data() {
    return {
      busy: true,
      scanFailAlert: '',
      scanItem: { seedId: "wellgrow-14-400", cultivarId: 14, quantity: 2, seedRef: "WELLGROW SEEDS-Rocket(wellgrow-14-400)", expYear: 2023 },
      cameraSettings: {
        facingMode: {
          ideal: 'none'
        }
      },
      scannerAppear: true,
    }

  },

  methods: {
    formatScanData() {

    }
  },

  watcher: {
    scanItem: {
      handler(val) {
        this.formatScanData(val)
      },
      immediate: true,
      deep: true,
    }
  }


  // validations: {
  //   name: 'scanner',
  //   scan: {
  //     scanDestination: { required },
  //     action: { required },
  //     scanList: {
  //       required,
  //       $each: {
  //         seedId: { required },
  //         seedRef: { required },
  //         cultivarId: { required },
  //         expYear: { required },
  //         quantity: {
  //           required,
  //           minValue: 1
  //         }
  //       }
  //     }
  //   }
  // },

}
</script>

<style>
.scanner-display {
  height: 50vh;
  width: 50vh;
  justify-content: center;
  display: flex;
  margin-left: 500px;

}
</style>