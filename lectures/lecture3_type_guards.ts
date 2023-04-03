// Type guards

interface Fish {
    swim: () => void;
}

interface Bird {
    fly: () => void;
}

function getSmallPet() {
    return Math.random() >= 0.5
        ? { swim: () => console.log("swim") } as Fish
        : { fly: () => console.log("fly") } as Bird;
}

// To tell TypeScript that an function type guard narrows down the possible types we need a type predicate as an return value. 
// When using an boolean as an return value, the if statement "if (isFish(pet))" doesn't correctly know that the result is a fish.
function isFish(pet: Fish | Bird): pet is Fish { // "pet is Fish" is an type predicate
    return (pet as Fish).swim !== undefined;
}

let pet = getSmallPet();

if (isFish(pet))
    pet.swim();

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1 = zoo.filter(isFish); // Type of underWater1 is Fish[]
const underWater2 = zoo.filter<Fish>(isFish); // Also works because filter is a generic but through Type Inference the correct type is already known to TypeScript
const underWater3 = zoo.filter(pet => isFish(pet)); // doesn't work and underWater3 still has the type of (Fish | Bird)[] because the type predicate is missing for this filter lambda function

// Also the type guard of "propertyName in object" works but it isn't as dynamic when the type changes its structure
if ("swim" in pet)
    pet.swim();


// typeof and instanceof are also type guards, but typeof only works for primitive types and instanceof only for classes

interface Padder {
    getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) { }
    getPaddingString() {
        return Array(this.numSpaces + 1).join(" ");
    }
}

class StringPadder implements Padder {
    constructor(private value: string) { }
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder() {
    return Math.random() < 0.5
        ? new SpaceRepeatingPadder(4)
        : new StringPadder("  ");
}

let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder)
    padder;
else if (padder instanceof StringPadder)
    padder;