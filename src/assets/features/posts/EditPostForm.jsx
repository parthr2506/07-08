import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/userSlice";
import { selectPostById, updatePost, deletePost } from './postSlice';
import { useParams, useNavigate } from 'react-router-dom'
const EditPostForm = () => {
    const { postId } = useParams()
    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const navigate = useNavigate();
    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);
    const [addRequestStatus, setAddRequestStatus] = useState('idle');
    const user = useSelector(selectAllUsers)
    if (!post) {
        return (
            <p>NO PAGE FOUND</p>
        )
    }
    // console.log(user)
    const dispatch = useDispatch();

    const onTitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)
    const onAuthorChange = e => setUserId(Number(e.target.value))
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';


    const savePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap();

                setTitle('')
                setContent('')
                setUserId('');
                navigate(`/post/${postId}`)
            } catch (err) {
                console.log("Error", err)

            } finally {
                setAddRequestStatus('idle')
            }
        }
    }
    const onDeletePostClicked = () => {
        try {
            setAddRequestStatus('pending')
            dispatch(deletePost({ id: post.id })).unwrap();
            setTitle('')
            setContent('')
            setUserId('');
            navigate('/')
        } catch (err) {
            console.log("Error in delete", err)

        } finally {
            setAddRequestStatus('idle')
        }
    }
    const userOptions = user?.map(user => (
        <option
            key={user.id} value={user.id}>{user.name}</option>
    ))
    return (
        <div>
            <h2>Add New Post!!!</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChange}
                ></input>
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" defaultValue={userId}
                    onChange={onAuthorChange}
                >
                    <option value=" "></option>
                    {userOptions}
                </select>
                <label htmlFor="postContent">Post Content:</label>
                <textarea
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChange}
                ></textarea>
                <button type="button"
                    onClick={() => savePostClicked()}
                    disabled={!canSave}
                >Save Post</button>
                <button className="deleteButton" type="button"
                    onClick={() => onDeletePostClicked()}
                >Delete Post</button>
            </form>

        </div>
    )
}

export default EditPostForm
