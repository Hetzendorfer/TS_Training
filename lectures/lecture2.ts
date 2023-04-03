// How to use Types
// Types can be use for variables in different ways. First the classic Type can be inferred

let stringVar = "Das ist ein String"; // type of stringVar is string
let simpleObj = { // type of simpleObj is { name: string; }
    name: "Max",
};


// Types can be statically declared but when the type can be inferred, it should be inferred

let otherStringVar: string = "Das ist ein String";
let differenVar: unknown = "Das ist ein String";
let numberVar: number = 23;
let bigIntVar: bigint = 100n;


// Types can be forced through Type Assertion

interface Point {
    x: number;
    y: number;
}

let abc: Point;
abc = {
    x: 12,
}; // works not because property "y" is missing

abc = {
    x: 12
} as Point; // works because we force it

// Type Assertions are normally used when the return type of a function is any or unknown like for example for JSON.parse, fetch or a custom function
const jsonString = '{ "x1": 12, "y": 14 }';
let jsonPoint = JSON.parse(jsonString) as Point;
let otherJsonPoint: Point = JSON.parse(jsonString); // but Type Declaration also works

let str: unknown = "abc";
console.log((str as string).length);
console.log((<string> str).length); // Type Assertion with Brackets also works but should be avoided


// Using Types with Functions

function testFunc(param: string, optional = false) { // The types of the parameter of testFunc are param: string an optional: boolean because optional has the default value of false
}

interface Para2 {
    mode: "on" | "off";
}

interface FunctionInterface {
    (para1: number, para2?: Para2): void;
}
type FunctionType = (para1: number, para2?: Para2) => void;

const testFuncInterface: FunctionInterface = (para1, para2) => {}
const testFuncType: FunctionType = (para1, para2) => {}


// FunctionType with return value
type FuncTypeTuple = (para1: number) => [number, number]; // This means the return value is an array with a fixed number of entries -> Tuple; 
// in this case the Tuple consist of two number entries but can be of any type and also mixed. for example [string, Point, unknown]
