<template>
    <div>
        <b-jumbotron class="introduce" header="Select Your Schedule" lead="please enter your schedule">
            EventName : {{ this.eventInfo.eventName }}
        </b-jumbotron>

        <b-table :items="this.items" :fields="this.fields"> 
            <template slot="select" slot-scope="row">
                <b-button @click="onSelectClick(row.item.id)" variant="info">Select</b-button>
            </template>
            <template slot="delete" slot-scope="row">
                <b-button @click="onDeleteClick(row.item.id)" variant="danger">delete</b-button>
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator';
import EventInfo from '@/components/model/EventInfo.ts';
import Attendance from '@/components/model/Attendance.ts';
import { AttendState } from '@/common/enum/AttendState';
import Moment from 'Moment';
import axios from '@/components/wrap/AxiosWrapper';
import Url from '@/common/const/Url';
import HeaderHelper from '@/common/const/HeaderHelper';
import Message from '@/common/const/Message';
import Auth from '@/auth/Auth';

@Component({
})
export default class SelectEventForm extends Vue {

    private eventInfo: EventInfo = new EventInfo();
    private fields: string[] | null = ['No Data'];
    private items: object[] | null = [];
    private tableHeader = [ 'eventName', 'startDate', 'endDate', 'select', 'delete' ];

    constructor() {
        super();
    }

    // public created() {
    // }

    public mounted() {
        this.Init();
    }

    private onSelectClick(id: string) {
        this.$bus.emit('setEventid', id);
        this.$router.push ({ name: Url.EVENT_PAGE_NAME,  params: { value: id } });
    }

    private onDeleteClick(id: string) {
        this.delete(id);
        console.log(id);
        this.Init();
    }

    private async delete(id: string) {
        try {
            const res = await axios.delete(Url.EVENT_API, {
                    params: {
                        id,
                    },
                    data: {},
            });
            this.Init();
        } catch (error) {
            console.log(error);
        }
    }

    private async Init() {
        try {
            this.fields = [];
            this.items = [];
            // this.fields = this.createTableHeader();
            const res = await axios.post(Url.ALL_EVENT_API, JSON.stringify(Auth.getEmail()));
            this.fields = this.createTableHeader();
            this.items = this.createTableData(res.data);
            this.$forceUpdate();
        } catch (error) {
            console.log(error);
        }
    }

    private createTableHeader(): string[] {
        return this.tableHeader;
    }

    private createTableData(Allevent: object[]): object[] {
        const tableData: object[] = [];
        let rowData = {};
        let tmpRowData = {};
        let keyName: string;
        let value: string;
        this.items = [];
        const eventInfo: EventInfo[] = Object.assign(Allevent);

        eventInfo.forEach( (x) => {
            keyName = 'id';
            value = x.id !== null ? x.id : '';
            rowData = { [keyName]: value };

            keyName = 'eventName';
            value = x.eventName;

            tmpRowData = { [keyName]: value };
            rowData = Object.assign(rowData, tmpRowData);

            keyName = 'startDate';
            value = new Date(x.targetDays[0].toString()).toLocaleDateString();

            tmpRowData = { [keyName]: value };
            rowData = Object.assign(rowData, tmpRowData);

            keyName = 'endDate';
            value = new Date(x.targetDays[x.targetDays.length - 1].toString()).toLocaleDateString();

            tmpRowData = { [keyName]: value };
            rowData = Object.assign(rowData, tmpRowData);
            tableData.push(rowData);
        });
        return tableData;
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
  }
  .label_text {
      font-weight: bold;
  }
</style>
