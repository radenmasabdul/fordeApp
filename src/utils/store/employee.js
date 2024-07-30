import { defineStore } from 'pinia';
import initialData from '../data.json';

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
        updateEmployee(updatedEmployee) {
            const index = this.dataEmployee.findIndex(emp => emp.id === updatedEmployee.id);
            if (index !== -1) {
                this.dataEmployee[index] = updatedEmployee;
                this.saveToLocalStorage();
            }
        },
        dataListEmployee(forceRefresh = false) {
            if (this.isLoading || (!forceRefresh && this.dataEmployee.length > 0)) return;

            this.isLoading = true;

            this.isLoading = false;
        }
    }
});
