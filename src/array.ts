// ** 배열의 타입 **
// let numArray: number[] = [1,2,3]
// let strArray: string[] = ['hello', 'world']
//
// type IPerson = {name: string, age?: number}
// let personArray: IPerson[] = [{name: 'Jack'}, {name: 'Jane', age: 32}]

//  ** 문자열을 배열로 변환 **
// const split = (str: string, delim: string = ''): string[] => str.split(delim)

// console.log(
//     split('hello'), // ['h','e','l','l','o']
//     split('h_e_l_l_o', '_') // ['h','e','l','l','o']
// )

// join 메서드를 이용하는 사용자 정의 함수
// const join = (strArray: string[], delim: string=''): string => strArray.join(delim)
// console.log(
//     join(['h','e','l','l','o']), // hello
//     join(['h','e','l','l','o'], '_') // h_e_l_l_o
// )

// ** 배열 비구조화 할당 **
// let array: number[] = [1,2,3,4,5]
// let [first, second, third, ...rest] = array
// console.log(first,second,third,rest) // 1 2 3 [4,5]

// ** for...in 문 **
//배열
let names = ['Jack', 'Jane', 'Steve']
// for(let index in names){
//     const name = names[index]
//     console.log(`[${index}]: ${name}`) //[0]: Jack [1]: Jane [2]: Steve
// }

// 객체
// let jack = {name: 'Jack', age: 32}
// for(let property in jack){
//     console.log(`${property}: ${jack[property]}`) // name: Jack age: 32
// }

// ** for...of 문 **
// 아이템값만 필요한경우
// for(let name of names){
//     console.log(name) // Jack Jane Steve
// }

// ** 제네릭 타입 **
// 기본 문법
// function getText<T>(text: T): T {
//     return text
// }
// getText<string>('hi')
// getText<number>(10)
// getText<boolean>(true)

// 함수선언 방법
// const text1 = getText<string>('Hello World')
// const text2 = getText('Hello World') // 타입 추론

// T타입의 변수라고 알려줘야 된다
// 인자로 받은 값의 length를 알고 싶은 경우
// const arrayLength = <T>(array: T[]): number => array.length // 제네릭 타입이 배열이기 때문에 length를 허용함
// const isEmpty = <T>(array: T[]): boolean => arrayLength<T>(array) == 0

// let numArray: number[] = [1,2,3]
// let strArray: string[] = ['hello', 'world']
//
// type IPerson = {name: string, age?: number}
// let personArray: IPerson[] = [{name: 'Jack'}, {name: 'Jane', age: 32}]
//
// console.log(
//     arrayLength(numArray), // 3
//     arrayLength(strArray), // 2
//     arrayLength(personArray), // 2
//     isEmpty([]), // true
//     isEmpty([1]) // false
// )

// ** 제네릭 함수의 시그니처 **
// const normal = (cb: (number) => number): void => {}
// const error = (cb: (number, number?) => number): void => {} // 식별자 중복 오류
// const fixed = (cb: (a: number, number?) => number): void => {} // 타입스크립트가 해석하지 못하는 부분에 변수를 삽입하고 타입을 명시하여 해결

// ** range 함수 구현 **
const range = (from: number, to:number): number[] => {
    return from < to ? [from, ...range(from + 1, to)] : [] // 재귀 함수 스타일로 동작
}

let numbers: number[] = range(1, 9 + 1)
console.log(numbers) // [1,2,3,4,5,6,7,8,9]