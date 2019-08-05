// Typescript beginner tutorial
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
    }
    return Student;
}());
// type annotation denotes that this function takes a single string as an arg
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student('Jane', 'M.', 'User');
document.body.textContent = greeter(user);
