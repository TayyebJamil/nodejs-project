// 6. Method overriding: Employee extends Person
class Person {
    constructor(name){
        this.name = name;
    }
    describe(){
        return `Person ${this.name}`;
    }
}

class Employee extends Person {
    constructor(name, salery){
        super(name);
        this.salery = salery;
    }
    describe(){
        return `Employee ${this.name}, ${this.salery}`;
    }
}

const p = new Person('John');
console.log(p.describe());
const e = new Employee('John', 1000);
console.log(e.describe());