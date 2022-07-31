import { CardPackIcon } from "$lib/design/interface/card-pack";

export function createPackRequirementText(icons: CardPackIcon[]): string {
    let useStarter = false
    const nonStarter: CardPackIcon[] = []
    icons.forEach(x => {
        if (
            x === CardPackIcon.NathanielCho ||
            x === CardPackIcon.HarveyWalters ||
            x === CardPackIcon.WinifredHabbamock ||
            x === CardPackIcon.JacquelineFine ||
            x === CardPackIcon.StellaClark
        ) {
            useStarter = true
        } else {
            nonStarter.push(x)
        }
    })
    if (nonStarter.length === 0) {
        return "Only Revised Core Set"
    }else if (nonStarter.length === 1) {
        return "1 Expansion"
    } else if (nonStarter.length >= 3) {
        return nonStarter.length + " Expansions"
    } else if (useStarter) {
        return nonStarter.length + " Expansions + Starter"
    } else {
        return nonStarter.length + " Expansions"
    }
}