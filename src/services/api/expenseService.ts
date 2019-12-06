import { HTTP } from '../common/Api';
import Vue from 'vue'

 class ExpenseService {
    
    getExpenses() {
        return HTTP.get('/availableMonths')
            .then(response => {
                return response.data;
            })
            .catch(error => console.log(error))
            .finally(() => {

            })
    }

}

export const Service = new ExpenseService();