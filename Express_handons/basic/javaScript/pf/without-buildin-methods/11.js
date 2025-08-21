// Function to remove duplicates from a string manually without using any methods
function removeDu(str) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        let isDuplicate = false;
        for (let j = 0; j < result.length; j++) {
            if (str[i] === result[j]) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) {
            result += str[i];
        }
    }
    return result;
}

// Example usage
const inputString = "programming";
const outputString = removeDu(inputString);
console.log(`Input: ${inputString}`);
console.log(`Output: ${outputString}`);
