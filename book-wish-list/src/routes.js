
import { BookIndex } from './pages/book-index'


// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <BookIndex />,
        label: 'Books'
    },

]

export default routes