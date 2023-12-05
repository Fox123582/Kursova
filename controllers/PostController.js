import PostModel from "../models/Post.js";

export const getLastTags = async (req,res)=>{
    try{
        const posts = await PostModel.find().limit(10).exec()
        const tags = posts.map( obj => obj.tags).flat().slice(0,10)

        res.json(tags)
    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Can not get posts',
        });
    }
}
export const getAll = async (req,res)=>{
    try{
        const posts = await PostModel.find().populate('user').exec()

        res.json(posts)
    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
}

export const getOne = async (req,res)=>{
    // Assuming you have a mongoose model named "PostModel"
    PostModel.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { viewsCount: 1 } },
        { new: true } // This option returns the modified document
    )
        .populate('user')
        .then((doc) => {
            if (!doc) {
                return res.status(404).json({
                    message: 'Статья не найдена',
                });
            }

            res.json(doc);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                message: 'Не удалось вернуть статью',
            });
        });
}


export const remove = async (req,res)=>{
    try{
        const postId = req.params.id

        PostModel.findOneAndDelete({ _id: postId })
            .then((doc) => {
                if (!doc) {
                    console.log(e)
                    return res.status(404).json({
                        message: 'Post not found',
                    });
                }
                res.json({
                    success:true
                })
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    message: 'Unable to remove the post',
                });
            });



    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Can not get posts',
        });
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId,
        });
        const post = await doc.save();


        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postId },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags.split(','),
            },
            { new: true } // этот параметр гарантирует, что возвращается обновленный документ, а не старый
        );

        res.json({
            success: true,
            updatedPost, // возвращаем обновленный пост
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can not update posts',
        });
    }
};
