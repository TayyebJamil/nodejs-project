// Even or Odd
function isEven(num){
    let rem = num%2;
    if(rem == 0){
        return true;
    }
    else{
        return false;
    }
    return rem;
}
if(isEven(5)){
    console.log("Even");
}
else{
    console.log("Odd");
}