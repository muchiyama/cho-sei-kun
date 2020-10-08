<template>
  <b-container fluid>
    <b-row>
      <b-col/>
      <b-col cols="10">
          <EventRegistryForm></EventRegistryForm>
      </b-col>
      <b-col/>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EventRegistryForm from '@/components/module/EventRegistryForm.vue';

@Component({
    components: {
        EventRegistryForm,
    },
})
export default class EventRegistry extends Vue { }
</script>

