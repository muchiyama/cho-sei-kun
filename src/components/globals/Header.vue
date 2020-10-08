
<template>
	<header id="heder" style="background:#99ffdd">
		<div>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item to="/">Home</b-nav-item>

      <!-- Navbar dropdowns -->
      <b-nav-item-dropdown text="pages" right>
        <b-dropdown-item  to="/SelectEvent">SelectEvent</b-dropdown-item>
        <b-dropdown-item to="/EventRegistry">CreateSchedule</b-dropdown-item>
        <!-- <b-dropdown-item to="/EventPage">ScheduleInfo</b-dropdown-item> -->
      </b-nav-item-dropdown>

      <b-nav-item-dropdown text="User" right>
        <b-dropdown-item  to="/UserRegistry">CreateAccount</b-dropdown-item>
        <b-dropdown-item to="/login">Log in</b-dropdown-item>
        <b-dropdown-item to="/Logout">Log out</b-dropdown-item>
      </b-nav-item-dropdown>
	  <h2 style="color:white;">Cho-sei</h2>
    </b-navbar-nav>
  </b-navbar>
</div>
	</header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Url from '@/common/const/Url.ts';
import HeaderHelper from '@/common/const/HeaderHelper';
import TokenManager from '@/auth/TokenManager';

@Component
export default class Header extends Vue { }
</script>
