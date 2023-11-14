import {range} from "./array";

// ** for ...of **
// const numArray: number[] = [1,2,3]
// for(let value of numArray)
//     console.log(value) // 1 2 3
//
// const strArray: string[] = ['hello', 'world', '!']
// for(let value of strArray)
//     console.log(value) // hello world !

// ** 반복기 제공자 iterable **
// const createRangeIterable =  (from: number, to: number) => {
//     let currentValue = from
//     return {
//         next(){
//             const value = currentValue < to ? currentValue++ : undefined
//             const done = value == undefined
//             return {value, done}
//         }
//     }
// }

// const iterator = createRangeIterable(1, 3 + 1) // 반복기는 현재 동작하지 않음
// while (true) {
//     const {value, done} = iterator.next() // 반복기를 동작시킴
//     if(done) break
//     console.log(value) // 1 2 3
// }
//
// for(let value of range(1, 3 + 1))
//     console.log(value)

// const iterable = createRangeIterable(1, 3 + 1)
// for(let value of iterable)
//     console.log(value)

// createRangeIterable -> class로 변경하기
// class RangeIterable {
//     constructor(public form: number, public to: number) {}
//     [Symbol.iterator](){
//         const that = this
//         let currentValue = that.form
//         return {
//             next() {
//                 const value = currentValue < that.to ? currentValue ++ : undefined
//                 const done = value == undefined
//                 return {value,done}
//             }
//         }
//     }
// }
//
// const iterator = new RangeIterable(1, 3 + 1)
// for(let value of iterator)
//     console.log(value) // 1 2 3

// 반복기 제공자를 타입스크립트가 제공하는 Iterable<T>와 Iterator<T>를 사용해 구형한 예
class StringIterable implements Iterable<string> {
    constructor(private strings: string[], private currentIndex: number = 0) {}
    [Symbol.iterator](): Iterator<string>{
        const that = this
        let currentIndex = that.currentIndex, length = that.strings.length

        const iterator: Iterator<string> = {
            next(): {value: string, done: boolean} {
                const value = currentIndex < length ? that.strings[currentIndex++] : undefined
                const done = value == undefined
                return {value, done}
            }
        }
        return iterator
    }
}

for(let value of new StringIterable(['hello', 'world', '!']))
    console.log(value) // hello world !