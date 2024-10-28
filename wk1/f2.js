function f(a, b, c) {
    return a + b + c
}

console.log(f(1,2,3))
console.log(f(1,2,3,4,5))

let f1 = f
console.log(f1(1,2,3))

let f2 = function (x) {
    return x * 2
}

console.log(f2(4))

let f3 = (x) => {
    return x * 2
}

let f4 = x => x * 2

console.log(f4(5))