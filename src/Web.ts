import { Dom } from './Dom'

export class Web extends Dom {
    constructor(selector: string) {
        super(selector)
    }
}
export const $ = (selector: string): Web => {
    return new Web(selector)
}
