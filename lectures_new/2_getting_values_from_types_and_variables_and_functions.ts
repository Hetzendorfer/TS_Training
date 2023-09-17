// This is the same for interfaces and type aliases:
// Access of a type property with index notation (only possible way)

type Person = {
    name: string;
    grandfather: Person;
};

type PersonName = Person["name"];
type PersonGrandfatherName = Person["grandfather"]["name"];

// Omit and Pick are utility types that are available in TS to extract or omit properties from a type (handy for inheritance aka intersection)
type PersonWithoutName = Omit<Person, "name">;
type PersonWithGrandFather = Pick<Person, "grandfather">;

// Getting values from unions works differently
type User = {
    role: "admin";
    specialAdminProp: string;
} | {
    role: "user" | "guest";
};

// Get full admin type
type Admin = Extract<User, { specialAdminProp }>; // or Extract<User, { role: "admin" }>
type AdminAlt = Exclude<User, { role: "user" | "guest" }>;


// Get value of JavaScript object with typeof
const route = {
    path: "/",
    component: "Home",
    exact: true,
};

// typeof route will return the type of the constant route but it will infer the types as the most wide types possible
type Route = typeof route; // type Route = { path: string; component: string; exact: boolean; }

// to narrow it down you need to define the const additionaly with "as const"
const routeConst = {
    path: "/",
    component: "Home",
    exact: true,
} as const;

// typeof routeConst will return the type of the constant route but now it will infer the types as the most narrow types possible
type RouteConst = typeof routeConst; // type RouteConst = { readonly path: "/"; readonly component: "Home"; readonly exact: true; }

type ArrayOfRoute = Array<Route>;
// and ot extract the type of the array you can use the index operator
type TypeOfArrayOfRoute = ArrayOfRoute[number]; // type TypeOfArrayOfRoute = Route

// Tuple with fixed length and fixed types
type SpecialArray = [string, number, boolean];
const specialArray: SpecialArray = ["test", 1, true];
// Return a union of possible values for that array
type TypeOfSpecialArray = SpecialArray[number]; // type TypeOfSpecialArray = string | number | boolean


// Get the keys of an object
type RouteKeys = keyof Route; // type RouteKeys = "path" | "component" | "exact"
// Get the types of the keys of an object
type RouteKeyTypes = Route[keyof Route]; // type RouteKeyTypes = string | boolean


// Get the Parameters and ReturnType of a function
function getUser(id: string): User {
    return {
        role: "admin",
        specialAdminProp: "test",
    };
}

type ParameterTypeOfGetUser = Parameters<typeof getUser>; // type ParameterTypeOfGetUser = [id: string]
type ReturnValueTypeOfGetUser = ReturnType<typeof getUser>; // type ReturnValueTypeOfGetUser = User

export {};