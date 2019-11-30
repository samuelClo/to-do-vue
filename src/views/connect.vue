<template>
  <div id="wrapper">
    <div class="w-full max-w-xs flex flex-col items-center justify-center">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
          <p class="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign In
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </a>
        </div>
      </form>
      <span class="text-center text-gray-500 text-xs mb-4">
        OR
      </span>
      <img
              v-on:click="connectUser()"
              class="connectWithGoogle cursor-pointer"
              src="../assets/btn_google_signin_dark_normal_web@2x.png"
              alt=""
      >
  </div>

  </div>
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
  body{
    font-size: initial;
  }
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
  .connectWithGoogle{
    width: 55%;
  }
</style>
