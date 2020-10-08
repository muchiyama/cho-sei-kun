<template>
  <b-container fluid>
    <b-row>
      <b-col/>
      <b-col cols="10">
          <EventPageForm/>
      </b-col>
      <b-col/>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EventPageForm from '@/components/module/EventPageForm.vue';

@Component({
    components: {
        EventPageForm,
    },
})
export default class EventPage extends Vue { }
</script>

