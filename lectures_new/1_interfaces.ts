// Interface -> useful when creating your own libraries or type files that needs to be consumed by third parties
interface Person {
    name: string;
}

// Why use interfaces for libraries? Because you can easily overload interface with the same interface declaration and both will be merged together. This is not possible with types.
interface Person {
    lastName: string;
}

const person: Person = {
    name: "Max",
    lastName: "Mustermann",
};

// There is also the possibility of extending interfaces which is inheritance in OOP
interface PersonWithAge extends Person {
    age: number;
}
// Also mutli inheritance is possible
interface Parent {
    grandfather: PersonWithAge;
}
interface PersonWithAgeAndParent extends Parent, PersonWithAge {
}

const newPerson: PersonWithAgeAndParent = {
    name: "Max",
    lastName: "Mustermann",
    age: 40,
    grandfather: {
        name: "Max",
        lastName: "Mustermann",
        age: 80,
    },
};

// Type Definitions of properties can be made optional with the "?" operator
interface PersonWithOptionalAge extends Person {
    age?: number;
}


export {};