// Inferred Types

let helloWorld = "Hello World";

let user = {
    id: 1,
    name: "Max Mustermann",
}


// Basic Types available in TS

interface BasicTypes {
    prop1: boolean;
    prop2: bigint;
    prop3: null;
    prop4: number;
    prop5: string;
    prop6: symbol;
    prop7: undefined;
    prop8: any; // allow any type
    prop9: unknown; // ensure someone using this type declares what the type is
    prop10: never; // it'S not possible that this type could happen
    prop11: void; // a function which returns undefined or has no return value
}


// There are 2 possible ways to define types: Interfaces and Types. You should prefer interface. Use type when you need specific features

interface Interface {}
type Type = {}


// Composing Types - in TS you can create complex Types by combinig simple ones -> Union or Generic
// Unions
type RequestState = "pending" | "loading" | "success";
type PossibleNumbers = 1 | 3 | 5 | 1000;

function testFunc1(param: string | string[]) {
    if (typeof param === "string") {
        return [param];
    }

    return param;
}

// Generics
type StringArray = Array<string>;

interface Backpack<T> {
    add: (obj: T) => void;
    get: () => T;
}

declare const backpack: Backpack<string>; // declare tells TypeScript this constant is defined somewhere outside of the scope, so this doesn't lead to TS lint errors
backpack.add("Neues Item");
backpack.add(40); // Argument of type 'number' is not assignable to parameter of type 'string'.ts(2345)
const obj = backpack.get();


// To learn the type of a variable, use typeof -> when hovering over param in the if and else if statements you can see what possible types param still can have
function allTypes(param: boolean | bigint | null | number | string | symbol | undefined | (() => void) | any[]) {
    if (typeof param === "boolean") {

    }
    else if (typeof param === "bigint") {

    }
    else if (typeof param === "function") {

    }
    else if (typeof param === "number") {

    }
    else if (typeof param === "undefined") {

    }
    else if (typeof param === "symbol") {

    }
    else if (typeof param === "string") {

    }
    else if (Array.isArray(param)) {

    }
    else if (typeof param === "object") { // typeof array is an "object" and typeof null is an "object"

    }
}


// Structural Type System
// TypeScript checks the shape a value has -> called "duck typing" or "structural typing"

interface Point {
    x: number;
    y: number;
}

function logPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`);
}

const point = {
    x: 12,
    y: 26
};
logPoint(point); // works because point "looks like"/has the shape of the interface Point

const extendedPoint = {
    x: 12,
    y: 26,
    z: 20,
}
logPoint(point) // works also because it has the shape of the interface Point

class VirtualPoint {
    x: number;
    y: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

const nevVPoint = new VirtualPoint(13, 56);
logPoint(nevVPoint); // also works