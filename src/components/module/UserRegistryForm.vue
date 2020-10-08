<template>
  <div>
    <div>
      <b-jumbotron class="introduce" header="CreateUserAccount" lead="please enter your user info">
      </b-jumbotron>
    </div>
    <!--登録フォーム-->
    <b-form @submit="onClickSubmit" @reset="onClickReset" v-if="show">
      <!--メールアドレス-->
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
        id="input-group-1"
        v-model="RegistryUser.email"
        type="email"
        required
        label="Email address:"
        placeholder="*@xxx.xx"
        label-for="input-1"
        description="We'll never share your email with anyone else."></b-form-input>
      </b-form-group>

      <!--ユーザーID-->
      <b-form-group id="input-group-2" label="User Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="RegistryUser.userName"
          type="text"
          required
          placeholder="Your name"
        ></b-form-input>
      </b-form-group>

      <!--パスワード-->
      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="RegistryUser.password"
          type="password"
          required
          placeholder="password"
        ></b-form-input>
      </b-form-group>

      <!--パスワード-->
      <b-form-group id="input-group-4" label="※Confirm Password:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="confirmPassword"
          type="password"
          required
          placeholder="password"
        ></b-form-input>
      </b-form-group>

      <!--登録ボタン-->
      <b-button class="buttom_space" type="submit" variant="primary">Submit</b-button>
      <b-button class="buttom_space" type="reset" variant="danger">Reset</b-button>

    </b-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue} from 'vue-property-decorator';
import axios from '../wrap/AxiosWrapper';

import RegistryUser from '@/components/model/RegistryUser.ts';
import Url from '@/common/const/Url';
import HeaderHelper from '@/common/const/HeaderHelper';
import TokenManager from '@/auth/TokenManager';
import Message from '../../common/const/Message';

// ユーザー登録フォームのプロパティ
@Component
export default class UserRegistryForm  extends Vue {
  public RegistryUser: RegistryUser | RegistryUser = new RegistryUser();
  private show: boolean | boolean = true;
  private confirmPassword: string | null = null;

  // public email: string | null = null;
  // public userName: string | null = null;
  // public password: string | null = null;

  constructor() {
    super();
  }

  // public created() {
  // }

  // public mounted() {
  // }

  // public updated() {
  // }

  // public destroyed() {
  // }

  private async Registry() {
    try {
      const res = await axios.post(Url.USER_API, JSON.stringify(this.RegistryUser));
      TokenManager.manage(res.headers);
      if (res.status === 226) {
        alert(Message.I0005('このメールアドレスは') + Message.NewLine + Message.I0006('別のメールアドレス'));
        return;
       }
      alert(Message.I0002('登録'));
      this.$router.push(Url.EVENT_REGISTRY_PAGE);
    } catch (error) {
      console.log(error);
    }
  }

  private onClickSubmit(evt: Event) {
    evt.preventDefault();
    if (this.isSamePassword()) {
      this.Registry();
    } else {
      alert('password does not match');
      return;
    }
  }

  private onClickReset(evt: Event) {
    evt.preventDefault();
    alert('reset');
  }

  private isSamePassword(): boolean {
    if (this.RegistryUser.password !== this.confirmPassword) {
      return false;
    }
    return true;
  }
}
</script>
  
<style scoped>
  .introduce{
    margin-top: 2rem
  }
  .buttom_space {
    margin: 2rem
  }
</style>