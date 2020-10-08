<template>
    <div>
        <b-container fluid>
            <b-row>
                <b-col/>
                <b-col>
                    <div>
                        <b-jumbotron class="introduce" header="Logout"/>
                    </div>
                </b-col>
                <b-col/>
            </b-row>
        </b-container>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator';
import TokenManager from '@/auth/TokenManager';
import Url from '@/common/const/Url';
import TimerUtil from '@/common/util/TimerUtil';
import axios from '../components/wrap/AxiosWrapper';
import Message from '../common/const/Message';

@Component
export default class LogOut extends Vue {
    constructor() {
        super();
        TokenManager.dispose();
    }

    // public created() {
    // }

    public mounted() {
        alert(Message.I0004('ログアウト') + Message.NewLine + Message.I0003('ログインページ'));
        this.$router.push(Url.LOGIN_PAGE);
    }

    // public updated() {
    // }

    // public destroyed() {
    // }
 }
</script>

<style scoped>
  .introduce{
    margin-top: 2rem;
  }
</style>
