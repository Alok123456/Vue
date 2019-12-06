import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from './Dashboard.html';
import Planned from './../../views/Planned.vue';
import { Category, MonthExpense, Item } from '@/expense-types/category';
// import { expenseService }  from '@/services/api/expenseService';
import store from '@/store/index'
import { mapState, mapGetters } from 'vuex';

@WithRender
@Component({})
export default class Dashboard extends Vue {

    private monthlyExpense: Array<MonthExpense>;
    private monthNames: Array<any> = [ "January", "February", "March", "April", "May", "June",
                                       "July", "August", "September", "October", "November", "December"];
    public currentMonth: String = '';
    public showComponent: boolean = false;

    constructor() {
        super();
        this.monthlyExpense = [];
    }

    created() {
        this.currentMonth = this.getExistingMonth();
        this.trackMonthChangeState();
        // expenseService.getExpenses();
    }  

    trackMonthChangeState() {
        this.$store.dispatch("changeCurrentMonthState", this.currentMonth);
    }

    getExistingMonth(monthNo?: number) {
        const d = new Date();
        const month = monthNo ? this.monthNames[this.monthNames.findIndex((el) => el === this.currentMonth) + monthNo] : this.monthNames[d.getMonth()];
        return month;
    }

    AddMonthlyCategory(category: Category): void {
            const index = this.monthlyExpense.findIndex((el) => el.month === this.currentMonth);
            if(!(index >= 0)) {
                this.monthlyExpense.push({month: this.currentMonth, expense_planned: [category]});
            } else {
                this.monthlyExpense[index].expense_planned.push(category);
            }
        this.$store.dispatch("addMonthlyCategory", this.monthlyExpense);
    }

    AddMonthlyCategItem(item: Item, categName: string) {
        console.log('......', item, categName);
        const index = this.monthlyExpense.findIndex((el) => el.month === this.currentMonth);
        const categIndex = index >= 0 ? this.monthlyExpense[index].expense_planned.findIndex((el)=> el.name === categName) : index;
            if(categIndex >= 0) {
                this.monthlyExpense[index].expense_planned[categIndex].items.push(item);
            }
            this.$store.dispatch("addMonthlyCategory", this.monthlyExpense);
    }

    nextMonth() {
        if(!(this.currentMonth === 'December')) {
            this.currentMonth = this.getExistingMonth(1);
            this.trackMonthChangeState();
        }
    }

    prevMonth() {
        if(!(this.currentMonth === 'January')) {
            this.currentMonth = this.getExistingMonth(-1);
            this.trackMonthChangeState();
        }
    }

    @Watch('$route', {immediate: true, deep: true})
    onUrlChange(newVal: any) {
        console.log('newVal', newVal);
        if(newVal.fullPath === '/' && newVal.name === null) {
            this.showComponent = false;
        } else {
            this.showComponent = true;
        }
    }

}