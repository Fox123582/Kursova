// import CommentsModel from '../models/Comments.js'
// import mongoose from "mongoose";
//
// export const getAllComments = async (req,res)=>{
//     try{
//         const comments = await CommentsModel.find().populate('user').populate('post').exec()
//
//         res.json(comments)
//     } catch (err){
//         console.log(err);
//         res.status(500).json({
//             message: 'Не удалось получить comments',
//         });
//     }
// }
// export const addComment = async (req, res) => {
//     try {
//         const { text, user, post } = req.body;
//
//         // Проверка, что user и post являются ObjectId
//         if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(post)) {
//             return res.status(400).json({ message: 'Неверный формат идентификатора пользователя или поста' });
//         }
//
//         const newComment = new CommentsModel({
//             text,
//             user,
//             post,
//         });
//
//         const savedComment = await newComment.save();
//
//         // При необходимости, вы можете выполнить populate для получения данных пользователя и поста
//         await savedComment.populate('user').populate('post').execPopulate();
//
//         res.json(savedComment);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'Не удалось добавить комментарий',
//         });
//     }
// };
