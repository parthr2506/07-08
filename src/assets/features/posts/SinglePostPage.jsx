import PostAuthor from './PostAuthor'
// import TimeAgo from "./TimeAgo.jsx";
import ReactionButtons from './ReactionButtons';
import { useSelector } from 'react-redux';
import { selectPostById } from './postSlice';
import { useParams, Link } from 'react-router-dom';
const SinglePostPage = () => {
    // console.log(post)
    const { postId } = useParams()
    const post = useSelector((state) => selectPostById(state, Number(postId)))
    if (!post) {
        return (
            <p>NO PAGE FOUND</p>
        )
    }
    return (

        < article >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p className="postCredit">
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article >
    )
}

export default SinglePostPage 
