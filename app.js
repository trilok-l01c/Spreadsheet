const range = (start, end) => Array(end - start + 1).fill(start).map((element, index) => element + index);
const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map(code => String.fromCharCode(code));

const sum = nums => nums.reduce((el, acc) => el + acc, 0);
const count = nums => nums.length;
const isEven = num => !(num%2);
const average = nums => sum(nums)/nums.length;
const median = nums => {
    const sorted = nums.slice().sort();
    const mid = nums.length/2 - 1;
    if(nums.length % 2 === 0)return average([sorted[mid], sorted[mid + 1]]);
    else return sorted[Math.ceil(mid)];
}

const evalFormula = (cells, x) => {
    const idToText = id => cells.find(cell => cell.id === id).value;
    const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
    const rangeFromString = (num1, num2) => range(parseInt(num1, num2));
    const elemVal = num => {
        const inner = character => {}
        return inner;
    }
}
// object of spreadsheet funcitons
const spreadsheetFuncs = {
    sum,
    average,
    median,
    count,
    
}
window.onload = () => {
    const colHeaders = document.getElementById("col-head");
    const rowHeaders = document.getElementById("row-head");
    const container = document.getElementById("container");
    
    const createLabel = (name, clss, par) => {
        const label = document.createElement("div");
        label.className = clss;
        label.textContent = name;
        par.appendChild(label);
        return label;
    };

    // Create column headers (A-J)
    const letters = charRange("A", "J");
    letters.forEach(el => {
        createLabel(el, "column-header", colHeaders);
    });

    // Create row headers and cells
    range(1, 99).forEach(number => {
        createLabel(number, "row-header", rowHeaders);
        
        // Create cells for each row
        letters.forEach(letter => {
            const cell = document.createElement("input");
            cell.className = "cell";
            cell.type = "text";
            cell.id = letter + number;
            cell.ariaLabel = letter + number;
            container.appendChild(cell);
        });
    });
}

const update = (event) => {
    const element = event.target;
    const value = element.value.replace(/\s/g, "");
    if(!value.includes(element.id) && value[0] === '='){
        
    }
}