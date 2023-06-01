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
for(let name of names){
    console.log(name) // Jack Jane Steve
}
