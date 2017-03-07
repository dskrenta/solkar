export default class Person {
  constructor (name, age, height, weight) {
    this.name = name;
    this.age = age;
    this.height = height;
    this.weight = weight;
  }
  toString () {
    return `Name: ${this.name}, Age: ${this.age}, Height: ${this.height}, Weight: ${this.weight}`;
  }
}
