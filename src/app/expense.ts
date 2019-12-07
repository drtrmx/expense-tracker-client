import {Category} from './category';
import {Place} from './place';
import {User} from './user';

export class Expense {
    id: number;
    title: string = '';
    value: number;
    category?: Category;
    place?: Place;
    description: string = '';
    date: Date = new Date();
    owner: User;
}
