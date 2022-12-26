import './App.css';
import React from 'react';
import StoryViewer from './components/StoryViewer';
import EventStates from './components/EventStates';
import Questionnaire from './components/Questionnaire';
import TreeViewer from './components/TreeViewer';

const App = () => {
  const [evStates, setEvStates] = React.useState([]);

  const stateSend = (values) => {
    setEvStates(
      values
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
        <StoryViewer/>
        <EventStates tableData={evStates}/>
        </div>
        <div>
        <Questionnaire callBack={stateSend}/>
        <TreeViewer treeData={evStates}/>
        </div>
      </header>
    </div>
  );
}

export default App;
