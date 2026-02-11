// infix function to calculate basic mathematical operations like add, sub, mul, and div local in each cell
const inFixFunctions = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y,
    "%": (x, y) => x % y,
    "^": (x, y) => x ** y,
};

// function to apply infix functions
const infixEval = (str, regex) =>
    str.replace(regex, (_, arg1, OP, arg2) =>
        inFixFunctions[OP](parseFloat(arg1), parseFloat(arg2)),
    );

// a function to check of precedense
const highPrecedence = (str) => {
    // regex to match a infix expression with mulitply or divide
    const regex = /([\d.]+)([*\/])([\d.]+)/;
    const s = infixEval(str, regex);
    return s === str ? str : highPrecedence(s);
};

// setting range of cols, vertical numbering
const range = (start, end) =>
    Array(end - start + 1)
        .fill(start)
        .map((element, index) => element + index);
// setting range of rows, horizontal alphabating
const charRange = (start, end) =>
    range(start.charCodeAt(0), end.charCodeAt(0)).map((code) =>
        String.fromCharCode(code),
    );

// sum function for the whole range of array
const sum = (nums) => nums.reduce((el, acc) => el + acc, 0);
// count function
const count = (nums) => nums.length;
// even or odd
const isEven = (num) => !(num % 2);
// find average of a given range
const average = (nums) => sum(nums) / nums.length;
// find median of a given range
const median = (nums) => {
    const sorted = nums.slice().sort();
    const mid = nums.length / 2 - 1;
    if (nums.length % 2 === 0) return average([sorted[mid], sorted[mid + 1]]);
    else return sorted[Math.ceil(mid)];
};

const spreadsheetFuncs = {
    "": (arg) => arg,
    sum,
    average,
    median,
    even: (nums) => nums.filter(isEven),
    someeven: (nums) => nums.some(isEven),
    everyeven: (nums) => nums.every(isEven),
    firsttwo: (nums) => nums.slice(0, 2),
    lasttwo: (nums) => nums.slice(-2),
    has2: (nums) => nums.includes(2),
    increment: (nums) => nums.map((num) => num + 1),
    random: ([x, y]) => Math.floor(Math.random() * y + x),
    range: (nums) => range(...nums),
    nodupes: (nums) => [...new Set(nums).values()],
};

const applyFunction = (str) => {
    const noHigh = highPrecedence(str);
    // a regex for checking addition or subtraction
    const infix = /([\d.]+)([+-])([\d.]+)/;
    const str2 = infixEval(noHigh, infix);
    // a regex for
    const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;
    const toNumberList = (args) => args.split(",").map(parseFloat);
    const apply = (fn, args) =>
        spreadsheetFuncs[fn.toLowerCase()](toNumberList(args));
    return str2.replace(
        functionCall,
        // applying function, on having the operator available or return the string as it is.
        (match, fn, args) =>
            spreadsheetFuncs.hasOwnProperty(fn.toLowerCase())
                ? apply(fn, args)
                : match,
    );
};

// #######  EXPLAIN THE FUNCTIONING OF THIS FUNCTION?  ##############
// *************************************************************************************************
const evalFormula = (cells, x) => {
    const idToText = (id) => cells.find((cell) => cell.id === id).value;
    const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
    const rangeFromString = (num1, num2) =>
        range(parseInt(num1), parseInt(num2));
    const elemVal = (num) => (char) => idToText(char + num); // convert the
    const addCharacters = (char1) => (char2) => (num) =>
        charRange(char1, char2).map(elemVal(num));
    // adding more

    const rangeExpanded = x.replace(
        rangeRegex,
        (_match, char1, num1, char2, num2) =>
            rangeFromString(num1, num2).map(addCharacters(char1)(char2)),
    );
    const cellRegex = /[A-J][1-9][0-9]?/gi;
    const cellExpanded = rangeExpanded.replace(cellRegex, (match) =>
        idToText(match.toUpperCase()),
    );
    const functionExpanded = applyFunction(cellExpanded);
    return functionExpanded === x
        ? functionExpanded
        : evalFormula(cells, functionExpanded);
};

// ***************************************************************************************************

// loading window
window.onload = () => {
    const colHeaders = document.getElementById("col-head");
    const rowHeaders = document.getElementById("row-head");
    const container = document.getElementById("container");

    const createLabel = (name, className, par) => {
        const label = document.createElement("div");
        label.className = className;
        label.textContent = name;
        par.appendChild(label);
        return label;
    };

    // Create column headers (A-J)
    const letters = charRange("A", "J");
    letters.forEach((el) => {
        createLabel(el, "column-header", colHeaders);
    });

    // Create row headers and cells
    range(1, 99).forEach((number) => {
        createLabel(number, "row-header", rowHeaders);

        // Create cells for each row
        letters.forEach((letter) => {
            const cell = document.createElement("input");
            cell.className = "cell";
            cell.type = "text";
            cell.id = letter + number;
            cell.ariaLabel = letter + number;
            cell.onchange = update;
            container.appendChild(cell);
        });
    });
};

const update = (event) => {
    const element = event.target;
    const value = element.value.replace(/\s/g, "");
    if (!value.includes(element.id) && value[0] === "=") {
        element.value = evalFormula(
            Array.from(document.getElementById("container").children),
            value.slice(1),
        );
    }
};
