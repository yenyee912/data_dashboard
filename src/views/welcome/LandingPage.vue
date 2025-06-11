<template>
  <div>
    <!-- Hero Section -->
    <b-jumbotron style="border-radius: 0; border:transparent" header="Welcome to NovaTech"
      lead="Innovating the future, one solution at a time." bg-variant="mid-bg" text-variant="white"
      border-variant="dark">
      <p>NovaTech provides cutting-edge technology solutions to help your business grow and scale efficiently.</p>
      <b-button variant="light" href="#services">Learn More</b-button>
    </b-jumbotron>

    <!-- Carousel Showcase -->
    <b-container class="mb-4">
      <b-carousel id="carousel-1" :interval="4000" controls indicators background="#8a2b3d" img-width="1024"
        img-height="400">
        <b-carousel-slide caption="Smart Automation" text="Our AI-driven tools reduce operational costs."
          img-src="./assets/stock/automate.jpg" style="max-height: 400px; object-fit: cover;"></b-carousel-slide>

        <b-carousel-slide caption="Cloud Infrastructure" text="Secure and scalable cloud environments."
          img-src="./assets/stock/cloud.jpg" style="max-height: 400px; object-fit: cover;"></b-carousel-slide>

        <b-carousel-slide caption="Mobile Solutions" text="Cross-platform mobile apps for your business."
          img-src="./assets/stock/mobile.jpg" style="max-height: 400px; object-fit: cover;"></b-carousel-slide>
      </b-carousel>
    </b-container>

    <!-- Services Section -->
    <b-container id="services">
      <b-row class="text-center mb-5">
        <b-col cols="12">
          <h2>Our Services</h2>
          <p class="text-muted">Everything you need to accelerate your digital transformation.</p>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="4" class="mb-4">
          <b-card>
            <b-card-img src="/assets/placeholder.png" alt="Consulting" center class="w-25 mx-auto d-block text-center">
            </b-card-img>
            <b-card-body class="text-center">
              <b-card-title>Consulting</b-card-title>
              <b-card-text>Expert advice to refine your IT strategy and execution.</b-card-text>
              <b-button variant="primary">Learn More</b-button>
            </b-card-body>

          </b-card>
        </b-col>

        <b-col md="4" class="mb-4">
          <b-card>
            <b-card-img src="/assets/placeholder.png" alt="Development" center class="w-25 mx-auto d-block text-center">
            </b-card-img>
            <b-card-body class="text-center">
              <b-card-title>Development</b-card-title>
              <b-card-text>End-to-end development of robust web and mobile apps.</b-card-text>
              <b-button variant="primary">Explore</b-button>
            </b-card-body>
          </b-card>
        </b-col>

        <b-col md="4" class="mb-4">
          <b-card>
            <b-card-img src="/assets/placeholder.png" alt="Support" center class="w-25 mx-auto d-block text-center">
            </b-card-img>
            <b-card-body class="text-center">
              <b-card-title>Support</b-card-title>
              <b-card-text>Dedicated 24/7 support for your infrastructure and apps. </b-card-text>
              <b-button variant="primary">Get Help</b-button>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!-- Footer -->
    <div class="text-center mt-5" bg-variant="dark" text-variant="light">
      <p class="mb-0">© 2025 NovaTech. All rights reserved.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>
h2 {
  font-weight: bold;
}
</style>