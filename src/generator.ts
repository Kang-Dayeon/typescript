// ** yield문 **
function* generator(){
    console.log('generator started...')
    let value = 1
    while(value < 4)
        yield value++
    console.log('generator finished...')
}

for(let value of generator())
    console.log(value)
// generator started...
// 1
// 2
// 3
// generator finished...