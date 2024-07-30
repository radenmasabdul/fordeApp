<script setup>
import Layout from "../../layout/Layout.vue";
import Logo from "../../assets/logo.jpg";
import { ref } from "vue";

const isCollapsePersonal = ref(true);
const isCollapseEmployee = ref(true);

const collapseAction = (field) => {
  if (field === "personal") {
    isCollapsePersonal.value = !isCollapsePersonal.value;
  } else if (field === "employee") {
    isCollapseEmployee.value = !isCollapseEmployee.value;
  }
};

let classStyle =
  "font-JakartaSans font-semibold text-base capitalize block bg-#e0e0e0 w-96 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1";
</script>

<template>
  <Layout>
    <div class="flex flex-wrap justify-around mx-4 my-4 gap-2 bg-base">
      <div class="avatar">
        <div class="w-32 rounded-full">
          <img :src="Logo" />
        </div>
      </div>

      <div class="py-8">
        <h1 class="font-JakartaSans text-2xl font-bold text-black">Samantha Williams</h1>
        <h1 class="font-JakartaSans text-2xl font-bold text-black">990922</h1>
      </div>

      <div class="py-8">
        <h1>Departement: <span class="font-JakartaSans text-2xl font-bold text-black"> Sales & Marketing </span></h1>
        <h1>Position: <span class="font-JakartaSans text-2xl font-bold text-black"> Marketing Manager </span></h1>
      </div>
    </div>

    <div class="py-4 mx-4">
      <div class="collapse collapse-arrow bg-base-200" @click="() => collapseAction('personal')">
        <input type="radio" name="my-accordion-2" checked="checked" class="cursor-pointer" />
        <div class="collapse-title text-xl font-medium">Personal Info</div>
        <div class="collapse-content" v-if="isCollapsePersonal">
          <div class="flex flex-wrap justify-around items-center pt-4">
            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="names">Name</label>
              <input type="text" id="names" name="names" :class="classStyle" disabled />
            </div>

            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="en"
                >Employee Identification Number</label
              >
              <input type="text" id="en" name="en" :class="classStyle" disabled />
            </div>
          </div>

          <div class="flex flex-wrap justify-around items-center pt-4">
            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="dept">Departement</label>
              <input type="text" id="dept" name="dept" :class="classStyle" disabled />
            </div>

            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="pos">Position</label>
              <input type="text" id="pos" name="pos" :class="classStyle" disabled />
            </div>
          </div>

          <div class="flex flex-wrap justify-start items-center mx-10">
            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="phones">Phone</label>
              <input type="text" name="phones" id="phones" :class="classStyle" disabled />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="py-4 mx-4">
      <div class="collapse collapse-arrow bg-base-200">
        <input
          type="radio"
          name="my-accordion-3"
          checked="checked"
          class="cursor-pointer"
          @click="() => collapseAction('employee')"
        />
        <div class="collapse-title text-xl font-medium">Employee Info</div>
        <div class="collapse-content" v-if="isCollapseEmployee">
          <div>
            <button class="btn btn-info btn-sm">
              <span><font-awesome-icon :icon="['fas', 'pen-to-square']" style="color: #ffffff" /></span>
            </button>
          </div>

          <div class="flex flex-wrap justify-around items-center pt-4">
            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="start">Join Date</label>
              <input type="date" id="start" name="start" :class="classStyle" disabled />
            </div>

            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="init">Initial Join Date</label>
              <input type="date" id="init" name="init" :class="classStyle" disabled />
            </div>
          </div>

          <div class="flex flex-wrap justify-around items-center pt-4">
            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="terminate">Terminate Date</label>
              <input type="date" id="terminate" name="terminate" :class="classStyle" disabled />
            </div>

            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="type">Type of Contract</label>
              <select name="type" id="type" :class="classStyle" disabled>
                <option></option>
                <option value="pkwt">PKWT</option>
                <option value="pkwtt">PKWTT</option>
              </select>
            </div>
          </div>

          <div class="flex flex-wrap justify-around items-center pt-4">
            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="work">Work Experience</label>
              <select name="work" id="work" :class="classStyle" disabled>
                <option></option>
                <option value="1">1 Years</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="4">4 Years</option>
                <option value="5">5 Years</option>
                <option value="6+">6+ Years</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="recruitment">Recruitment Type</label>
              <select name="recruitment" id="recruitment" :class="classStyle" disabled>
                <option></option>
                <option value="linkedin">LinkedIn</option>
                <option value="glints">Glints</option>
                <option value="jobstreet">Job Street</option>
              </select>
            </div>
          </div>

          <div class="flex flex-wrap justify-around items-center pt-4">
            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="service">Service Length Total</label>
              <input type="text" name="service" id="service" :class="classStyle" disabled />
            </div>

            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="status">Employee Status</label>
              <select name="status" id="status" :class="classStyle" disabled>
                <option></option>
                <option value="active">Active</option>
                <option value="nonactive">Non Active</option>
              </select>
            </div>
          </div>

          <div class="flex flex-wrap justify-around items-center pt-4">
            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="reason">Exit Reason</label>
              <select name="reason" id="reason" :class="classStyle" disabled>
                <option></option>
                <option value="study">Study</option>
                <option value="switchcareer">Switch Career</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="exit">Exit Date</label>
              <input type="date" name="exit" id="exit" :class="classStyle" disabled />
            </div>
          </div>

          <div class="flex flex-wrap justify-start items-center mx-10">
            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="resign">Resign Tender Date</label>
              <input type="text" name="resign" id="resign" :class="classStyle" disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped></style>
