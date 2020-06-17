module.exports.validateRegisterInput = (
    username,
    email,
    password,
    passwordConfirm,
) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = `You must provide username`;
    }
    if (email.trim() === '') {
        errors.email = `You must provide an email`;
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = 'You must provide valid email address';
        }
    }
    if (password === '') {
        errors.password = 'You must provide a password';
    } else if (password !== passwordConfirm) {
        errors.passwordConfirm = 'Passwords do not match';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};
