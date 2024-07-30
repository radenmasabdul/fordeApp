import { defineStore } from 'pinia';
import initialData from '../data.json'; // Mengimpor data JSON

const LOCAL_STORAGE_KEY = 'employeeData';

export const useemployeeStore = defineStore('employee', {
    state: () => ({
        dataEmployee: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || initialData.dataEmployee,
        isLoading: false,
    }),
    getters: {
        getDataEmployee(state) {
            return state.dataEmployee;
        }
    },
    actions: {
        saveToLocalStorage() {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.dataEmployee));
        },
        dataListEmployee(forceRefresh = false) {
            if (this.isLoading || (!forceRefresh && this.dataEmployee.length > 0)) return;

            this.isLoading = true;

            this.isLoading = false;
        }
    }
});
