import { useSelector } from "react-redux";
import { selectAllPosts, getPostsError, getPostsStatus } from "./postSlice";
import PostExcerpt from "./PostExcerpt";

const PostList = () => {
    const posts = useSelector(selectAllPosts);
    // console.log('Posts in PostList:', posts);
    const PostsStatus = useSelector(getPostsStatus);
    const PostsError = useSelector(getPostsError);
    let content;
    if (PostsStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (PostsStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post} />)
    } else if (PostsStatus === 'failed') {
        content = <p>{PostsError}</p>;
    }
    return (
        <div>
            <h2>Posts</h2>
            {content}
        </div>
    )
}

export default PostList
