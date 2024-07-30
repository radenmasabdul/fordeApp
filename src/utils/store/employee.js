import { defineStore } from 'pinia';
import initialData from '../data.json';

const LOCAL_STORAGE_KEY = 'employeeData';

export const useemployeeStore = defineStore('employee', {
    state: () => ({
        dataEmployee: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || initialData.dataEmployee,
        isLoading: false,
        search: "",
        filterStatus: "",
    }),
    getters: {
        getDataEmployee(state) {
            return state.dataEmployee;
        },
        filtersDataEmployee(state) {
            // console.log('Filtering employees:', state.dataEmployee);
            return state.dataEmployee.filter(data => {
                const fullname = data?.fullname?.toLowerCase() || "";
                const position = data?.position?.toLowerCase() || "";
                const departement = data?.departement?.toLowerCase() || "";
                const employee_status = data?.employee_status?.toLowerCase() || "";

                const matchesSearch = fullname.includes(state.search.toLowerCase()) ||
                    position.includes(state.search.toLowerCase()) ||
                    departement.includes(state.search.toLowerCase()) ||
                    employee_status.includes(state.search.toLowerCase());

                const matchesStatus = state.filterStatus ? employee_status === state.filterStatus.toLowerCase() : true;

                return matchesSearch && matchesStatus;
            });
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

            // Simulate fetching data
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        },
        setSearchKeyword(keyword) {
            this.search = keyword;
        },
        setFilterStatus(status) {
            this.filterStatus = status;
        }
    }
});
