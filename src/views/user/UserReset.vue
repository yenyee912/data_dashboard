<template>
  <div class="container">
    <div class="row no-gutter">
      <div class="col-md-8 col-lg-6">
        <div class="login d-flex align-items-center py-5">
          <div class="container">
            <div class="row">
              <div class="col-md-9 col-lg-8 mx-auto">
                <h3 class="login-heading mb-4">Did you forgot your password?</h3>
                <form @submit.prevent="resetPass">
                  <div class="form-label-group">
                    <input
                      v-model="email"
                      type="email"
                      id="inputEmail"
                      class="form-control"
                      placeholder="Email address"
                      required
                      autofocus
                    />
                    <label for="inputEmail">Email address</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      v-model="password"
                      type="password"
                      id="inputPassword"
                      class="form-control"
                      placeholder="Password"
                      required
                      autofocus
                    />
                    <label for="inputPassword">Password</label>
                  </div>
                  <!-- <div class="form-label-group">
                    <input
                      v-model="password2"
                      type="password"
                      id="inputPassword2"
                      class="form-control"
                      placeholder="Confirm Password"
                      required
                    />
                    <label for="inputPassword2">Confirm Password</label>
                  </div>-->
                  <b-button
                    class="btn btn-lg btn-warning btn-block btn-login text-uppercase font-weight-bold mb-2"
                    type="submit"
                    @submit="resetPass"
                  >Reset Password</b-button>
                  <div class="text-center" variant="danger">
                    <!-- <li v-for="(error, index) in errors" :key="index">{{ error }}</li> -->
                    <b-alert
                      v-for="(error, index) in errors"
                      :key="index"
                      show
                      variant="danger"
                    >{{ error.msg }}</b-alert>
                  </div>
                  <div class="success-message text-center" v-if="showMsg">
                    <b-alert show variant="success">{{ successMsg }}</b-alert>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image2"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password2: '',
      resetPasswordToken: '',
      errors: null,
      successMsg: 'Please login again',
      showMsg: false
    }
  },
  methods: {
    resetPass() {
      axios
        .put(
          `${process.env.VUE_APP_ROOT_API}/user/updatePasswordViaEmail`,
          {
            email: this.email,
            password: this.password,
            resetPasswordToken: this.resetPasswordToken
          }
        )
        .then(() => {
          this.showMsg = true
          // this.$router.push({ name: 'Login' })
        })
        .catch(err => {
          console.log(err)
          this.showMsg = false
          this.errors = err.response.data.errors
        })
    }
  },
  mounted: function() {
    this.resetPasswordToken = this.$route.query.resetPasswordToken
  }
}
</script>

<style>
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

.login,
.image {
  min-height: 90vh;
}

.bg-image2 {
  background-image: url('https://i.pinimg.com/originals/8d/dd/8f/8ddd8fc4c5bb164dcb36dc9b48e7e229.jpg');
  background-size: cover;
  background-position: center;
}

.login-heading {
  font-weight: 300;
}

.btn-login {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
  border-radius: 2rem;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
  height: auto;
  border-radius: 2rem;
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  cursor: text;
  /* Match the input under the label */
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

/* Fallback for Edge
-------------------------------------------------- */

@supports (-ms-ime-align: auto) {
  .form-label-group > label {
    display: none;
  }

  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE
-------------------------------------------------- */

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .form-label-group > label {
    display: none;
  }

  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}
</style>
