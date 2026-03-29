
export function isNotEmpty(value) {
    return value.trim() !== "";
}

export function hasMinLength(value, minLength) {
    return value.trim().length >= minLength;
}

export function isEqualToOtherValue(value, otherValue) {
    return value === otherValue;
}
// export const mailsRe = /\w+@\w+\.\w+/ig; 
export const mailsRe = /^\S+@\S+\.\S+$/; 

export function isEmail(value) {
    return mailsRe.test(value);
}

export function isPhone(value) {
    return /^[0-9]{10,15}$/.test(value);
}

export function isEgyptianPhone(value) {
    return /^01[0125][0-9]{8}$/.test(value);
}