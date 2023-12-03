import { CardPackIcon } from "$lib/design/interface/card-pack";

export function sortIcons(icons: CardPackIcon[], investigatorPack: CardPackIcon): CardPackIcon[] {
    const newArray = [...icons]
    newArray.sort((a, b) => {
        if (a === investigatorPack) {
            // Pack that investigator came from always come first.
            return -1
        }
        if (
            a === CardPackIcon.NathanielCho ||
            a === CardPackIcon.HarveyWalters ||
            a === CardPackIcon.WinifredHabbamock ||
            a === CardPackIcon.JacquelineFine ||
            a === CardPackIcon.StellaClark
        ) {
            // Starter pack always come last.
            return 1
        }
        return a - b
    })
    return newArray
}