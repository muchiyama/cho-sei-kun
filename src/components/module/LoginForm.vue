<template>
  <div>
    <div>
      <b-jumbotron class="introduce" header="Login" lead="please enter your user info">
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
        v-model="loginUser.email"
        type="email"
        required
        label="Email address:"
        placeholder="admin@vue.com"
        label-for="input-1"
        description="We'll never share your email with anyone else."></b-form-input>
      </b-form-group>

      <!--パスワード-->
      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="loginUser.password"
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
import LoginUser from '@/components/model/LoginUser.ts';
import { register } from 'register-service-worker';
import axios from '../wrap/AxiosWrapper';
import Url from '@/common/const/Url';
import HeaderHelper from '@/common/const/HeaderHelper';
import TokenManager from '@/auth/TokenManager';
import Auth from '../../auth/Auth';

// ユーザー登録フォームのプロパティ
@Component
export default class LoginForm  extends Vue {
  public loginUser: LoginUser | LoginUser = new LoginUser();
  private show: boolean | boolean = true;

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

  private async getLogin() {
    try {
      const res = await axios.post(Url.LOGIN_API, JSON.stringify(this.loginUser));
      TokenManager.manage(res.headers);
      alert('login successed');
      this.$forceUpdate();
      this.$router.push(Url.SELECT_EVENT_PAGE);
    } catch (error) {
      alert('login failed');
    }
  }

  private onClickSubmit(evt: Event) {
    evt.preventDefault();
    this.getLogin();
  }

  private onClickReset(evt: Event) {
    evt.preventDefault();
    alert('reset');
  }

  private checkLogin(): boolean {
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