type Fruits = "apple" | "banana" | "orange";
type FruitPies = `${Fruits}Pie`; // "applePie" | "bananaPie" | "orangePie"
type CapitalizedFruitPies = `${Capitalize<Fruits>}Pie`; // "ApplePie" | "BananaPie" | "OrangePie"


type Person = {
    name: string;
    lastName: string;
    age: number;
}

// This introduced multiple other concepts but the main thing is that you can use template literal types to create new types based on existing types
// Hover over the type to inspect the changed type properties
type PersonChanged = {
    [X in keyof Person as `${X}Changed`]: Person[X];
};

type Func<T> = {
    on(eventName: `${string & keyof T}Changed`, callback: (newValue: any) => void): void;
}

const func: Func<Person> = {
    on(eventName, callback) {
        //^?
        // ...
    }
}

export {};