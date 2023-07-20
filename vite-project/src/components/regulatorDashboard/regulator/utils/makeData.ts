import namor from '@ggascoigne/namor'
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "./../../../Constants";
import { supabase } from '../../../Authentication';

export type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: string
}

export type ApprovePendingRow = {
  // for now lab_order and analysis 1 to 1 mapping
  producerCommonName: string
  labOrderId: string
  // brand: string
  // TODO convert to molecule common name
  predictionMoleculeId: string
  cocentration: number
}

export type MoleculePrediction = {
  moleculeId: string
  moleculeName: string
  moleculeCommonName: string
  concentration: number
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (): Person => {
  const statusChance = Math.random()
  return {
    firstName: namor.generate({ words: 1, saltLength: 0 }),
    lastName: namor.generate({ words: 1, saltLength: 0, subset: 'manly' }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: statusChance > 0.66 ? 'relationship' : statusChance > 0.33 ? 'complicated' : 'single',
  }
}

const MOLECULE_LIST: Array<MoleculePrediction> = [
  {
    moleculeId: '0',
    moleculeName: 'Tetrahydrocannabinol',
    moleculeCommonName: 'THC',
    concentration: 90
  },
  {
    moleculeId: '1',
    moleculeName: 'Cannabidivarin',
    moleculeCommonName: 'CBDV',
    concentration: 90
  },
  {
    moleculeId: '2',
    moleculeName: 'Cannabidiol',
    moleculeCommonName: 'CBD',
    concentration: 90
  }
]

const newMoleculePrediction = (): MoleculePrediction => {
  return MOLECULE_LIST[Math.floor(Math.random() * MOLECULE_LIST.length)]
}

export type PersonData = Person & {
  subRows?: PersonData[]
}

export function makeData(...lens: number[]): PersonData[] {
  const makeDataLevel = (depth = 0): PersonData[] => {
    const len = lens[depth]
    return range(len).map(() => ({
      ...newPerson(),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
    }))
  }

  return makeDataLevel()
}

export function makeMoleculePredictionData(len: number): MoleculePrediction[] {
  return range(len).map(() => newMoleculePrediction())
}

export async function fetchRows() {
  const { data, error } = await supabase
                            .from('lab_order')
                            .select(`
                              id,

                            `)
}
