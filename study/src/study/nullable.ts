// let u: undefined = undefined
// let nu: null = null
//
// u = null
// nu = undefined

// console.log(u) // null
// console.log(nu) // undefined

// ** nullable 타입 **
type nullable = undefined | null
// const nullable: nullable = undefined

// ** 옵션 체이닝 **
// interface IPerson {
//     name: string,
//     age?: number
// }
//
// let person: IPerson
// // console.log(person.name) // 런타임 오류 발생
// console.log(person?.name) // undefined 런타임 오류 없이 정상적으로 실행됨

// ** safe navigation **
// type ICoordinates = {longitude: number}
// type ILocation = {country: string, coords?: ICoordinates}
// type IPerson = {name: string, location?: ILocation}
//
// let person: IPerson = {name: 'Jack'}

// let longitude = person?.location?.coords?.longitude // safe navigation
// console.log(longitude) // undefined
// if(person && person.location && person.location.coords){
//     longitude = person.location.coords.longitude
// }

// 널 병합 연산자를 사용해 기본값 0을 설정
// let longitude = person?.location?.coords?.longitude ?? 0
// console.log(longitude) // 0

interface IValuable<T> {
    getOrElse(defaultValue: T)
}

// 함수형 프로그래밍 언어에서는 map이라는 메서드가 있는 타입들을 functor라고 부른다.
interface IFunctor<T> {
    map<U>(fn: (value: T) => U)
}

// ** Some 클래스 **
export class Some<T> implements IValuable<T>, IFunctor<T> {
    constructor(private value: T) {}
    // value 속성이 private로 선언되어 있어 항상 getOrElse 메서드를 통해 Some클래스에 담긴 값을 얻어야 한다.
    getOrElse(defaultValue: T) {
        return this.value ?? defaultValue
    }
    // value값을 변경하려면 항상 map 메서드를 사용해야한다.
    map<U>(fn: (T) => U) {
        return new Some<U>(fn(this.value))
    }
}

// ** None 클래스 구현 **
export class None implements IValuable<nullable>, IFunctor<nullable> {
    getOrElse<T>(defaultValue: T | nullable) {
        return defaultValue
    }
    map<U>(fn: (T) => U) {
        return new None
    }
}

export class Option {
    private constructor() {} // 생성자가 private로 선언되면 new 연산자로 인스턴스를 만들 수 없다
    static Some<T>(value: T) {return new Some<T>(value)}
    static None = new None()
}

// let m = Option.Some(1) // Some이라는 클래스의 인스턴스를 반환한다.
// let value = m.map(value => value + 1).getOrElse(1)
// console.log(value) // 2
//
// let n = Option.None
// value = n.map(value => value + 1).getOrElse(0)
// console.log(value) // 0

// parseInt의 반환값에 따라 Option.None 또는 Option.Some 타입값 반환
// const parseNumber = (n: string): IFunctor<number> & IValuable<number> => {
//     const value = parseInt(n)
//     return isNaN(value) ? Option.None : Option.Some(value)
// }
//
// let value = parseNumber('1')
//     .map(value => value + 1) // 2
//     .map(value => value * 2) // 4
//     .getOrElse(0)
// console.log(value) // 4
//
// value = parseNumber('hello world')
//     .map(value => value + 1) // 콜백함수 호출안됨
//     .map(value => value * 2) // 콜백함수 호출안됨
//     .getOrElse(0) // 0
// console.log(value) // 0


const parseJson = <T>(json: string): IValuable<T> & IFunctor<T> => {
    try {
        const value = JSON.parse(json)
        return Option.Some<T>(value)
    } catch (e) {
        return Option.None
    }
}

const json = JSON.stringify({name: 'Jack', age: 32})
let value = parseJson(json).getOrElse({})
console.log(value) // {name: 'Jack', age: 32}

value = parseJson('hello world').getOrElse({})
console.log(value) // {}

