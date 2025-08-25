import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/userSlice";

const PostAuthor = ({ userId }) => {
    const user = useSelector(selectAllUsers);
    const author = user?.find(user => user.id === userId)
    // console.log('Users in PostAuthor:', user)
    return (
        <span>
            By: {author ? author.name : 'Unknown Author'}
        </span>
    )
}

export default PostAuthor
