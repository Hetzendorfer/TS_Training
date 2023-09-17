// Type Alias
type Person = {
    name: string;
};

// Overload of type aliases is not possible -> this is the main difference to interfaces
// to merge 2 or multiple types together you can use intersection types

type PersonWithAge = Person & {
    age: number;
};

// The special thing about type aliases is that you can use them to define types for unions
type PersonWithAgeOrName = Person | PersonWithAge;
const person: PersonWithAgeOrName = {
    name: "Max",
    age: 40,
};

// Some use cases for unions is definition of possible string values of a variable and are therefore a alternative to enums
type UserRoles = "admin" | "user" | "guest";
enum EUserRoles {
    ADMIN = "admin",
    USER = "user",
    GUEST = "guest",
}

type UserBase = {
    name: string;
}

// Definition of a more complex type with unions that helps you visualize the possible values of a variable based on the role
type User = UserBase & ({
    role: "admin";
    specialAdminProp: string;
} | {
    role: "user" | "guest";
});

// Same with enum
type UserWithEnum = UserBase & ({
    role: EUserRoles.ADMIN;
    specialAdminProp: string;
} | {
    role: EUserRoles.USER | EUserRoles.GUEST;
});

const user: User = {
    role: "admin",
    name: "Max",
    specialAdminProp: "test",
};

// Types and interfaces can be used together

interface FruitBase {
    weight: number;
    volume: number;
}

type Apple = FruitBase & {
    sweet: boolean;
};

interface PineApple extends Apple {
    spiky: boolean;
}

// Type Definitions of properties can be made optional with the "?" operator
type PersonWithOptionalAge = Person & {
    age?: number;
};

export {};