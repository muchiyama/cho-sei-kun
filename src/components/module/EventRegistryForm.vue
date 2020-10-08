<template>
  <div>
    <!--登録フォーム-->
    <b-form @submit="onClickSubmit" @onReset="onClickReset">

        <b-container fluid>
            <b-row>
                <b-col cols="4">
                  <b-jumbotron class="introduce" header="Create Event" lead="please enter your event Info"></b-jumbotron>
                </b-col>
                <b-col>
                  <b-jumbotron class="introduce" lead="please enter your event Info">
                    <b-container>
                      <b-row>
                        <b-col class="text-left">
                          <label >Start Date</label>
                          <vuejsdatepicker
                          title="StartDate"
                          v-model="registryEvent.startDate"
                          />
                        </b-col>
                        <b-col class="text-left">
                          <label >End Date</label>
                          <vuejsdatepicker
                          title="EndDate"
                          v-model="registryEvent.endDate"
                          />
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-jumbotron>
                </b-col>
            </b-row>
        </b-container>

      <!--イベント名-->
      <b-form-group
        id="input-group-1"
        label="Event Info"
        label-for="input-1"
      >
        <b-form-input
        id="input-group-1"
        type="text"
        v-model="registryEvent.eventName"
        required
        label="Event Name"
        placeholder="eventName"
        label-for="input-1"
        ></b-form-input>
      </b-form-group>

      <!--登録ボタン-->
      <b-button class="buttom_space" type="submit" variant="primary">Submit</b-button>
      <b-button class="buttom_space" type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
import { register } from 'register-service-worker';
import RegistryEvent from '@/components/model/RegistryEvent.ts';
// import vuejsdatepicker from '../../../node_modules/vuejs-datepicker/src/components/Datepicker.vue';
import vuejsdatepicker from 'vuejs-datepicker/src/components/Datepicker.vue';
import axios from '@/components/wrap/AxiosWrapper';
import { REQUEST_HEADERS } from '@/components/wrap/AxiosWrapper';
import * as Moment from 'moment';
import Url from '@/common/const/Url';
import HeaderHelper from '@/common/const/HeaderHelper';
import Message from '@/common/const/Message';
import TokenManager from '@/auth/TokenManager';
import Auth from '@/auth/Auth';


// ユーザー登録フォームのプロパティ
@Component({
  components: {
    vuejsdatepicker,
  },
})
export default class EventRegistryForm extends Vue {
  public registryEvent: RegistryEvent | RegistryEvent = new RegistryEvent();
  private show: boolean | boolean = true;

  constructor() {
    super();
  }
  public created() {
    this.registryEvent.eventName = 'MockEvent';
    this.registryEvent.createdUserId = 'EV00000001';
    this.registryEvent.createdUserName = Auth.getEmail();
  }

  // public mounted() {
  // }

  // public updated() {
  // }

  // public destroyed() {
  // }

  private async postEvent() {
    try {
      const res = await axios.post(Url.EVENT_API, JSON.stringify(this.registryEvent));
      alert(Message.I0002('登録'));
      this.$router.push({ name: Url.EVENT_PAGE_NAME, params: { value: res.data } });
    } catch (error) {
      alert(Message.I0002('イベントの作成'));
      console.log(error);
    }
  }

  private onClickSubmit(evt: Event) {
    evt.preventDefault();
    if (this.registryEvent.startDate <= this.registryEvent.endDate) {
      this.registryEvent.targetDays = this.calcTargetDate(this.registryEvent.startDate, this.registryEvent.endDate);
      this.postEvent();
    } else {
        alert(JSON.stringify(this.registryEvent));
      }
  }

  private onClickReset(evt: Event) {
    if (this.registryEvent.startDate > this.registryEvent.endDate) {
      alert('your input has error');
      return;
    } else {
      alert(JSON.stringify(this.registryEvent));
      return;
    }
  }

  private calcTargetDate(startDate: Date, endDate: Date): Date[] {
    const res = [];
    let tmpStartDate = new Date(startDate.toLocaleDateString());
    const tmpEndDate = new Date(endDate.toLocaleDateString());

    while (tmpStartDate <= tmpEndDate) {
      res.push(tmpStartDate);
      tmpStartDate = new Date(tmpStartDate.setDate(tmpStartDate.getDate() + 1));
    }
    return res;
  }
}
</script>

<style scoped>
.introduce {
  margin-top: 2rem;
}
.buttom_space {
  margin: 2rem;
}
</style>