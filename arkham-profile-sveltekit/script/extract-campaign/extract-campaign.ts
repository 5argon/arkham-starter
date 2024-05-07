import {AllCampaigns, Effect, FullCampaign, Input, Step} from "./index.d.ts";
import {emptyDir} from "https://deno.land/std@0.210.0/fs/empty_dir.ts";

const file = await Deno.readTextFile("./allCampaigns.json")
const allCampaigns: AllCampaigns = JSON.parse(file) as AllCampaigns;

const folder = `./result`
await emptyDir(folder)
// for (const campaign of allCampaigns) {
//     const result = processCampaign(campaign);
//     await Deno.writeTextFile(`${folder}/${campaign.campaign.id}.json`, JSON.stringify(result, null, 2))
// }

const r = processCampaign(allCampaigns[0])
await Deno.writeTextFile(`${folder}/dwl.json`, JSON.stringify(r, null, 2))

function getStepsInKeys(keys: string[], steps: Step[]): Step[] {
    const s: Step[] = []
    for (const key of keys) {
        const found = steps.find(step => step.id === key)
        if (found) {
            s.push(found)
        } else {
            if (!key.startsWith('$')){
                throw new Error(`Step with key ${key} not found`)
            }
        }
    }
    return s
}

interface EffectsCollection {
    setupEffects: Effect[]
    scenarioEffects: {
        id: string
        name: string
        fullName: string
        simpleEffects: Effect[]
        inputEffects: Input[]
    }[]
}

function processCampaign(fc: FullCampaign): EffectsCollection {
    const c = fc.campaign
    const setupEffects = findEffectsInSteps(getStepsInKeys(c.setup, c.steps), c.steps)
    const scenarioEffects = fc.scenarios.flatMap<EffectsCollection['scenarioEffects'][0]>(s => {
        const scenarioSteps = s.steps
        const effects = findEffectsInSteps(getStepsInKeys(s.setup, scenarioSteps), scenarioSteps)
        return {
            simpleEffects: effects.simpleEffects,
            inputEffects: effects.inputEffects,
            id: s.id,
            name: s.scenario_name,
            fullName: s.full_name,
        }
    })
    return {
        setupEffects: setupEffects.simpleEffects,
        scenarioEffects: scenarioEffects,
    }
}

interface FindEffectsResult {
    simpleEffects: Effect[]
    inputEffects: Input[]
}

function findEffectsInSteps(findFromSteps: Step[], stepsUniverse: Step[]): FindEffectsResult {
    const allEffects: Effect[] = []
    const inputEffects: Input[] = []
    findFromSteps.forEach(s => {
        if (s.type === 'input') {
            const inputInput = s.input
            if ('effects' in inputInput) {
                inputEffects.push(inputInput)
            }
        }
        if ('effects' in s) {
            const effects = s.effects
            if (effects) {
                allEffects.push(...effects)
            }
        }
        if ('effectsWithInput' in s) {
            const effectsWithInput = s.effectsWithInput
            allEffects.push(...effectsWithInput.flatMap<Effect>(ei => {
                return ei.effects
            }))
        }
        if ('condition' in s) {
            const condition = s.condition
            if ('options' in condition) {
                const options = condition.options
                allEffects.push(...options.flatMap<Effect>(o => {
                    const innerResults: Effect[] = []
                    if (o.steps !== undefined) {
                        const innerStepsKeys = o.steps
                        const innerSteps = getStepsInKeys(innerStepsKeys, stepsUniverse)
                        const result = findEffectsInSteps(innerSteps, stepsUniverse)
                        innerResults.push(...result.simpleEffects)
                        inputEffects.push(...result.inputEffects)
                    }
                    if (o.effects !== undefined) {
                        innerResults.push(...o.effects)
                    }
                    return innerResults
                }))
            }
        }
        return allEffects
    })
    return {
        simpleEffects: allEffects,
        inputEffects: inputEffects,
    }
}