<template>
  <div class="text-center my-2">
    <div class="container">
      <div class="text-center">
        <h1>Find your account</h1>
      </div>
      <b-form @submit="resetPass">
        <b-form-group id="input-group-1" label-for="input-1">
          <b-form-input
            v-model="email"
            type="email"
            placeholder="Email address"
            required
          ></b-form-input>
        </b-form-group>

        <br />
        <b-button variant="warning" type="submit">Submit</b-button>
        <div class="success-message text-center" v-if="showMsg">
          <b-alert show variant="success">{{ successMsg }}</b-alert>
        </div>
        <div class="text-center" size="sm">
          <b-alert v-if="errors" show variant="danger">
            {{ errors }}
          </b-alert>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      errors: null,
      successMsg: 'Please check your email.',
      showMsg: false
    }
  },
  methods: {
    resetPass(evt) {
      evt.preventDefault()
      axios
        .post(`${process.env.VUE_APP_ROOT_API}/user/forgotPassword`, {
          email: this.email
        })
        .then(() => {
          this.showMsg = true
          // this.$router.push({ name: 'Login' })
        })
        .catch(err => {
          console.log(err)
          this.showMsg = false
          this.errors = err.response.data.message
        })
    }
  }
}
</script>

<style></style>
