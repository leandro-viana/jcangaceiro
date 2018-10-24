// client/app/ui/converters/DataInvalidaException.js
import { ApplicationException }	from '../../util/ApplicationException.js';

export class DataInvalidaException extends ApplicationException{
    constructor(){
        super('A data deve estar no formato dd/mm/aaaa')
    }
}