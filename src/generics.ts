// ** 제네릭 타입 **
// 제네릭 인터페이스 구문
interface IValuable<T> {
    value: T
}

// 제네릭 함수 구문
function identity<T>(arg: T): T {return arg}

// 제네릭 타입 별칭 구문
type typeValuable<T> = {
    value: T
}

// 제네릭 클래스 구문
class Valuable<T> implements IValuable<T>{
    constructor(public value: T) {}
}

// const printValue = <T>(o: IValuable<T>): void => console.log(o.value)
//
// printValue(new Valuable<number>(1)) // 1
// printValue(new Valuable<boolean>(true)) // true
// printValue(new Valuable<string>('hello')) // hello
// printValue(new Valuable<number[]>([1,2,3])) // [1,2,3]

// 제네릭 타입 제약 구문
// const printValueT = <Q, T extends IValuable<Q>>(o: T) => console.log(o.value)
//
// printValueT(new Valuable(1)) // 1
// printValueT({value: true}) // true

// const create = <T>(type: T): T => new type()

// const create = <T extends {new(): T}>(type: T): T => new type()
// // 좀 더 간결하게 표현
// const create2 = <T>(type: new() => T): T => new type()

// const create = <T>(type: {new(...args): T}, ...args): T => new type(...args)
//
// class Point {
//     constructor(public x: number, public y:number) {}
// }
// [
//     create(Date), // 2023-07-06T01:03:44.875Z
//     create(Point, 0, 0) // Point {x: 0, y: 0}
// ].forEach(s => console.log(s))

// ** 인덱스 타입 제약 **
const obj = {
    name: 'Jane',
    age: 22,
    city: 'Seoul',
    country: 'Korea'
}

// const pick = (obj, keys) => keys.map(key => ({[key] : obj[key]}))
//     .reduce((result, value) => ({...result, ...value}), {})
//


// const pick = <T, K extends keyof T>(obj: T, keys: K[]) =>
//     keys.map(key => ({[key]: obj[key]}))
//         .reduce((result, value) => ({...result, ...value}), {})
//
// console.log(
//     pick(obj,['name', 'age']), // { name: 'Jane', age: 22 }
//     pick(obj, ['name', 'agee']) // { name: 'Jane', agee: undefined }
// )