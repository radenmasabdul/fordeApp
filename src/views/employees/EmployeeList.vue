<script setup>
import Layout from "../../layout/Layout.vue";
import Table from "../../components/Table.vue";

import { ref, computed } from "vue";
import { useemployeeStore } from "../../utils/store/employee.js";

const employeeStore = useemployeeStore();
const employees = computed(() => employeeStore.getDataEmployee);

const tableHead = [
  { id: 1, title: "No" },
  { id: 2, title: "Name" },
  { id: 3, title: "Departement" },
  { id: 4, title: "Position" },
  { id: 5, title: "Status" },
  { id: 6, title: "Actions" },
];
</script>

<template>
  <Layout>
    <div class="flex flex-wrap justify-start mx-5 my-2">
      <h1 class="font-JakartaSans text-2xl font-bold text-black my-2">Employee</h1>
    </div>

    <div class="mx-5 my-2" v-if="employees.length > 0">
      <Table>
        <thead class="text-center bg-blue-600">
          <tr>
            <th v-for="data in tableHead" :key="data.id" class="font-JakartaSans font-bold text-sm text-white">
              {{ data.title }}
            </th>
          </tr>
        </thead>

        <tbody class="text-center">
          <tr v-for="(data, index) in employees" :key="data.id">
            <th>{{ index + 1 }}</th>
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

    <div v-else>
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
  </Layout>
</template>

<style scoped></style>
