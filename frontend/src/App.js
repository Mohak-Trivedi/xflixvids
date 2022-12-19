// import logo from './logo.svg';
import './App.css';

// Added: To use Switch and Route to route to Dashboard.
import { Route, Switch } from "react-router-dom";

// Added: To use <Dashboard />
import Dashboard from "./components/Dashboard";

// Added: To use VideoPage
import VideoPage from "./components/VideoPage";

// Added: To use API endpoint conveniently throughout all of the files in the project.
export const config = {
  endpoint: `https://xflix-backend-bicn.onrender.com/v1`,
};

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/video/:id" component={VideoPage} />
      </Switch>
    </div>
  );
}

export default App;
