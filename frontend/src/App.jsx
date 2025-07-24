import Notes from './pages/notes'
import Chatbot from './pages/chatbot';
import {createBrowserRouter,RouterProvider,} from "react-router";
import Landing from './pages/landing';
import Summeriser from './pages/summeriser';
import Auth from './pages/Auth';
import ProtectedRoute from './components/Privateroute';
import Dashboard from './pages/dashborad';




let router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/notes",
    element: (
      <ProtectedRoute>
        <Notes />
      </ProtectedRoute>
    )
  },
  {
    path: "/chatbot",
    element: (
      <ProtectedRoute>
        <Chatbot />
      </ProtectedRoute>
    )
  },
  {
    path: "/summarizer",
    element: (
      <ProtectedRoute>
        <Summeriser />
      </ProtectedRoute>
    )
  },
  {
    path: "/auth",
    element: <Auth />
  }
]);
function App() {
	
	return (
		<div>
			  <RouterProvider router={router} />
		</div>
	);
}

export default App;
