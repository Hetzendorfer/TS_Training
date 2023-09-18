type Colors = "red" | "green" | "blue";
type RGB = [red: number, green: number, blue: number];

const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    bleu: [0, 0, 255], // throws an error because of the typo bleu which should be blue
} satisfies Record<Colors, string | RGB>;


export {}