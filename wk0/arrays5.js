let a = [ 1, 2, 3, 4, 5, 6 ]

console.log(a)
console.log(a.shift())
console.log(a)
a.unshift(10)
console.log(a)
a.push(11)
console.log(a)
console.log(a.pop())
console.log(a.indexOf(3))
console.log(a.indexOf(13))

console.log(a.slice(0, a.length))
console.log(a.slice(0, 3))

console.log(a)
a.splice(2, 2, 'b', true, 'c')

console.log(a)
