import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postSlice";
import { selectAllUsers } from "../users/userSlice";
import { useNavigate } from "react-router-dom";
const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');
    const user = useSelector(selectAllUsers)
    // console.log(user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onTitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)
    const onAuthorChange = e => setUserId(e.target.value)
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';


    const savePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({ title, body: content, userId })).unwrap();

                setTitle('')
                setContent('')
                setUserId('');
                navigate('/')
            } catch (err) {
                console.log("Error", err)

            } finally {
                setAddRequestStatus('idle')
            }
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
                <select id="postAuthor" value={userId}
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
            </form>

        </div>
    )
}

export default AddPostForm
