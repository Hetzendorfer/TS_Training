// Declaration of function can be done using type alias or interface or defining the function directly

type FuncDelaration = (a: number, b: string) => number;
const func: FuncDelaration = (a, b) => {
    return a;
}
// ===================

interface FuncInterface {
    (a: number, b: string): number;
}

const func2: FuncInterface = (a, b) => {
    return a;
}
// ===================

function anotherFunc(a: number, b: string): number {
    return a;
}

// ===================
// b is optional and has the type of string because the default value is a string
function funcWithOptionalParameter(a: number, b = "hello"): number {
    return a;
}

// Type Guards. It is often the case that you have a specific type like person but there is the possibility that it is null. To check it you can define type guards.
// The special thing about type guards is the declaration in the return type
type Person = {
    name: string;
};

function isPerson(value: Person | null): value is Person {
    return value ? "name" in value : false;
}

function getPerson(): Person | null {
    // Just imagine the possibility that it can return Person
    return null;
}

const person = getPerson();

if (isPerson(person)) {
    console.log(person.name);
}

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


// Sometimes you want to map the behaviour of a function based on the type of the parameter.
// Therefor you can use generics or function overloads or both at the same time to define the behaviour.

function helloGoodbye(param: "hello"): "goodbye";
function helloGoodbye(param: "goodbye"): "hello";
function helloGoodbye(param: "hello" | "goodbye"): "hello" | "goodbye" {
    return param === "hello" ? "goodbye" : "hello";
}

const result = helloGoodbye("hello");
//    ^?


// Another example utilizing generics and more complex paramters
function runGenerator<T>(generator: () => T): T;
function runGenerator<T>(generator: {
  run: () => T,
}) : T;
function runGenerator<T>(generator: (() => T) | ({ run: () => T })) {
  if (typeof generator === "function") {
    return generator();
  }

  return generator.run();
}

// Another example
function returnWhatIPassInExcept<T>(value: 1): 2;
function returnWhatIPassInExcept<T>(value: T): T;
function returnWhatIPassInExcept<T>(value: T | 1) {
    if (value === 1)
        return 2;

    return value;
}

// Another example where data is undefined or T when no initialData is defined. When initialData is defined the return type is T
function getDBData<T>(params: { fetchData: () => Promise<T> }): { accessData: () => T | undefined };
function getDBData<T>(params: { fetchData: () => Promise<T> }, initialData: T): { accessData: () => T };
function getDBData<T>(params: { fetchData: () => Promise<T> }, initialData?: T) {
    let data = initialData;

    params.fetchData().then((fetchedData) => {
        data = fetchedData;
    });

    return {
        accessData: () => data,
    };
}

const dbResult = getDBData({
    fetchData: () => Promise.resolve(1),
});

const dbResultInitialData = getDBData({
    fetchData: () => Promise.resolve(1),
}, 2);

export { }