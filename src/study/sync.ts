// ** package.json 파일을 동기 방식으로 읽는 예 **
import * as Buffer from "buffer";
import {readFile, readFileSync} from "fs";

// console.log('read package.json using synchronous api...')
// const buffer: Buffer = readFileSync('./package.json')
// console.log(buffer.toString())
//
// // ** package.json 파일을 비동기 방식으로 읽는 예 **
// readFile('./package.json', (error: Error, buffer: Buffer) =>{
//     console.log('read package.json using asynchronous api...')
//     console.log(buffer.toString())
// })
//
// // ** Promise와 async/await 구문을 사용한 예 **
// const readFilePromise = (filename: string): any => { // Promise<string>타입일 경우 오류 error : TS2355: A function whose declared type is neither 'void' nor 'any' must return a value.
//     return new Promise<String>((resolve, reject) => {
//         readFile(filename, (error: Error, buffer: Buffer) => {
//             if(error)
//                 reject()
//             else
//                 resolve(buffer.toString())
//         })
//     })
// }
//
// (async () => {
//     const content = await readFilePromise('./package.json')
//     console.log('read package.json using promise and async/await...')
//     console.log(content)
// })()

// ** readFileSync를 사용해 바이너리 데이터로 읽은 다음 Buffer의 toString 메서든를 사용해 화명 출력 **
// 파일을 읽는 동안 코드는 일시적으로 멈춤
// const buffer: Buffer = readFileSync('./package.json')
// const content: string = buffer.toString()
// console.log(content)
//
// // ** 비동기 방식으로 동작하는 readFile의 사용 예 **
// readFile('./package.json', (err: Error, buffer: Buffer) => {
//     if(err) throw err
//     else {
//         const content: string = buffer.toString()
//         console.log(content)
//     }
// })
// 코드는 멈추지 않고 계속 실행

// ** callback-hell **
// readFile('./package.json', (err: Error, buffer: Buffer) => {
//     if(err) throw err
//     else{
//         const content: string = buffer.toString()
//         console.log(content)
//
//         readFile('./tsconfig.json', (err: Error, buffer: Buffer) => {
//             if(err) throw err
//             else {
//                 const content: string = buffer.toString()
//                 console.log(content)
//             }
//         })
//     }
// })

// ** 비동기 방식 API인 readFile을 호출하는 내용을 프로미스로 구현한 예 **
const readFilePromise = (filename: string): Promise<string> =>
    new Promise<string>((
        resolve: (value: string) => void,
        reject: (err: Error) => void
    ) => {
        readFile(filename, (err: Error, buffer:Buffer) => {
            if(err) reject(err)
            else resolve(buffer.toString())
        })
    })

// ** async 함수와 Promise.all **
const readFilesAll = async (filenames: string[]) => {
    return await Promise.all(
        filenames.map(filename => readFilePromise(filename))
    )
}

readFilesAll(['./package.json', './tsconfig.json'])
    .then(([packageJson, tsconfigJson]: string[]) => {
        console.log('<package.json>:', packageJson)
        console.log('<tsconfig.json>:', tsconfigJson)
    })
    .catch(err => console.log('error:', err.message))


// readFilePromise('./package.json')
//     .then((content: string) => {
//         console.log(content) // package.json 파일을 읽는 내용
//         return readFilePromise('./tsconfig.json')
//     })
//     .then((content:string) => {
//         console.log(content) // tsconfig.json 파일을 읽는 내용
//         return readFilePromise('.')
//     })
//     .catch((err: Error) => console.log('err:', err.message))
//     .finally(() => console.log('프로그램 종료'))

// 결과
// {
// ...package.json...
// }
// {
// ...tsconfig.json...
// }
// err: EISDIR: illegal operation on a directory, read
// 프로그램 종료

// ** Promise.resolve **
// Promise.resolve(1)
//     .then(value => console.log(value)) // 1
//
// Promise.resolve('hello')
//     .then(value => console.log(value)) // hello
//
// Promise.resolve([1,2,3])
//     .then(value => console.log(value)) // [1,2,3]
//
// Promise.resolve({name: 'Jack', age: 32})
//     .then(value => console.log(value)) // {name: 'Jack', age: 32}

// ** Promise.reject **
// Promise.reject(new Error('에러발생'))
//     .catch((err: Error) => console.log('error:', err.message)) // error: 에러발생

// ** then-chain **
// Promise.resolve(1)
//     .then((value: number) => {
//         console.log(value) // 1
//         return Promise.resolve(true)
//     })
//     .then((value: boolean) => {
//         console.log(value) // true
//         return [1, 2, 3]
//     })
//     .then((value: number[]) => {
//         console.log(value) // [1, 2, 3]
//         return {name: 'Jack', age: 32}
//     })
//     .then((value: {name: string, age: number}) => {
//         console.log(value) // {name: 'Jack', age: 32}
//     })

// ** Array.every **
// const isAllTrue = (values: boolean[]) => values.every((value => value == true))
//
// console.log(
//     isAllTrue([true, true, true]), // true
//     isAllTrue([false, true, true]) // false
// )

// ** Promise.all **
// all(프로미스 객체 배열: Promise[]): Promise<해소된 값들의 배열(혹은 any)>
// const getAllResolvedResult = <T>(promises: Promise<T>[]) => Promise.all(promises)
//
// getAllResolvedResult<any>([Promise.resolve(true), Promise.resolve('hello')])
//     .then(result => console.log(result)) // [true, 'hello']
//
// getAllResolvedResult<any>([Promise.reject(new Error('error')), Promise.resolve(1)])
//     .then(result => console.log(result)) // 호출안됨
//     .catch(error => console.log('error:', error.message)) // error: error

// ** Array.some **
// const isAnyTrue = (values: boolean[]) => values.some((value) => value == true)
//
// console.log(
//     isAnyTrue([false, true, false]), // true
//     isAnyTrue([false, false, false]) // false
// )

// ** Promise.race **
// race(프로미스 객체 배열: Promise[]): Promise<가장 먼저 해소된 객체의 값 타입(혹은 error)>
// Promise.race([Promise.resolve(true), Promise.resolve('hello')])
//     .then(value => console.log(value)) // true
//
// Promise.race([Promise.resolve(true), Promise.reject(new Error('hello'))])
//     .then(value => console.log(value)) // true
//     .catch(error => console.log(error.message)) // 호출되지 않음
//
// Promise.race([Promise.reject(new Error('error')), Promise.resolve(true)])
//     .then(value => console.log(value)) // 호출되지 않음
//     .catch(error => console.log(error.message)) // error

// ** async/await 구문 **
// const test = async () => {
//     const value = await Promise.resolve(1)
//     console.log(value) // 1
// }
// test()

// const test1 = async() => { // 화살표함수 구문
//     await Promise 객체 혹은 값
// }
// async function test2(){ // function 키워드 함수 구문
//     await Promise 객체 혹은 값
// }

// ** 화살표 함수 형태로 async 함수를 구현한 예 **
const test1 = async () => {
    let value = await 1
    console.log(value) // 1
    value = await Promise.resolve(1)
    console.log(value) // 1
}

// ** function 함수 형태로 async 함수를 구현한 예 **
async function test2(){
    let value = await 'hello'
    console.log(value) // hello
    value = await Promise.resolve('hello')
    console.log(value) // hello
}

// test1()
// test2()

// test1()
//     .then(() => test2())

// 결과
// 1
// 1
// hello
// hello

// const asyncReturn = async () => {
//     return [1, 2, 3]
// }
//
// asyncReturn()
//     .then(value => console.log(value)) // [1, 2, 3]

// ** async 함수 예외처리 **
// const asyncException = async () => {
//     throw new Error('error')
// }
// asyncException() // 예외 발생
//
// asyncException()
//     .catch(err => console.log('error:', err.message)) // error: error

const awaitReject = async () => {
    await Promise.reject(new Error('error'))
}
// awaitReject() // 비정상 종료

awaitReject()
    .catch(err => console.log('error:', err.message)) // error: error