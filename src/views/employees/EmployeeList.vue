<script setup>
import Layout from "../../layout/Layout.vue";
import Table from "../../components/Table.vue";

import { ref, computed } from "vue";
import { useemployeeStore } from "../../utils/store/employee.js";

const employeeStore = useemployeeStore();
const employees = computed(() => employeeStore.filtersDataEmployee);
const searchKeyword = ref(employeeStore.getSearchData);

let showingValue = ref(1);
let pageMultiplier = ref(10);

const selectedStatus = ref("");

const tableHead = [
  { id: 1, title: "No" },
  { id: 2, title: "Name" },
  { id: 3, title: "Departement" },
  { id: 4, title: "Position" },
  { id: 5, title: "Status" },
  { id: 6, title: "Actions" },
];

const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    employeeStore.setSearchKeyword(searchKeyword.value);
  }
};

const clearSearch = () => {
  searchKeyword.value = "";
  employeeStore.setSearchKeyword("");
};

const onChangePage = (pageOfItem) => {
  showingValue.value = pageOfItem;
};

const paginatedUsers = computed(() => {
  const start = (showingValue.value - 1) * pageMultiplier.value;
  const end = start + pageMultiplier.value;
  return employees.value.slice(start, end);
});

const filterData = () => {
  employeeStore.setFilterStatus(selectedStatus.value);
};

const resetData = () => {
  selectedStatus.value = "";
  employeeStore.setFilterStatus("");
};

const inputClass =
  "w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600 font-JakartaSans focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1";

let classStyles =
  "font-JakartaSans font-semibold text-base capitalize block bg-#e0e0e0 w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1";
</script>

<template>
  <Layout>
    <div class="flex flex-wrap justify-start mx-5 my-2">
      <h1 class="font-JakartaSans text-2xl font-bold text-black my-2">Employee</h1>
    </div>

    <div class="grid grid-flow-col auto-cols-max gap-2 mx-5 py-2 justify-between">
      <div class="flex flex-wrap items-center gap-4">
        <div>
          <label class="capitalize font-JakartaSans text-xs text-black font-medium pb-2" for="status">Status</label>
          <select :class="classStyles" name="status" id="status" v-model="selectedStatus">
            <option disabled selected>Status</option>
            <option value="Active">Active</option>
            <option value="Non Active">Non Active</option>
          </select>
        </div>

        <div class="flex gap-2 items-center pt-6">
          <button class="btn btn-success btn-sm" @click="filterData">
            <span><font-awesome-icon :icon="['fas', 'filter']" style="color: #ffffff" /></span>
          </button>
          <button class="btn btn-error btn-sm" @click="resetData">
            <span><font-awesome-icon :icon="['fas', 'circle-xmark']" style="color: #ffffff" /></span>
          </button>
        </div>
      </div>

      <div class="pt-6 flex md:mx-0">
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search..."
          :class="inputClass"
          v-model="searchKeyword"
          @keypress="handleKeyPress"
          @click="clearSearch"
        />
      </div>
    </div>

    <div class="mx-5">
      <label class="text-xs font-JakartaSans font-normal" for="showing">Showing</label>
      <select :class="inputClass" v-model="pageMultiplier" id="showing" name="showing">
        <option>10</option>
        <option>25</option>
        <option>50</option>
        <option>75</option>
        <option>100</option>
      </select>
    </div>

    <div class="mx-5 my-2" v-if="paginatedUsers.length > 0">
      <Table>
        <thead class="text-center bg-blue-600">
          <tr>
            <th v-for="data in tableHead" :key="data.id" class="font-JakartaSans font-bold text-sm text-white">
              {{ data.title }}
            </th>
          </tr>
        </thead>

        <tbody class="text-center">
          <tr v-for="(data, index) in paginatedUsers" :key="data.id">
            <th>{{ index + 1 + (showingValue - 1) * pageMultiplier }}</th>
            <td>{{ data.fullname }}</td>
            <td>{{ data.departement }}</td>
            <td>{{ data.position }}</td>
            <td>{{ data.employee_status }}</td>
            <td class="flex flex-wrap justify-center items-center gap-4">
              <router-link :to="`/employees_details/${data.id}`">
                <button class="btn btn-info btn-sm">
                  <span><font-awesome-icon :icon="['fas', 'eye']" style="color: #ffffff" /></span>
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>

    <div class="mx-5 my-2" v-else>
      <Table>
        <thead class="text-center bg-blue-600">
          <tr>
            <th v-for="data in tableHead" :key="data.id" class="font-JakartaSans font-bold text-sm text-white">
              {{ data.title }}
            </th>
          </tr>
        </thead>

        <tbody class="text-center">
          <tr>
            <td colspan="6" class="text-center font-JakartaSans text-sm text-black">Data not Found</td>
          </tr>
        </tbody>
      </Table>
    </div>

    <div class="mx-5 mt-2 mb-4">
      <p class="font-JakartaSans text-xs font-normal text-[#888888] py-2">
        Showing {{ (showingValue - 1) * pageMultiplier + 1 }} to
        {{ Math.min(showingValue * pageMultiplier, employees.length) }}
        of {{ employees.length }} entries
      </p>
      <vue-awesome-paginate
        :total-items="employees.length"
        :items-per-page="parseInt(pageMultiplier)"
        :on-click="onChangePage"
        v-model="showingValue"
        :max-pages-shown="4"
        :show-breakpoint-buttons="false"
        :show-ending-buttons="true"
      />
    </div>
  </Layout>
</template>

<style scoped></style>
