// readonly 키워드를 사용할 경우 매개 변수를 변경하려고하면 에러가 남
// function forcePure(array: readonly number []) {
//     array.push(1)
// }

// ** 깊은 복사 & 얕은 복사 **
// number과 boolean은 깊은 복사로 동작
// let original = 1
// let copied = original
// copied += 2
// console.log(original, copied) // 1,3

// 객체와 배열은 얕은 복사로 동작함
// const originalArray = [5, 3, 9, 7]
// const shallowCopiedArray = originalArray
// shallowCopiedArray[0] = 0
// console.log(originalArray, shallowCopiedArray) // [0, 3, 9, 7] [0, 3, 9, 7]

// 전개 연산자 깊은 복사
// const oArray = [1, 2, 3, 4]
// const deepCopiedArray = [...oArray]
// deepCopiedArray[0] = 0
// console.log(oArray, deepCopiedArray) // [1, 2, 3, 4] [0, 2, 3, 4]

// ** sort 메서드를 순수 함수로 구현하기 **
// const pureSort = <T>(array: readonly T[]): T[] => {
//     let deepCopied = [...array]
//     return deepCopied.sort()
// }
//
// let beforeSort = [6, 2, 9, 0]
// const afterSort = pureSort(beforeSort)
// console.log(beforeSort, afterSort) // [6, 2, 9, 0] [0, 2, 6, 9]

// ** filter 메서드를 활용하여 원본 내용을 훼손하지 않고 삭제하기 **
// const pureDelete = <T>(array: readonly T[], cb: (val: T, index?: number) => boolean): T[] => array.filter((val, index) => cb(val, index) == false)
//
// const mixedArray: object[] = [
//     [], {name:'Jack'}, {name: 'Jane', age: 32}, ['description']
// ]
// const objectsOnly: object[] = pureDelete(mixedArray, (val) => Array.isArray(val))
// console.log(mixedArray, objectsOnly) // [[], {name:'Jack'}, {name: 'Jane', age: 32}, ['description']]  [{name:'Jack'}, {name: 'Jane', age: 32}]

// ** 가변 인수 함수 **
const mergeArray = <T>(...arrays: readonly T[][]): T[] => {
    let result: T[] = []
    for(let index=0; index < arrays.length; index++){
        const array: T[] = arrays[index]
        // result와 array 배열을 각각 전개하고 결합해야 T[]타입 배열을 생성할 수 있다
        result = [...result, ...array]
    }
    return result
}

const mergeArray1: string[] = mergeArray(
    ['Hello'], ['world']
)
console.log(mergeArray1) // ['Hello','world']

const mergeArray2: number[] = mergeArray(
    [1],[2, 3],[4, 5, 6],[7, 7, 9, 10]
)
console.log(mergeArray2) // [1,2,3,4,5,6,7,8,9,10]
