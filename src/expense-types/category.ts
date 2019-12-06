export class Item {
    name: String = '';
    expense: String = '';
}

export class Category {
    name: String = '';
    amount: String = '';
    items: Array<Item> = new Array<Item>();
}

export class MonthExpense {
    month: String = '';
    expense_planned: Array<Category> =  new Array<Category>();
}
