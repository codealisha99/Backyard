function greet(name : string) {
    console.log("Hello, " + name);

}

greet("alisha");
//avoid any

function add(a: number, b: number) : number {
    return a + b;
}
add(5, 10);

function delayedCall(fn : (a: string) => void) {
    setTimeout(fn, 1000);
}

function greeet(a: string) {
    console.log("Hello, " + a);
}
delayedCall(greeet);