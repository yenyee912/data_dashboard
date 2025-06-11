<template>
  <div>
    <h3 class="heading-font mt-5">Scan List</h3>
    <div>
      {{ itemScanList }}
      <div class="scan-list-box" v-for="(x, index) in itemScanList" :key="x.seedId.$model" :index="index">
        <div class="mb-3">
          <div class="delete-icon">
            <b-icon variant=danger icon="trash-fill" @click.prevent="removeRow(index)"></b-icon>
          </div>

          <b-form-group class="seed" label="Seed" label-cols="3">
            <b-form-textarea style="border-radius: 20px;" readonly v-model="x.seedRef" size="md"></b-form-textarea>
          </b-form-group>

          <b-form-group class="quantity" label="Quantity*" label-cols="3">
            <b-form-input style="border-radius: 20px; padding-left: 15px;" type="number" v-model="x.quantity" size="md"
              min="1"></b-form-input>
          </b-form-group>
          <p v-if="x.error" style="color:red">
            Quantity required.
          </p>
          <p v-if="x.error" style="color:red">
            Minimum scan quantity is 1 packtet.
          </p>

          <b-form-group class="quantity" label="Expiry Year*" label-cols="3">
            <b-form-select type="number" style="border-radius: 20px; padding-left: 15px; margin-bottom: 10px;"
              v-model="x.expYear" size="md" :options="expYearOptions"></b-form-select>
          </b-form-group>
          <p v-if="x.error" style="color:red">
            Expiry year required.
          </p>

        </div>

      </div>

      <div style="text-align: center;">
        <b-button variant="success" class="xs mt-2 button-scan" @click.prevent="checkInput">SUBMIT</b-button>
      </div>

    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      expYearOptions: [
        { value: '', text: 'Please select expiry year.' },
        { value: 2021, text: "2021" },
        { value: 2022, text: "2022" },
        { value: 2023, text: "2023" },
      ],

    }
  },

  props: {
    itemScanList: {
      type: Array,
      required: true
    }
  },

  methods: {
    removeRow(index) {
      this.$emit('remove-item', index)
    }
  }

}
</script>

<style scoped>
.scan-list-box {
  justify-content: center;
  margin-left: 100px;
}

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

.delete-icon {
  width: 20px;
  height: 20px;
  text-align: right;
}

/* .itemBg{
  background-color:#7fd3a1;
  padding-top:20px;
  padding-bottom: 20px; 
} */
</style>