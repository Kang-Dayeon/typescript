// 특별히 자신을 상속하는 타입이 포함되어 있지 않은 일반 타입
interface IValueProvider<T> {
    value(): T
}

// 내가 아닌 나를 상속하는 타입을 반환하는 F-바운드 타입
interface IAddable<T> {
    add(value: T): this
}

interface IMultiplyable<T> {
    multiply(value: T): this
}

// 위에서 정의한 IValueProvider<T> 인터페이스를 구현한다.
// _value 속성을 private로 만들어 _value 속성이 아닌 value() 메서드로 접근할 수 있게 설계됨
// class Calculator implements IValueProvider<number> {
//     constructor(private _value: number = 0) {}
//     value(): number { return this._value }
// }

// class StringComposer implements IValueProvider<string> {
//     constructor(private _value: string = '') {}
//     value(): string { return this._value }
// }

// IValueProvider<T> 와 IAddable<T> 구현
// class Calculator implements IValueProvider<number>, IAddable<number> {
//     constructor(private _value: number = 0) {}
//     value(): number { return this._value }
//     add(value: number): this {
//         this._value = this._value + value
//         return this // 메서드 체인 기능을 구현하기 위해
//     }
// }

// IMultiplyable<T>도 같은 방법으로 Calculator 클래스에 구현
class Calculator implements IValueProvider<number>, IAddable<number>, IMultiplyable<number> {
    constructor(private _value: number = 0) {}
    value(): number { return this._value }
    add(value: number): this {
        this._value = this._value + value
        return this // 메서드 체인 기능을 구현하기 위해
    }
    multiply(value: number): this {
        this._value = this._value * value
        return this
    }
}

// const value = (new Calculator(1))
//             .add(2) // 1 + 2 = 3
//             .add(3) // 3 + 3 = 6
//             .multiply(4) // 6 * 4 = 24
//             .value() // 24
//
// console.log(value) // 24

// Calculator를 구현했던 방식을 그대로 사용해 StringComposer 구현
class StringComposer implements IValueProvider<string>, IAddable<string>, IMultiplyable<number>{
    constructor(private _value: string = '') {}
    value(): string { return this._value }
    add(value: string): this {
        this._value = this._value.concat(value)
        return this
    }
    multiply(repeat: number): this {
        const value = this.value()
        for(let index = 0; index < repeat; index++)
            this.add(value)
        return this
    }
}

const value = new StringComposer('hello')
.add(' ') // hello
.add('world') // hello world
.add('!') // hello world!
.multiply(3) // 3번 반복
.value()

console.log(value) //hello world!hello world!hello world!hello world!
