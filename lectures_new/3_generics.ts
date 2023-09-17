// Generics are a way to make components work with any data type and not restrict to one data type.

// Pass back what I pass in
function genericFunc<T>(a: T): T {
    return a;
}

genericFunc("test");
// ^?
genericFunc({ prop: "test" });
// ^?


type Params<T, U> = {
    a: T;
    b: U;
}

function genericFunc2<T, U>(params: Params<T, U>): Params<T, U> {
    return {
        a: params.a,
        b: params.b
    };
}

// Generics can be constrained to a specific shape by using extends keyword -> note the word "shape" here
// If the type behind params equals to for example { firstName: string, lastName: string; age: number } then it will still work because it has the shape of the constraint on T
function concatenateFirstNameAndLastName<T extends { firstName: string, lastName: string }>(params: T): string {
    return `${params.firstName} ${params.lastName}`;
}

// Also classes can be generic
export class Component<TProps> {
    private props: TProps;

    constructor(props: TProps) {
        this.props = props;
    }

    getProps = () => this.props;
}

const cloneComponent = <T>(component: Component<T>) => {
    return new Component(component.getProps());
};

const component = new Component({ a: 1, b: 2, c: 3 });

const clonedComponent = cloneComponent(component);

const result = clonedComponent.getProps();


// Generics can also be used to infer types

const getRouteInfoFromConfig = <T>(config: {
    rawConfig: {
        routeObject: T,
    }
}): T => {
    return config.rawConfig.routeObject;
}

const route = getRouteInfoFromConfig({
    rawConfig: {
        routeObject: {
            path: "/",
            component: () => null,
        }
    }
});

// ===================
// Get the values of the keys in an object
const typedObjectKeys = <T extends string>(obj: Record<T, unknown>) => {
    return Object.keys(obj) as T[];
};
const keys = typedObjectKeys({
    a: 1,
    b: 2,
    c: 3,
});


// Conditional types
// only using this definition the return type of helloGoodbye would be "hello" | "goodbye"
function helloGoodbye<T extends "hello" | "goodbye">(param: T) {
    return param === "hello" ? "goodbye" : "hello";
}
// now the return type is depended on the param type and will be either "hello" or "goodbye" in intelliSense
// type needs to be casted or else there will be an error. Also a possibility would be to cast "any" and in the return type definition of the function to define the conditional type
function helloGoodbyeConditional<T extends "hello" | "goodbye">(param: T) {
    return (param === "hello" ? "goodbye" : "hello") as T extends "hello" ? "goodbye" : "hello";
}


// Using Type Cast for a special case when you for example know that the type is correct but the compiler doesn't know it

type Person = {
    name: string;
    age: number;
    birthdate: Date;
};

function remapPerson<Key extends keyof Person>(
    key: Key,
    value: Person[Key],
): Person[Key] {
    if (key === "birthdate") {
        return new Date() as Person[Key]; // That is the special case where you know that the type is correct but the compiler doesn't know it
    }

    return value;
}

const date = remapPerson("birthdate", new Date());
const num = remapPerson("age", 42);
const name = remapPerson("name", "John Doe");


// infer keyword
// The infer keyword is used in conditional types to infer the type of a generic type parameter from another generic type parameter.
// Return the type P if the type T has a property called data and therefore matches the "shape" defined in the conditional type
type GetDataValue<T> = T extends { data: infer P } ? P : never;

type Names = [
    "John Doe",
    "Jane Doe",
    "Jack Doe",
    "Jill Doe",
];

type GetSurname<T> = T extends `${string} ${infer Surname}` ? Surname : never;
type GetSurname2<T> = T extends `${infer FirstName} ${infer Surname}` ? Surname : never;

// Creation of own Parameters and ReturnType type helper with the help of infer
type ParametersOwn<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
type ReturnTypeOwn<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

export { }