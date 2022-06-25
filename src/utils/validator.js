import validator from 'validator';

class ValidateFields {
    //this could be confusing so to clear things out
    //true means error except for EXCEPTION SECTION
    //Bool of string also return true so that also indicates error

    validateAlpha(text, min = 0, max = 1000) {
        if (validator.isAlpha(text, 'en-US', { ignore: " " })) {
            if (validator.isLength(text, { min: min, max: max })) return false
            return `should be of ${min} to ${max} characters`
        }
        return "Please enter a valid input"; //TODO: update return message
    }

    validateText(text, min = 0, max = 1000) {
        if (validator.isAlphanumeric(text, 'en-US', { ignore: " " })) {
            if (validator.isLength(text, { min: min, max: max })) return false
            return `should be of ${min} to ${max} characters`
        }
        return "Please enter a valid input"; //TODO: update return message
    }

    validateEmail(email) {
        if (validator.isEmail(email)) return false
        return "Please enter a valid email"
    }

    validatePassword(password) {
        if (validator.isEmpty(password)) {
            return 'Password is required';
        } else if (!validator.isLength(password, { min: 8 })) {
            return 'Password should be minimum 8 characters';
        }
        return false;
    }

    validatePhoneNumber(phone) {
        if (validator.isMobilePhone(phone,'en-IN' , { StrictMode: true }))
            return false
        return "Please enter a valid phone number"
    }

    validateObject(obj){
        // TODO: introduce schema and schema check, right now is very simple check
        console.log(obj)
        if(obj && Object.keys(obj).length >= 0 && Object.getPrototypeOf(obj) === Object.prototype)
            return false
        else
            return true
    }

    validateUrl(url){
        if (validator.isURL(url,
            // {host_whitelist: [
            //     /^.*slack\.com$/,
            // ]}
            ))
            return false
        return "This is not a valid url"
    }

    validateAddress(address){
        if (validator.isAlphanumeric(address, 'en-US', { ignore:" ,-" }
            // {host_whitelist: [
            //     /^.*slack\.com$/,
            // ]}
            ))
            return false
        return "This is not a valid Vehicle Registration number"
    }
    
    validateLicenseNumber(licenseNumber){
        if (validator.isAlphanumeric(licenseNumber, 'en-US', { ignore:"-" }
            // {host_whitelist: [
            //     /^.*slack\.com$/,
            // ]}
            ))
            return false
        return "This is not a valid License number"
    }

    validateVehicleRegisterationNumber(registerationNumber){
        if (validator.isAlphanumeric(registerationNumber, 'en-US', { ignore:"-" }
            // {host_whitelist: [
            //     /^.*slack\.com$/,
            // ]}
            ))
            return false
        return "This is not a valid Vehicle Registration number"
    }

    validateNumber(number){
        if (validator.isNumeric(number.toString(), 'en-US'
            // {host_whitelist: [
            //     /^.*slack\.com$/,
            // ]}
            ))
            return false
        return "This is not a valid number"
    }

    validateFloat(){

    }

    validateDateTime(){

    }

    //EXCEPTION SECTION BELOW

    validateEmpty(name) {
        if (validator.isEmpty(name.trim())) {
            return "This field cannot be left empty"
        }
        return false;
    }

    validateLength(size, min, max) {
        return min <= size && max >= size
    }
}

const validateFields = new ValidateFields();

export { validateFields };