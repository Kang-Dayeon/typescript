// ** 함수 선언문 **
// function 함수이름(매개변수1: 타입1, 매개변수2: 타입2): 반환값 타입 {}
// function add(a: number, b:number): number {
//     return a + b
// }

// ** void **
// 값을 반환하지않는 함수
// function printMe(name: string, age: number): void {
//     console.log(`name: ${name}, age: ${age}`)
// }

// ** 함수 시그니처 타입 **
// 함수를 변수에 할당할때 해당 변수에 함수 시그니처 타입을 지정함 (ex: (string, number) => void)
// 그 시그니처 타입을 type 키워드로 이름을 변경해서 사용가능하다
// type stringNumberFunc = (string, number) => void
// let f: stringNumberFunc = function (a: string, b: number): void {}
// let g: stringNumberFunc = function (a: string, b: number): void {}

// ** undefined **
// undefined를 고려하지 않은 경우
// interface INameable {
//     name: string
// }
// function getName(o: INameable){return o.name}
// let n = getName(undefined)
// console.log(n) // 오류 발생

// undefined를 고려한 코드
interface INameable {
    name: string
}
function getName(o: INameable) {
    return o != undefined ? o.name : 'unknown name'
}

let n = getName(undefined)
console.log(n) // 'unknown name'
console.log(getName({name: 'Jack'})) // Jack