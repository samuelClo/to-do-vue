<template>
  <img
      v-on:click="connectUser()"
      class="connectWithGoogle"
      src="../assets/btn_google_signin_dark_normal_web@2x.png"
      alt=""
  >
</template>
<script>

    export default {
        methods: {
            connectUser() {
                const provider = new this.$fbAuth.GoogleAuthProvider();

                this.$fbAuth().signInWithPopup(provider).then(result => {
                    this.$router.replace('/')
                }).catch(function (error) {
                    console.log(error)
                });
            },
        }
    }
</script>
<style>
  @tailwind base;

  @tailwind components;

  @tailwind utilities;
</style>
