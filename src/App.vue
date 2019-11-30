<template>
  <div id="app">
<!--    <div id="nav">-->
<!--        <img class="connectWithGoogle" src="./assets/btn_google_signin_dark_normal_web@2x.png" alt="">-->
<!--    </div>-->
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import "tailwindcss/base";

  @import "tailwindcss/components";

  @import "tailwindcss/utilities";

  * {
    font-family: Arial;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: unset;
  }

  body {
    font-size: 28px;
  }


  #nav {
    display: flex;
    justify-content: center;

    & > * {
      margin: 0 5px;
    }
  }

  input {
    font-size: 20px;
  }

  a {
    text-decoration: unset;
    color: unset;
  }
</style>
