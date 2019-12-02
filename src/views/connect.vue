<template>
  <main>
    <div id="wrapper">
      <span class="font-bold text-5xl">Log In</span>
      <img
              v-on:click="connectUser()"
              class="connectWithGoogle cursor-pointer"
              src="../assets/btn_google_signin_dark_normal_web@2x.png"
              alt=""
      >
    </div>
  </main>
</template>
<script>

    export default {
        methods: {
            connectUser() {
                const provider = new this.$fbAuth.GoogleAuthProvider();

                this.$fbAuth().signInWithPopup(provider).then(result => {
                  this.$router.push("/")
                }).catch(function (error) {
                    console.log(error)
                });
            },
        }
    }
</script>
<style>
  #wrapper {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    padding: 0 30px 20px 30px;
    text-align: center;
    border-radius: 5px;
  }
  body{
    font-size: initial;
  }
  main {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    align-content: center;
    height: 100vh;
    width: 100vw;
  }
  .connectWithGoogle{
    width: 200px;
  }
</style>
