const Post = require('../models/post');

const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new Post({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', result: newPost});
    } catch (error) {
        res.status(500).json({ message: 'Error while creating post', error: error.message});
    }

}

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ message: 'Posts fetched successfully', result: posts });
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching posts', error: error.message });
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const existingPost = await Post.findById(id);

        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });  
        }

        if (req.userId !== existingPost.creator) {
            return res.status(403).json({ message: 'Unauthorized access, you are not the owner of this post'});

        }

    existingPost.title = title;
    existingPost.content = content;

    await existingPost.save();

    res.status(200).json({ message: 'Post updated successfully', result: existingPost});

    } catch (error) {
        res.status(500).json({ message: 'Error while updating post', error: error.message});

    }
}

const patchPost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const existingPost = await Post.findById(id);

        if (!existingPost) {
            return res.status(400).json({ message: "Post not found"});
        }

        if (req.userId !== existingPost.creator) {
            return res.status(400).json({ message: "You are not authorized to patch this post"});
        }
    

    if (title) existingPost.title = title;
    if (content) existingPost.content = content;

    await existingPost.save();
    res.status(201).json({ message: "Post patched successfully", result: existingPost});

    } catch (error) {
        res.status(404).json({ message: "Error while patching Post", error: error.message})
    }

}

const deletePost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
       
        if (!post) {
            return res.status(404).json({ message: "Cannot find post"});
        }

        if (req.userId !== post.creator) {
            return res.status(404).json({ message: "Not authorized to perform task"});
        }

        await Post.findByIdAndDelete(id);
        return res.status(200).json({ message: "Post deleted successfully", result: " " });

    } catch (error) {
        return res.status(500).json({ message: "Failed to delete post", error: error.message})
    }

}

const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const existingPost = await Post.findById(id);

        if (!existingPost) {
            return res.status(404).json({ message: "Post not found"});
        }

        return res.status(202).json({ message: "Post fetched successfully", result: existingPost });   

    } catch (error) {
         return res.status(500).json({ message: "Failed to fetch post", error: error.message})

    }
}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    patchPost,
    deletePost,
    getPostById
}