import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../assets/features/posts/postSlice'
import userReducer from '../assets/features/users/userSlice'
export const store = configureStore({
    reducer: {
        posts: postReducer,
        user: userReducer
    }
})