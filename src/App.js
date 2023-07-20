```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AccountLogin from './components/AccountLogin';
import AccountManagement from './components/AccountManagement';
import ProjectBrowser from './components/ProjectBrowser';
import GoalSetting from './components/GoalSetting';
import DutyManager from './components/DutyManager';
import DescriptionEditor from './components/DescriptionEditor';
import ContactUs from './components/ContactUs';
import './styles/main.css';
import './styles/responsive.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={AccountLogin} />
        <Route path="/account" component={AccountManagement} />
        <Route path="/projects" component={ProjectBrowser} />
        <Route path="/goals" component={GoalSetting} />
        <Route path="/duties" component={DutyManager} />
        <Route path="/edit" component={DescriptionEditor} />
        <Route path="/contact" component={ContactUs} />
      </Switch>
    </Router>
  );
}

export default App;
```