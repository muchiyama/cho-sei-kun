<template>
    <div>
        <b-container fluid>
            <b-row>
                <b-col/>
                <b-col>
                    <div>
                        <b-jumbotron class="introduce" header="BAD URL"/>
                    </div>
                </b-col>
                <b-col/>
            </b-row>
        </b-container>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator';

@Component
export default class Error extends Vue { }
</script>

<style scoped>
  .introduce{
    margin-top: 2rem;
  }
</style>
