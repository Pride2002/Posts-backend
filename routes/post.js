const express = require("express");

const {
  createPost,
  getPosts,
  updatePost,
  patchPost,
  deletePost,
  getPostById,
  postsByUserId,
} = require("../controllers/post");

const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, createPost);
router.get("/", getPosts);
router.put("/:id", auth, updatePost);
router.patch("/:id", auth, patchPost);
router.delete("/:id", auth, deletePost);
router.get("/:id", auth, getPostById);
router.get("/user/:userId", postsByUserId);

module.exports = router;
