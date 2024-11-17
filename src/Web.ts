import {Dom} from './Dom'

export const $ = (selector: string) => new Web(selector)

export class Web extends Dom {
    constructor(selector: string) {
        super(selector)
    }
}