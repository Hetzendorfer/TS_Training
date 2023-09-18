// Mapped Types in TypeScript are a powerful way of creating new types by mapping over another type.

type Route = "/home" | "/about" | "/contact";
// We want to create a object where the key and the value contain the same string value
// This comes this pretty close but it is not exactly what we want because the value is a possibility of all Route values.
type RouteRecord = Record<Route, Route>;

// This creates a type where the key and the value are the same
type RouteMapped = {
    // ^?
    [X in Route]: X;
}

// We can use it to transform some base types into more complex types and manipulate the key with the "as" keyword
interface Attributes {
    firstName: string;
    lastName: string;
    age: number;
    id: string;
    organisationId: string;
    groupId: string;
}

type AttributeGetters = {
    [K in keyof Attributes as `get${Capitalize<K>}`]: () => Attributes[K];
};

type OnlyIdKeys<T> = {
    [X in keyof T as X extends `${string}${"id" | "Id"}` ? X : never]: T[X];
};
// To view the type more clearly we can use a helper type and remap over the keys and values again
type MakeTypeClear<T> = {
    [X in keyof T]: T[X];
};

type ClearedType = MakeTypeClear<OnlyIdKeys<Attributes>>;
//   ^?

// ==============================
type Route2 =
    | {
        route: "/";
        search: {
            page: string;
            perPage: string;
        };
    }
    | { route: "/about"; search: {} }
    | { route: "/admin"; search: {} }
    | { route: "/admin/users"; search: {} };

type RoutesObject = {
    // ^?
    [R in Route2 as R["route"]]: R["search"];
};

type Fruit =
  | {
      name: "apple";
      color: "red";
    }
  | {
      name: "banana";
      color: "yellow";
    }
  | {
      name: "orange";
      color: "orange";
    };

type TransformedFruit = {
    // ^?
  [X in Fruit as X["name"]]: `${X["name"]}:${X["color"]}`;
}[Fruit["name"]];

export {}