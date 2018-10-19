// client/app/util/ApplicationException.js
class ApplicationException extends Error{
    constructor(msg = ''){
        super(msg);
        this.name = this.constructor.name;
    }
}