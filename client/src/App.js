import {HomePage, PostPage, NotFoundPage} from './pages';
import {Routes, Route} from 'react-router-dom';
import {PostProvider} from './context/postContext.jsx'
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className='bg-neutral-900 min-h-screen flex items-center'>
      <div className='px-10 m-auto container'>
        <PostProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/new' element={<PostPage />} />
            <Route path='/posts/:id' element={<PostPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
          <Toaster />
        </PostProvider>
      </div>
    </div>
  )
}

export default App