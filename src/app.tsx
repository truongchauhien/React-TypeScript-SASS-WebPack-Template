import React from 'react';
import { RouterProvider, createBrowserRouter } from '../node_modules/react-router-dom/dist/index';
import stylesheets from './app.module.scss';
import './app.scss';
import Root from './features/layout/root';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />
    }
])

const App = (
    <React.StrictMode>
        <div className={stylesheets.app}>
            <RouterProvider router={router} />
        </div>
    </React.StrictMode>
)

export default App;
