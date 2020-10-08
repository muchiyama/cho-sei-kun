<template>
  <b-container fluid>
    <b-row>
      <b-col/>
      <b-col cols="10">
        <LoginForm></LoginForm>
      </b-col>
      <b-col/>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginForm from '@/components/module/LoginForm.vue';

@Component({
  components: {
    LoginForm,
  },
})
export default class Login extends Vue {

  // public created() {
  // }

  // public mounted() {
  // }

  // public updated() {
  // }

  // public destroyed() {
  // }
}
</script>
