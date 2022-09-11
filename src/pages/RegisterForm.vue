<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Last name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<style scoped>

</style>

<script>
import axios from "@/axios";
export default {
  name: "RegisterForm",
  data() {
    return {
      userName: "",
      password: "",
      dialog: false,
    };
  },

  methods: {
    async register() {
      const auth = { userName: this.userName, password: this.password };

      await axios
        .post("auth/register", auth)
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          if (error.response.status === 400) {
            alert("Username already exists...Please try another username");
            window.location.reload();
            this.$router.push("/register");
          }
        });
    },
  },
};
</script>
