// Deep Dive into the new Basic Types introduced by TypeScript

// Type: any
// Any is the TS escape claise. You can use any to either declare a section of your code 
// to be dynamic and JavaScript like, or to work around limitations in the type system

const myObject = JSON.parse("{}");  // myObject has the Type of any because that's the retunr value of JSON.parse
myObject.x.y.z // is valid because it's any

// Any is an Antipattern and should be avoided. Instead use unknown


// Unknown
// Unknown acts like a sibling to the any type. Where any allows for ambiguity - unknown requires specifics

const jsonParseUnknown = (jsonString: string): unknown => JSON.parse(jsonString);
const myAccount = jsonParseUnknown('{ "name": "Max" }');
myAccount.name; // doesn't work with unknown but with any this would work

// myAccount can't be used until the type has been declared to TypeScript.
// This can be used to ensure that API consumers think about their typing up-front:

type User = { name: string };
const myUserAccount = jsonParseUnknown('{ "name": "Max" }') as User; // "as User" is called Type Assertion
myUserAccount.name; // works because name is a property on the User Type

let value: unknown; // unknown can contain any data type but it isn't usable without type narrowing through typeof or instanceof or through Type Assertion or Type Guards
value = "abc";
value = true;
value = { name: "abc" };
value = new Date();

let date: Date = value; // only works with Type Assertion

if (typeof value === "string") {
    console.log(value); // value is now a string
}

function isNumberArray(value: unknown): value is number[] {
    return (
        Array.isArray(value) && value.every(element => typeof element === "number")
    );
}

const unknownArr: unknown = [15, 23, 8, 4, 42, 16];

if (isNumberArray(unknownArr)) { // Within this scope the variable unknownArr is a number[]
    const max = Math.max(...unknownArr);
    console.log(max);
}


// Never

// Because TypeScript supports code flow analysis, the language
// needs to be able to represent when code logically cannot
// happen. For example, this function cannot return:

const neverReturns = () => { // return value is "never"
    // If it throws on the first line
    throw new Error("Always throws, never returns");
};

enum Flower {
    Rose,
    Rhododendron,
    Violet,
    Daisy,
    Tulip,
}

const flowerLatinName = (flower: Flower) => {
    switch (flower) {
        case Flower.Rose:
            return "Rosa rubiginosa";
        case Flower.Rhododendron:
            return "Rhododendron ferrugineum";
        case Flower.Violet:
            return "Viola reichenbachiana";
        case Flower.Daisy:
            return "Bellis perennis";

        default:
            const _exhaustiveCheck: never = flower; // error because Tulip isn't checked
            return _exhaustiveCheck;
    }
};

// Never is automatically removed from Union Types
type NeverIsRemoved = string | never | number;

// Never is always the only value when intersected with other Types
type OnlyNever = string & never;