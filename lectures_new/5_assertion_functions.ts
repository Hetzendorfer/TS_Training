// Some functions need to throw an error if something exexpected happened. These are called assertion functions
// In TS they can be modeled with the "assertion signature"
// They work like type guards but instead of returning a boolean they throw an error if the type is not correct and the value that is validated is in the rest of the scope the asserted value
function assertsIsString(val: any): asserts val is string {
    if (typeof val !== "string") {
        throw new Error("Not a string!");
    }
}

function getMaybeString(): string | number {
    return "Hello World";
}

const str = getMaybeString();
//    ^?
assertsIsString(str);
// str is now a string and not a string | number
str
//^?
