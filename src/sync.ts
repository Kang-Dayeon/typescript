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
// const readFilePromise = (filename: string): Promise<string> =>
//     new Promise<string>((
//         resolve: (value: string) => void,
//         reject: (err: Error) => void
//     ) => {
//         readFile(filename, (err: Error, buffer:Buffer) => {
//             if(err) reject(err)
//             else resolve(buffer.toString())
//         })
//     })
//
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
Promise.reject(new Error('에러발생'))
    .catch((err: Error) => console.log('error:', err.message)) // error: 에러발생