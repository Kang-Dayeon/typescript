// ** 고차 함수 **
import * as zlib from "zlib";

type FirstOrderFunc<T, R> = (T) => R
type SecondOrderFunc<T, R> = (T) => FirstOrderFunc<T, R>
type ThirdOrderFunc<T, R> = (T) => SecondOrderFunc<T, R>

// const inc: FirstOrderFunc<number, number> = (x: number): number => x + 1
// console.log(inc(1)) //2

// 2차 고차함수
// const add: SecondOrderFunc<number, number> =
//     (x: number): FirstOrderFunc<number, number> =>
//         (y: number): number => x + y

// console.log(add(1)(2)) // 3

// 3차 고차 함수
// const add3: ThirdOrderFunc<number, number> =
//     (x: number): SecondOrderFunc<number, number> =>
//         (y: number): FirstOrderFunc<number, number> =>
//             (z: number) : number => x + y + z
//
// console.log(add3(1)(2)(3)) // 6

// 부분 적용 함수
// const add1: FirstOrderFunc<number, number> = add(1) // add1은 부분 함수

// console.log(
//     add1(2), // 3
//     add(1)(2) //3
// )

// const add2: SecondOrderFunc<number, number> = add3(1)
// const add1: FirstOrderFunc<number, number> = add2(2)
//
// console.log(
//     add1(3), //6
//     add2(2)(3), //6
//     add3(1)(2)(3) //6
// )

// ** 클로저 **
// function add(x: number): (number) => number { // 바깥쪽 유효 범위 시작
//     return function (y: number): number { // 안쪽 유효 범위 시작
//         return x + y // 클로저 : 바깥쪽 유효 범위에 있는 변수 x를 참조하고 있다.
//     }// 안쪽 유효 범위 끝
// } // 바깥쪽 유효 범위 끝

const makeNames = (): () => string => {
    const names = ['Jack', 'Jane', 'Smith']
    let index = 0
    return (): string => {
        if(index === names.length)
            index = 0
        return names[index++]
    }
}

const makeName: () => string = makeNames()

console.log(
    [1,2,3,4,5,6].map(n => makeName())
) // [ 'Jack', 'Jane', 'Smith', 'Jack', 'Jane', 'Smith' ]
