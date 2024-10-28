const arr = [0,1,2,3,4,5]

const squareList = arr.map(x => x * x)

console.log(squareList)

const filtered = arr.filter(x => x > 3)

console.log(filtered)

console.log(arr.find(e => e > 3))
console.log(arr.findIndex(e => e > 3))

const sum = arr.reduce((a, e) => a + e, 0)
console.log(sum)