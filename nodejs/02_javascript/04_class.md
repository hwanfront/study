# 프로토타입
```js
var Human = function(type) {
  this.type = type || 'human';
}

Human.isHuman = function(human) {
  return human instanceof Human;
}

Human.prototype.breath = function() {
  alert('h-a-a-a-m');
}

var Zero = function (type, firstName, lastName) {
  Human.apply(this, arguments);
  this.firstName = firstName;
  this.lastName = lastName;
}

Zero.prototype = Object.create(Human.prototype);
Zero.prototype.constructor = Zero; // 상속
Zero.prototype.sayName = function() {
  this.breath();
  alert(this.firstName + ' ' + this.lastName);
}
var oldZero = new Zero('human', 'Zero', 'Cho');
Human.isHuman(oldZero); // true
```
# 클래스
```js
class Human {
  constructor(type = 'human') {
    this.type = type;
  }

  static isHuman(human) {
    return human instanceof Human;
  }

  breath() {
    alert('h-a-a-a-m');
  }
}

class Zero extends Human {
  constructor(type, firstName, lastName) {
    super(type);
    this.firstName = firstName;
    this.lastName = lastName;
  }

  sayName() {
    super.breath();
    alert(`${this.firstName} ${this.lastName}`)
  }
}
const newZero = new Zero('human', 'Zero', 'Cho');
```