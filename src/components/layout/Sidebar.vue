<script setup>
import macraLogo from "../../assets/macra.svg";
import dashboardLogo from "../../assets/dashboard.svg";
import employeesLogo from "../../assets/people.svg";
import organizationLogo from "../../assets/organization.svg";
import payrollLogo from "../../assets/insurance.svg";
import attendanceLogo from "../../assets/attendance.svg";
import leaveLogo from "../../assets/leave.svg";
import approvalLogo from "../../assets/approval.svg";
import portalLogo from "../../assets/portal.svg";
import companyLogo from "../../assets/company.svg";
import activityLogo from "../../assets/layer.svg";
import accessLogo from "../../assets/security-safe.svg";

const textClass = "font-JakartaSans text-black font-bold text-sm";
</script>

<template>
  <div class="lg:drawer-open bg-base-200 z-50">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
      <label for="my-drawer-2" class="lg:hidden">
        <font-awesome-icon :icon="['fas', 'bars']" class="w-8 h-8 cursor-pointer pt-4" />
      </label>
    </div>
    <div class="drawer-side scrolls">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>

      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <div class="py-4 mx-20">
          <img :src="macraLogo" />
        </div>

        <li>
          <router-link to="/">
            <img :src="dashboardLogo" />
            <span :class="textClass">Dashboard</span>
          </router-link>
        </li>

        <li>
          <router-link to="/employees">
            <img :src="employeesLogo" />
            <span :class="textClass">Employees</span>
          </router-link>
        </li>

        <li>
          <router-link to="#">
            <img :src="organizationLogo" />
            <span :class="textClass">Organization</span>
          </router-link>
        </li>

        <li>
          <router-link to="#">
            <img :src="payrollLogo" />
            <span :class="textClass">Payroll</span>
          </router-link>
        </li>

        <li>
          <router-link to="#">
            <img :src="attendanceLogo" />
            <span :class="textClass">Attendance</span>
          </router-link>
        </li>

        <li>
          <router-link to="#">
            <img :src="leaveLogo" />
            <span :class="textClass">Leave</span>
          </router-link>
        </li>

        <li>
          <router-link to="#">
            <img :src="approvalLogo" />
            <span :class="textClass">Approval</span>
          </router-link>
        </li>

        <li>
          <router-link to="#">
            <img :src="portalLogo" />
            <span :class="textClass">Portal</span>
          </router-link>
        </li>

        <li>
          <router-link to="#">
            <img :src="companyLogo" />
            <span :class="textClass">Company Details</span>
          </router-link>
        </li>

        <li>
          <router-link to="#">
            <img :src="activityLogo" />
            <span :class="textClass">Activity Logs</span>
          </router-link>
        </li>

        <li>
          <router-link to="#">
            <img :src="accessLogo" />
            <span :class="textClass">Access Level</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.drawer {
  position: relative;
  display: grid;
  grid-auto-columns: max-content auto;
}

.menu li :hover {
  background-color: #bbf7d0;
  color: white;
}
</style>
