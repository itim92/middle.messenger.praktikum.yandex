class Validator {
    isValidLogin(value: string): boolean {
        return this.isValidByRegex([/[0-9a-z-_]{3,20}/i, /[a-z-_]/i], value);
    }

    isValidPassword(value: string): boolean {
        return this.isValidByRegex(
            [/[0-9a-z-_]{8,40}/i, /[A-Z]+/, /\d+/],
            value
        );
    }

    isValidEmail(value: string): boolean {
        return this.isValidByRegex(
            /[0-9a-z-_.]+@[a-z0-9-]+.[a-z]{2,3}/i,
            value
        );
    }

    isValidMessage(value: string): boolean {
        return value !== "";
    }

    isValisPhone(value: string): boolean {
        return this.isValidByRegex(/\+?\d{10,15}/i, value);
    }

    isValidName(value: string): boolean {
        return this.isValidByRegex(/^[A-ZA-Я]+[A-Za-zA-Яа-я-]+$/, value);
    }

    isEmpty(value: string): boolean {
        return value === "";
    }

    isValidByRegex(regex: RegExp | RegExp[], value: string): boolean {
        if (Array.isArray(regex)) {
            return regex.every((r) => r.test(value));
        }

        return regex.test(value);
    }
}

const validatorService = new Validator();
export { validatorService };
