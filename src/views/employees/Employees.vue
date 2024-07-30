<script setup>
import Layout from "../../layout/Layout.vue";

import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useemployeeStore } from "../../utils/store/employee.js";

import Swal from "sweetalert2";

const route = useRoute();
const employeeStore = useemployeeStore();
const employeeId = route.params.id;
const employee = ref(null);
const originalEmployeeData = ref(null);

const isCollapsePersonal = ref(true);
const isCollapseEmployee = ref(true);
const isActive = ref(false);
const isDisabled = ref(false);

onBeforeMount(() => {
  const employeeData = employeeStore.getDataEmployee.find((emp) => emp.id === parseInt(employeeId));
  if (employeeData) {
    employee.value = { ...employeeData }; // salin data untuk edit
    originalEmployeeData.value = { ...employeeData }; // original data
  }
  // console.log("employeeData:", employeeData);
});

const editData = () => {
  isActive.value = true;
  isDisabled.value = true;
};

const cancelEdit = () => {
  isActive.value = false;
  isDisabled.value = false;

  //reset state ke original
  if (originalEmployeeData.value) {
    employee.value = { ...originalEmployeeData.value };
  }
};

const saveEdit = () => {
  isActive.value = false;

  if (employee.value) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Successful Update",
      showConfirmButton: false,
      timer: 1500,
    });

    employeeStore.updateEmployee(employee.value);
  }

  isDisabled.value = false;
};

const collapseAction = (field) => {
  if (field === "personal") {
    isCollapsePersonal.value = !isCollapsePersonal.value;
  } else if (field === "employee") {
    isCollapseEmployee.value = !isCollapseEmployee.value;
  }
};

let classStyle =
  "font-JakartaSans font-semibold text-base capitalize block bg-#e0e0e0 w-96 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 cursor-not-allowed";

let classStyles =
  "font-JakartaSans font-semibold text-base capitalize block bg-#e0e0e0 w-96 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1";
</script>

<template>
  <Layout>
    <!-- highlights -->
    <div class="flex flex-wrap justify-around mx-4 my-4 gap-2 bg-base">
      <div class="avatar">
        <div class="w-32 rounded-full">
          <img :src="employee?.image_url" />
        </div>
      </div>

      <div class="py-8">
        <h1 class="font-JakartaSans text-2xl font-bold text-black">{{ employee?.fullname }}</h1>
        <h1 class="font-JakartaSans text-2xl font-bold text-black">{{ employee?.employee_identification_number }}</h1>
      </div>

      <div class="py-8">
        <h1>
          Departement: <span class="font-JakartaSans text-2xl font-bold text-black">{{ employee?.departement }}</span>
        </h1>
        <h1>
          Position: <span class="font-JakartaSans text-2xl font-bold text-black">{{ employee?.position }}</span>
        </h1>
      </div>
    </div>

    <!-- personal info -->
    <div class="py-4 mx-4">
      <div class="collapse collapse-arrow bg-base-200" @click="() => collapseAction('personal')">
        <input type="radio" name="my-accordion-2" checked="checked" class="cursor-pointer" />
        <div class="collapse-title text-xl font-medium">Personal Info</div>
        <div class="collapse-content" v-if="isCollapsePersonal">
          <div class="flex flex-wrap justify-around items-center pt-4">
            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="names">Name</label>
              <input type="text" id="names" name="names" :class="classStyle" disabled :value="employee?.fullname" />
            </div>

            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="en"
                >Employee Identification Number</label
              >
              <input
                type="text"
                id="en"
                name="en"
                :class="classStyle"
                disabled
                :value="employee?.employee_identification_number"
              />
            </div>
          </div>

          <div class="flex flex-wrap justify-around items-center pt-4">
            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="dept">Departement</label>
              <input type="text" id="dept" name="dept" :class="classStyle" disabled :value="employee?.departement" />
            </div>

            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="pos">Position</label>
              <input type="text" id="pos" name="pos" :class="classStyle" disabled :value="employee?.position" />
            </div>
          </div>

          <div class="flex flex-wrap justify-around items-center">
            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="phones">Phone</label>
              <input type="text" name="phones" id="phones" :class="classStyle" disabled :value="employee?.phone" />
            </div>

            <div class="w-96"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- employee info -->
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
          <div class="flex flex-wrap justify-start items-center gap-2 mx-10">
            <button class="btn btn-info btn-sm" @click="editData" v-if="!isDisabled">
              <span><font-awesome-icon :icon="['fas', 'pen-to-square']" style="color: #ffffff" /></span>
            </button>

            <div class="flex items-center gap-2" v-if="isDisabled">
              <button class="btn btn-success btn-sm" @click="saveEdit">
                <span><font-awesome-icon :icon="['fas', 'circle-check']" style="color: #ffffff" /></span>
              </button>

              <button class="btn btn-error btn-sm" @click="cancelEdit">
                <span><font-awesome-icon :icon="['fas', 'circle-xmark']" style="color: #ffffff" /></span>
              </button>
            </div>
          </div>

          <div class="flex flex-wrap justify-around items-center pt-4">
            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="start">Join Date</label>
              <input
                type="date"
                id="start"
                name="start"
                :class="classStyles"
                :disabled="!isActive"
                v-model="employee.join_date"
              />
            </div>

            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="init">Initial Join Date</label>
              <input
                type="date"
                id="init"
                name="init"
                :class="classStyles"
                :disabled="!isActive"
                v-model="employee.initial_join_date"
              />
            </div>
          </div>

          <div class="flex flex-wrap justify-around items-center pt-4">
            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="terminate">Terminate Date</label>
              <input
                type="date"
                id="terminate"
                name="terminate"
                :class="classStyles"
                :disabled="!isActive"
                v-model="employee.terminate_date"
              />
            </div>

            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="type">Type of Contract</label>
              <select
                name="type"
                id="type"
                :class="classStyles"
                :disabled="!isActive"
                v-model="employee.type_of_contract"
              >
                <option></option>
                <option value="PKWT">PKWT</option>
                <option value="PKWTT">PKWTT</option>
              </select>
            </div>
          </div>

          <div class="flex flex-wrap justify-around items-center pt-4">
            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="work">Work Experience</label>
              <select
                name="work"
                id="work"
                :class="classStyles"
                :disabled="!isActive"
                v-model="employee.work_experience"
              >
                <option></option>
                <option value="1">1 Years</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="4">4 Years</option>
                <option value="5">5 Years</option>
                <option value="6">6+ Years</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="recruitment">Recruitment Type</label>
              <select
                name="recruitment"
                id="recruitment"
                :class="classStyles"
                :disabled="!isActive"
                v-model="employee.recruitment_type"
              >
                <option></option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Glints">Glints</option>
                <option value="JobStreet">Job Street</option>
              </select>
            </div>
          </div>

          <div class="flex flex-wrap justify-around items-center pt-4">
            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="service">Service Length Total</label>
              <input
                type="text"
                name="service"
                id="service"
                :class="classStyles"
                :disabled="!isActive"
                v-model="employee.service_length_total"
              />
            </div>

            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="status">Employee Status</label>
              <select
                name="status"
                id="status"
                :class="classStyles"
                :disabled="!isActive"
                v-model="employee.employee_status"
              >
                <option></option>
                <option value="Active">Active</option>
                <option value="Non Active">Non Active</option>
              </select>
            </div>
          </div>

          <div class="flex flex-wrap justify-around items-center pt-4">
            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="reason">Exit Reason</label>
              <select
                name="reason"
                id="reason"
                :class="classStyles"
                :disabled="!isActive"
                v-model="employee.exit_reason"
              >
                <option></option>
                <option value="study">Study</option>
                <option value="switchcareer">Switch Career</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="exit">Exit Date</label>
              <input
                type="date"
                name="exit"
                id="exit"
                :class="classStyles"
                :disabled="!isActive"
                v-model="employee.exit_date"
              />
            </div>
          </div>

          <div class="flex flex-wrap justify-around items-center mx-10">
            <div class="mb-3">
              <label class="block mb-2 font-JakartaSans font-medium text-sm" for="resign">Resign Tender Date</label>
              <input
                type="text"
                name="resign"
                id="resign"
                :class="classStyles"
                :disabled="!isActive"
                v-model="employee.resign_tender_date"
              />
            </div>

            <div class="w-96"></div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped></style>
