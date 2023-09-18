
// Utility Type for Object Types

type User = {
    id: number;
    name: string;
    surName?: string;
    address?: {
        zip: string;
        city: string;
        country: "Austria" | "Germany" | "Switzerland";
    };
};

type PartialUser = Partial<User>; // all properties can now be undefined
type RequiredUser = Required<User>; // all properties are now required

type UserWithoutIdAndAdress = Omit<User, "id" | "adress">; // User without id and adress
type Address = Pick<User, "address">;

// Combine Utility Types
type PartialPickedUser = Partial<
    Pick<User, "id" | "name">
>;


type ReadonlyUser = Readonly<User>;

// Reversing Readonly with a custom Utility Type
type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};

type MutableUser = Mutable<ReadonlyUser>;



// Utility Types for Union Types

type Role = "admin" | "user" | "anonymous";
type RoleAttributes =
    | { role: "admin", orgId: string; }
    | { role: "user" }
    | { role: "anonymous" };

type NonAdminRole = Exclude<Role, "admin">;
type AdminRole = Extract<RoleAttributes, { role: "admin" }>;





// Utility Types for Functions

type Func = (a: number, b: string) => number;

type ReturnValue = ReturnType<Func>;
type FuncParameters = Parameters<Func>;


// Utility Types for Promises

type PromiseNumber = Promise<number>;
type AwaitedType = Awaited<PromiseNumber>;


export { }