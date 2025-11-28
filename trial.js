process.stdin.setEncoding("utf-8");
let i = 0;
process.stdin.on("data", (input) => {
    console.log(input ** 2);
});

console.log("Hello, \n world");
