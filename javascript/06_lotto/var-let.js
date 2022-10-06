const arr = [1, 2, 3, 4, 5];

for (var j = 0; j < arr.length; j++) {
  setTimeout(() => {
    console.log(arr[j], j);
  }, 1000 * (j + 1));
}
// undefined 5
// undefined 5
// undefined 5
// undefined 5
// undefined 5
console.log(j); // => 5

for (let i = 0; i < arr.length; i++) {
  setTimeout(() => {
    console.log(arr[i], i);
  }, 1000 * (i + 1));
}
// 1 0
// 2 1
// 3 2
// 4 3
// 5 4
// console.log(i); // error: not defined

function func() {
  var a = 1;
}
// console.log(a); // error: not defined

if (true) {
  var c = 1;
}
console.log(c); // => 1

if (true) {
  let d = 1;
}
// console.log(d); // error: not defined
