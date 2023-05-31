// ** 선택 속성 **
// interface IPerson2{
//     name: string
//     age: number
//     etc?: boolean
// }
// let good1: IPerson2 = {name: 'Jack', age: 32}
// let good2: IPerson2 = {name: 'Jack', age: 32, etc: true}
//
// console.log(good1)
// console.log(good2)


// ** 익명 인터페이스 **
// let ai: {
//     name: string
//     age: number
//     etc?: boolean
// } = {name: 'Jack', age: 32}
//
// function printMe(me: {name: string, age: number, etc?: boolean}){
//     console.log(
//         me.etc ?
//             `${me.name} ${me.age} ${me.etc}` :
//             `${me.name} ${me.age}`
//     )
// }
//
// printMe(ai) // Jack 32


// ** class 선언 **
// class Person1 {
//     name: string
//     age?: number
// }
//
// let jack1: Person1 = new Person1()
// jack1.name = 'Jack'
// jack1.age = 32
// console.log(jack1) // Person1 {name: 'Jack', age: 32}


// ** 생성자 **
// class Person2{
//     constructor(public name: string, public age?: number) {}
// }
//
// let jack2 : Person2 = new Person2('Jack', 32)
// console.log(jack2) // Person2 {name: 'Jack', age: 32}


// ** class interface **
// 인터페이스는 이러이러한 속성이 있어야된다는 규약일뿐 물리적으로 해당 속성을 만들지 않음
// interface IPerson4{
//     name: string
//     age?: number
// }
//
// class Person4 implements IPerson4{
//     constructor(public name: string, public age?: number) {}
// }
// let jack4: IPerson4 = new Person4('Jack', 32)
// console.log(jack4) // Person4 {name: 'Jack', age: 32'
