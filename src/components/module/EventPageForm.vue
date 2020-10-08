<template>
    <div>
        <b-jumbotron class="introduce" header="Schedule Info Page " lead="please enter your schedule">
            EventName : {{ this.eventInfo.eventName }}
        </b-jumbotron>

        <b-table :items="this.items" :fields="this.fields"> 
            <template slot="PerOfAttendance" slot-scope="row">
                <b-progress :value="calcPerOfAttendance(new Date(row.item.date))" :max="100" show-progress animated/>
            </template>
        </b-table>
        <!-- 出席登録フォーム -->
        <b-container fluid>
            <b-row>
                <b-col>
                    <b-button v-b-toggle.collapse-1 variant="primary" class="float-left toggle_button">enter your schedule!</b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div>
                        <b-collapse id="collapse-1" class="mt-2">
                            <b-card>
                                <!--登録フォーム-->
                                <b-form @submit="onClickSubmit">
                                    <b-container fluid>

                                        <!--イベント名-->
                                        <b-form-group
                                            id="input-group-1"
                                            label="input your schedule"
                                            label-for="input-1"
                                        >
                                            <b-form-input
                                            id="input-group-1"
                                            v-model="userName"
                                            type="text"
                                            required
                                            label="Event Name"
                                            placeholder="your name"
                                            label-for="input-1"
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-row v-for="targetDate in targetAllDays" :key="targetDate.date.toLocaleDateString()" class="input_row">
                                            <b-col cols="4" class="text-left">
                                                <label class="label_text">{{ targetDate.date.toLocaleDateString() }}</label>
                                            </b-col>
                                            <b-col cols="4">
                                                <b-progress :value="calcPerOfAttendance(targetDate.date)" :max="100" show-progress animated/>
                                            </b-col>
                                            <b-col cols="4">
                                                <b-form-select v-model="targetDate.userState" class="input_select" :select-size="0">
                                                    <option :value="'Attendance'">Attendance</option>
                                                    <option :value="'Undecided'">Undecided</option>
                                                    <option :value="'Absent'">Absent</option>
                                                </b-form-select>
                                            </b-col>
                                            <b-col/>
                                        </b-row>
                                    </b-container>
                                    <!--登録ボタン-->
                                    <b-button class="buttom_space" type="submit" variant="primary">Submit</b-button>
                                    <b-button class="buttom_space" type="reset" variant="danger">Reset</b-button>
                                </b-form>
                            </b-card>
                        </b-collapse>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator';
import EventInfo from '@/components/model/EventInfo';
import Attendance from '@/components/model/Attendance';
import { AttendState } from '@/common/enum/AttendState';
import AttendAdaptor from '@/components/model/AttendAdaptor';
import Moment from 'Moment';
import axios from '@/components/wrap/AxiosWrapper';
import Url from '@/common/const/Url';
import HeaderHelper from '@/common/const/HeaderHelper';
import Message from '@/common/const/Message';
import Auth from '@/auth/Auth';

@Component({
})
export default class EventPageForm extends Vue {

    private eventInfo: EventInfo = new EventInfo();
    private fields: string[] | null = ['No Data'];
    private items: object[] | null = null;
    private progressValue: number = 100;
    private userName: string | string = '';
    private userAnswer: Attendance[] = [];
    private id: string | string = '';

    constructor() {
        super();
    }

    public created() {
        this.Init(this.$route.params.value);
    }

    public mounted() {
        // this.Init(this.$route.params.value);
    }

    // public mounted() {
    // }

    // public updated() {
    // }

    // public destroyed() {
    // }

    // v-forで使用する出席解凍用のプロパティを返す
    private get targetAllDays() {
        return this.userAnswer;
    }

    // 出席率を返す
    private calcPerOfAttendance(date: Date): number {
        let attendCount: number = 0;
        if (this.eventInfo.allUserAttendance !== undefined) {
            this.eventInfo.allUserAttendance.forEach( (value, key, map) => {
                value.forEach( (f) => { if (f.date.toLocaleDateString() === date.toLocaleDateString() && f.userState === 'Attendance') { attendCount++; } });
            });
            return (Math.round(attendCount / this.eventInfo.allUserAttendance.size * 100));
        } else {
            return 0;
        }
    }

    // 画面描画に必要な情報を読み込む
    private Init(id: string): void {
        this.dispose();
        this.getEvent(this.$route.params.value);
    }
    private dispose(): void {
        this.eventInfo = new EventInfo();
        this.userAnswer = [];
        this.fields = [];
        this.items = [];
    }

    // テーブルヘッダ用の連想配列を作成する
    private getTableHeader(): string[] {
        let res: string[] = [];
        if (this.eventInfo.allUserAttendance !== undefined && this.eventInfo.allUserAttendance.size > 0) {
            res = Array.from(this.eventInfo.allUserAttendance.keys());
        }
        res.unshift('date', 'PerOfAttendance');
        return res;
    }

    // テーブルデータ用の連想配列を作成する
    private getTableData(): object[] {
        const tableData = [];
        let dateRowData = {};
        let rowData = {};
        let tmpRowData = {};
        let keyName: string;
        let valueName: string;
        let xScale = 0;
        let yScale = 0;
        if (this.eventInfo.allUserAttendance !== undefined) {
            this.eventInfo.allUserAttendance.forEach( (v, k, m) => { yScale = v.length ; });
        }
        
        if (yScale !== 0) {
            for (let i = 0; i < yScale; i++) {
                this.eventInfo.allUserAttendance.forEach( (value, key, map) => {
                    if (xScale === 0) {
                        keyName = 'date';
                        valueName = value[i].date.toLocaleDateString();
                        dateRowData = { [keyName]: valueName };
                    }
                    if ( keyName !== key) {
                        keyName = key;
                        valueName = AttendState[value[i].userState].toString();
                        tmpRowData = { [keyName]: valueName };
                        rowData = Object.assign(rowData, tmpRowData);
                    }
                    xScale++;
                });
                xScale = 0;
                tableData.push(Object.assign(dateRowData, rowData));
            }
        } else {
            this.eventInfo.targetDays.forEach( (x) => {
                rowData = { ['date']: new Date(x.toString()).toLocaleDateString() };
                tableData.push(rowData);
            });
        }
        return tableData;
    }

    private async getEvent(id: string) {
        const eventInfo = new EventInfo();
        try {
            const res = await axios.get(Url.EVENT_API, {
                params: {
                    id,
                },
                data: {},
            });
            const atetndRes = await axios.get(Url.USER_ATTENDANCE_API, {
                params: {
                    id,
                },
                data: {},
            });
            this.eventInfo = Object.assign(res.data);
            this.eventInfo.targetDays = Array.from(this.eventInfo.targetDays);

            if (atetndRes.data.length !== 0) {
                const attendAdaptor = Object.assign(atetndRes.data);
                this.eventInfo.allUserAttendance = this.getUserAttendance(attendAdaptor);
            }
            this.fields = this.getTableHeader();
            this.items = this.getTableData();
            this.userAnswer = this.getTargetDays();
        } catch (error) {
            alert(Message.E0001('イベントの表示'));
            console.log(error);
        }
    }

    private getUserAttendance(attendList: AttendAdaptor[]): Map<string, Attendance[]> {
        const res = new Map<string, Attendance[]>();
        const userNameList: string[] = [];
        attendList.forEach( (x) => {
            if (!userNameList.includes(x.userName)) {
                userNameList.push(x.userName);
            }
        });
        userNameList.forEach( (x) => {
            const userAttendance: Attendance[] = [];
            attendList.forEach( (u) => {
                if (x === u.userName) {
                    userAttendance.push(new Attendance(new Date(u.targetDate), u.state));
                }
            });
            res.set(x, userAttendance);
        });
        return res;
    }

    // モックデータを作成する
    private getDummyData(): EventInfo {
        const res = new EventInfo();

        res.eventName = 'DummyEvent';
        res.allUserAttendance.set('DummyUser1', [ new Attendance(new Date(2019, 6, 1), AttendState.Attendance), new Attendance(new Date(2019, 6, 2), AttendState.Attendance), new Attendance(new Date(2019, 6, 3), AttendState.Absent) ]);
        res.allUserAttendance.set('DummyUser2', [ new Attendance(new Date(2019, 6, 1), AttendState.Attendance), new Attendance(new Date(2019, 6, 2), AttendState.Undecided), new Attendance(new Date(2019, 6, 3), AttendState.Absent) ]);
        res.allUserAttendance.set('DummyUser3', [ new Attendance(new Date(2019, 6, 1), AttendState.Attendance), new Attendance(new Date(2019, 6, 2)), new Attendance(new Date(2019, 6, 3), AttendState.Absent) ]);

        res.targetDays.push(new Date(2019, 6, 1), new Date(2019, 6, 2), new Date(2019, 6, 3));

        return res;
    }

    private getTargetDays(): Attendance[] {
        const res: Attendance[] = [];
        this.eventInfo.targetDays.forEach( (x) => {
            res.push(new Attendance(new Date(x.toString())));
        });
        return res;
    }

    private getDummuyDays(): Attendance[] {
        const res: Attendance[] = [];

        res.push(new Attendance(new Date(2019, 6, 1)));
        res.push(new Attendance(new Date(2019, 6, 2)));
        res.push(new Attendance(new Date(2019, 6, 3)));

        return res;
    }

    private createAttendancePostData(): object[] {
            const req: object[] = [];
            let rowData = {};
            let tmpRowData = {};
            let keyName: string;
            let value: string;

            this.userAnswer.forEach( (x) => {
                keyName = 'eventId';
                value = this.$route.params.value;
                rowData = { [keyName]: value };

                keyName = 'userName';
                value = this.userName;
                tmpRowData = { [keyName]: value };
                rowData = Object.assign(rowData, tmpRowData);

                keyName = 'targetDate';
                value = x.date.toLocaleDateString();
                tmpRowData = { [keyName]: value };
                rowData = Object.assign(rowData, tmpRowData);

                keyName = 'state';
                value = x.userState.toString();
                tmpRowData = { [keyName]: value };
                rowData = Object.assign(rowData, tmpRowData);

                req.push(rowData);
            });
            return req;
    }

    private async putEvent() {
        try {
            const res = await axios.post(Url.USER_ATTENDANCE_API, JSON.stringify(this.createAttendancePostData()));
            alert(Message.I0002('登録'));
        } catch (error) {
            console.log(error);
        }
    }

    private setUserAnswer() {
        if (this.eventInfo.allUserAttendance === undefined) {
            this.eventInfo.allUserAttendance = new Map<string, Attendance[]>();
        }
        this.eventInfo.allUserAttendance.set(this.userName, this.userAnswer);
    }

    private onClickSubmit(evt: Event) {
        evt.preventDefault();
        if (this.eventInfo.allUserAttendance !== undefined) {
            const userNameList = Array.from(this.eventInfo.allUserAttendance.keys());
            if (userNameList.includes(this.userName)) {
                alert('ユーザー名の重複があります。別の名前を使用してください。');
                return;
            }
        } 
        this.setUserAnswer();
        this.putEvent();
        this.getEvent(this.$route.params.value);
        // this.$router.push({ name: Url.EVENT_PAGE_NAME, params: { value: this.$route.params.value } });
        this.Init(this.$route.params.value);
        
    }
}
</script>

<style scoped>
  .introduce{
    margin-top: 2rem;
  }
  .input_row {
      height: 3rem;
  }
  .input_select {
      height: 2rem;
  }
  .buttom_space {
    margin: 2rem;
  }
  .toggle_button {
      margin-left: 4rem;
      margin-bottom: 4rem;
  }
  .text_margin {
      margin-top: 4rem;
      margin-bottom: 4rem;
  }
  .label_text {
      font-weight: bold;
  }
</style>
