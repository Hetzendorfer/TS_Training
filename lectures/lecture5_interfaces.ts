// Interfaces

interface BaseInterface {
    id: number;
}

interface ExtendedInterface extends BaseInterface {
    readonly name: string;
}

interface ExtendedInterface {
    surname?: string;
}

let user: ExtendedInterface = {
    id: 0,
    name: "",
    surname: "",
};

user.id;
user.name;
user.surname;

interface FunctionDefinition {
    (param: any): void;
}

interface DynamicInterface {
    [index: string]: number;
}

interface ArrayInterface<T> {
    [index: number]: T;
    length: number;
}

const test: DynamicInterface = {
    wurst: 1,
    egal: "asd",
}

const customArr: ArrayInterface<string> = [
    "1",
    "2",
    "3",
    "4",
];

customArr.length