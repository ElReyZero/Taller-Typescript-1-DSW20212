import { Course } from './course.js';

class Person
{
    name: string;
    code: number;
    cardID: number;

    constructor (completeName: string, code:number, cardID:number)
    {
        this.name = completeName;
        this.code = code;
        this.cardID = cardID;
    }
}

export class Student extends Person
{
    age: number;
    address: string;
    phone: string;
    currentCourses: Course[];
    
    constructor(completeName: string, code: number, cardId:number, age:number, address:string, phone:string, currentCourses : Course[])
    {
        super(completeName, code, cardId);
        this.age = age;
        this.address = address;
        this.phone = phone;
        this.currentCourses = currentCourses;
    }
}