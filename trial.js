const median = nums => {
    const sorted = nums.slice().sort();
    const mid = nums.length/2;
    if(nums.length % 2 === 0)return average([sorted[mid], sorted[mid - 1]]);
    else return sorted[Math.floor(mid)];
}
console.log(Math.ceil(4/2-1));
console.log(median([3, 2, 6, 2, 5, 1, 4]));