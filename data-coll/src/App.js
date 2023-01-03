import './App.css';
import React from 'react';
import StoryViewer from './components/StoryViewer';
import EventStates from './components/EventStates';
import Questionnaire from './components/Questionnaire';
import TreeViewer from './components/TreeViewer';

const stories = [
  ["I bought a box of packing tape from Amazon.", "It was an Amazon Prime order.", "The package was supposed to arrive on Wednesday by 8 pm.", "It did not arrive that day.", "I contacted Amazon and accepted a $5 credit."],
  ["David and I went to work at our grocery store.", "Everything was fine until an unforeseen accident occurred.", "The store's electricity went out which had caused the vegetables to go bad.", "We had to go to each vegetable section and throw all the veggies away.", "This was the biggest waste I've seen."],
  ["Amy went to the kitchen to see what was for dinner", "She had played hard at volleyball practice and was hungry.", "Her mother informed her dinner wouldn't be ready for an hour.", "Her mother suggested she eat a snack.", "She declined, she didn't want a snack to ruin her appetite."],
  ["The jihadist called the support line with a complaint of an itch.", "His vest bomb had been bothering him for the better part of a day.", "The support tech requested the number to the mobile attached to it.", "Promising only a quick tweak was necessary, the tech called the phone.", "The support line went dead, and tech went back to reading his book."],
  ["Neil had seen many countries in the Middle East.", "He decided to see Qatar too.", "He thought it would be similar to other countries he had seen.", "But it had its own unique culture and history.", "Neil was glad he had made time to see Qatar."]
];

const currentStory = stories[Math.floor(Math.random() * stories.length)];


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
        <StoryViewer story={currentStory}/>
        <EventStates tableData={evStates}/>
        </div>
        <div>
        <Questionnaire callBack={stateSend} data={evStates}/>
        <TreeViewer treeData={evStates}/>
        </div>
      </header>
    </div>
  );
}

export default App;
