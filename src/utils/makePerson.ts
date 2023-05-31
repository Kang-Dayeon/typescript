export function makePerson(name: string, age: number) {
    return {name: name, age: age}
}
export function testMakePerson(){
    console.log(
        makePerson('jack', 22),
        makePerson('Jane', 33)
    )
}