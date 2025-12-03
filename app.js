// infix function to calculate basic mathematical operations like add, sub, mul, and div
const inFixFunctions = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y,
};
// function to apply infix functions
const infixEval = (str, regex) =>
    str.replace(regex, (_, arg1, op, arg2) =>
        inFixFunctions.op(parseFloat(arg1), parseFloat(arg2))
    );

// a function to check of precedense
const highPrecedence = (str) => {
    // regex to match a infix expression
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
        String.fromCharCode(code)
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

// function to evaluate formulas applied
const evalFormula = (cells, x) => {
    const idToText = (id) => cells.find((cell) => cell.id === id).value;
    const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
    const rangeFromString = (num1, num2) => range(parseInt(num1, num2));
    const elemVal = (num) => (char) => idToText(char + num); // convert the
    const addcharacters = (char1) => (char2) => (num) =>
        charRange(char1, char2).map(elemVal(num));
    const rangeExpanded = x.replace(rangeRegex);
};
// object of spreadsheet funcitons
const spreadsheetFuncs = {
    sum,
    average,
    median,
    count,
};

// loading window
window.onload = () => {
    const colHeaders = document.getElementById("col-head");
    const rowHeaders = document.getElementById("row-head");
    const container = document.getElementById("container");

    // Making labels 
    const createLabel = (name, clss, par) => {
        const label = document.createElement("div");
        label.className = clss;
        label.textContent = name;
        par.appendChild(label);
        return label;
    };

    // Create column headers labels(A-J)
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
            container.appendChild(cell);
        });
    });
};

const update = (event) => {
    const element = event.target;
    const value = element.value.replace(/\s/g, "");
    if (!value.includes(element.id) && value[0] === "=") {
    }
};
