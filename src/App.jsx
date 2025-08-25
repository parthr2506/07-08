import './App.css'
import AddPostForm from './assets/features/posts/AddPostForm'
import PostList from './assets/features/posts/PostList'
import SinglePostPage from './assets/features/posts/SinglePostPage'
import Layout from './assets/components/Layout'
import EditPostForm from './assets/features/posts/EditPostForm'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<PostList />} />

          <Route path="post">
            <Route index element={<AddPostForm />} />
            <Route path=":postId" element={<SinglePostPage />} />
            <Route path="edit/:postId" element={<EditPostForm />} />
          </Route>

        </Route>
      </Routes>
    </>
  )
}

export default App
