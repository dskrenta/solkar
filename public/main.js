import riot from 'riot';

import sayHello from './lib/sayHello';
import Person from './lib/person';
import Coord from './lib/coord';
import demo from './lib/demo';

import './components/sample.tag';

riot.mount('sample');

sayHello('David');

console.log('Some more stuff');

const david = new Person('David', 17, 200, 165);
const point = new Coord(100, 100, 'pizza');

let stuff = david.toString();
console.log(stuff);
point.toString();

;(() => {
  setTimeout(() => {
    sweetAlert("Oops...", "Something went wrong!", "error");
  }, 2000);
})();

demo()
  .then((data) => console.log(data));
