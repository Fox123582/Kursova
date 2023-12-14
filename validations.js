import {body} from 'express-validator'

export const loginValidation = [
    body('email','Email is not valid').isEmail(),
    body('password', 'Password length must be more than 5 characters ').isLength({min:5}),
]

export const registerValidation = [
    body('email','Email is not valid').isEmail(),
    body('password', 'Password length must be more than 5 characters ').isLength({min:5}),
    body('fullName', 'Incorrect full name').isLength({min:3}),
    body('avatarUrl', 'Invalid avatar url').optional().isURL(),
]
export const postCreateValidation = [
    body('title','Enter title of the article').isLength({min:3}).isString(),
    body('text', 'Enter text of the article').isLength({min:3}).isString(),
    body('tags', 'Incorrect tags format').optional().isString(),
    body('imageUrl', 'Invalid image url').optional().isString(),
]

// export const commentCreateValidation = [
//     body('text', 'Enter text of the article').isLength({min:3}).isString(),
// ]
