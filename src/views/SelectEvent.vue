<template>
  <b-container fluid>
    <b-row>
      <b-col/>
      <b-col cols="10">
        <SelectEventForm></SelectEventForm>
      </b-col>
      <b-col/>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator';
import SelectEventForm from '@/components/module/SelectEventForm.vue';
import TokenManager from '@/auth/TokenManager';
import Url from '@/common/const/Url';
import TimerUtil from '@/common/util/TimerUtil';
import axios from '../components/wrap/AxiosWrapper';
import Message from '../common/const/Message';

@Component({
    components: {
        SelectEventForm,
    },
})
export default class SelectEvent extends Vue {
    constructor() {
        super();
    }
 }
</script>

<style scoped>
  .introduce{
    margin-top: 2rem;
  }
</style>
