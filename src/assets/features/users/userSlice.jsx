import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// const initialState = [
//     { id: '1', name: 'Parth Rahevar' },
//     { id: '2', name: 'Rohit Sharma' },
//     { id: '3', name: 'Virat Kohli' },
// ]
const initialState = []
const USERS_URL = 'https://jsonplaceholder.typicode.com/users'
export const fetchUsers = createAsyncThunk('posts/fetchUsers', async () => {
    const respone = await axios.get(USERS_URL)
    return respone.data
})
const userSlice = createSlice({

    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const selectAllUsers = (state) => state.user;
export default userSlice.reducer;