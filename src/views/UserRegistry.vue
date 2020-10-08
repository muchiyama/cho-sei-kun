<template>
  <b-container fluid>
    <b-row>
      <b-col/>
      <b-col cols="10">
        <UserRegistryForm></UserRegistryForm>
      </b-col>
      <b-col/>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserRegistryForm from '@/components/module/UserRegistryForm.vue';

@Component({
  components: {
    UserRegistryForm,
  },
})
export default class UserRegistry extends Vue {}
</script>
