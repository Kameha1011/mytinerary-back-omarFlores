import bcryptjs from 'bcryptjs';

export const passwordVerify = (req, res, next) => {
    const password_db = req.user.password;
    const password_form = req.body.password;

    if(bcryptjs.compareSync(password_form, password_db)) {
        return next()
    }

    return res.status(400).json({
        message: 'Wrong credentials'
    })
}