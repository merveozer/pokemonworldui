<template>
  <v-app>
    <v-main>
      <router-view> 
       
      </router-view>
    </v-main>
  </v-app>
</template>

<style scoped></style>

<script>
export default {

  name: "App",
  created() {
    this.$store.dispatch("initAuth");
  },
};
</script>
