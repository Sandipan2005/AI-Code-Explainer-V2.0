// Test JavaScript file for drag and drop
function calculateSum(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Both arguments must be numbers");
  }
  return a + b;
}

// This function has a potential bug
function processArray(arr) {
  let result = "";
  for (let i = 0; i <= arr.length; i++) {
    // Bug: should be i < arr.length
    result += arr[i] + " ";
  }
  return result;
}

const users = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
  { name: "Bob", age: 35 },
];

console.log("Sum:", calculateSum(5, 3));
console.log("Processed:", processArray(["hello", "world", "test"]));
