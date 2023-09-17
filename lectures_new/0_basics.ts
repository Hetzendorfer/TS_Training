// Pre pre Basics: Always hover over the variable to see the type AND install Twoslash Query Comments extension to see the type in the comments


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
    prop10: never; // it's not possible that this type could happen
    prop11: void; // a function which returns undefined or has no return value
}

// prefer inferred types for simple types for example:
const myString = "Hello World";
const check = true;
//    ^?

// FYI prefer explicit types for complex types or return values of complex functions

function testFunction(prop1: string, ...restProps: any[]): string | any {
    if (restProps.length > 0) {
        return restProps[0];
    }

    return prop1;
}

// Arrays can be defined in two ways. The second way is normally preferred because it's more readable
const myArray: string[] = ["Hello", "World"];
const myArray2: Array<string> = ["Hello", "World"];

// Type Casting is used to tell the compiler that you know the type of some entity could be more specific than its current type
// For example if you have a type of any and you know that it's a string you can cast it to a string
// Most Type Casting can be avoided by using Generics, Type Guards or the correct type definitions (for exmpample in the case of a library like react)

function definedInAnotherFile(): any {
    return "Hello World";
}

const result = definedInAnotherFile() as string;

// There are 3 possible ways to define your types: Classes, Interfaces and Type Aliases
// The only naming convention for interfaces or types in generel is to define the name with a capital letter. There is no need to name it with a capital I or T at the beginning.
// ==================
// Class
class Person {}

let person: Person | null = null;
person = new Person();

// Look for interfaces and type aliases in the 1_*.ts files
export {};