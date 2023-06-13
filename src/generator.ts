// ** yield문 **
// function* generator(){
//     console.log('generator started...')
//     let value = 1
//     while(value < 4)
//         yield value++
//     console.log('generator finished...')
// }
//
// for(let value of generator())
//     console.log(value)
// generator started...
// 1
// 2
// 3
// generator finished...

// ** setInterval 함수를 사용하여 세미코루틴의 동작방식 알아보기 **
// const period = 1000
// let count = 0
// console.log('program started...')
// const id = setInterval(() => {
//     if(count >= 3){
//         clearInterval(id)
//         console.log('program finished...')
//     } else {
//         console.log(count++)
//     }
// }, period)
// program started...
// 0
// 1
// 2
// program finished...

// ** function* 키워드를 이용해 생성기 형태로 rangeGenerator라는 이름의 함수 만들기 **
// function* rangeGenerator(from: number, to: number){
//     let value = from
//     while(value < to){
//         yield value++
//     }
// }
//
// // while 패턴으로 동작하는 생성기
// let iterator = rangeGenerator(1, 3 + 1)
// while (1){
//     const {value, done} = iterator.next()
//     if(done) break
//     console.log(value) // 1 2 3
// }
//
// // for...of 패턴으로 동작하는 생성기
// for(let value of rangeGenerator(4, 6 + 1))
//     console.log(value) // 4 5 6

// ** StringIterable 클래스를 간결하게 구현 **
// class IterableUsingGenerator<T> implements Iterable<T> {
//     constructor(private values: T[], private currentIndex: number = 0) {}
//     [Symbol.iterator] = function* (){
//         while (this.currentIndex < this.values.length)
//             yield this.values[this.currentIndex++]
//     }
// }
//
// for(let item of new IterableUsingGenerator([1,2,3]))
//     console.log(item) // 1 2 3
//
// for(let item of new IterableUsingGenerator(['hello', 'world', '!']))
//     console.log(item) // hello world !

// ** yield* **
// function* gen12(){
//     yield 1
//     yield 2
// }
//
// function* gen12345(){
//     yield* gen12() // 1 2를 생성
//     yield* [3, 4] // 배열
//     yield 5
// }
//
// for(let value of gen12345())
//     console.log(value) // 1 2 3 4 5
//
// // 진행순서
// // yield* gen12()로 1생성 -> 정지 ->  2생성 -> 정지 -> yield* [3, 4]실행 3생성 -> 정지 -> 4생성 -> 정지 -> 5생성 -> for문 종료

// ** yield 반환값 **
function* gen(){
    let count = 5
    let select = 0
    while (count--){
        select = yield `you select ${select}`
    }
}
const random = (max, min=0) => Math.round(Math.random() * (max-min)) + min
// yield 연산자의 반환값은 반복기의 next 메서드 호출 때 매개변수에 전달하는 값이다.
const iter = gen()
while (true){
    const {value, done} = iter.next(random(10,1))
    if(done) break
    console.log(value)
}
// 결과
// you select 0 => 처음 select 변수를 0으로 설정했기 때문에 고정된 결과임
// you select 7
// you select 3
// you select 8
// you select 8