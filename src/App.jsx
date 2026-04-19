import Sidebar from './Components/Sidebar.jsx';
import Feed from './Components/Feed.jsx';
import Widgets from './Components/Widgets.jsx'
function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  );
}

export default App;