import './App.css';
import data from './databases/emogidb.js'
import { useState } from 'react';

function App() {

  var value = "no emoji choosen yet.";

  var [initvalue, valuefunc] = useState(value);

  function checkrespectiveemoji(event) {
    var choosenvalue = event.target.value;
    if (choosenvalue === '') {
      valuefunc("no emoji choosen yet.")
      emojifunc(displaykeys());
      return;
    }
    if (data[choosenvalue] !== undefined) {
      valuefunc("choosen emoji: " + data[choosenvalue]);
    } else {
      getemojibyname(choosenvalue)
    }
  }

  function getemojibyname(choosenvalue) {
    var values = displaykeys(true)
    var realvalues = displaykeys(false)
    var flag = 0;
    var cntr = 0;
    var matchemojis = []
    for (value of values) {
      if (value.includes(choosenvalue)) {
        // console.log(value);
        flag += 1;
        matchemojis.push(realvalues[cntr]);
      }
      cntr += 1;
    }
    emojifunc(matchemojis)
    if (!flag)
      valuefunc("Emoji Not in database.")
    else {
      valuefunc("Listing " + flag + " Best match")
    }
  }


  function displaykeys(returnNames = false) {
    var key;
    var key_object = []
    if (returnNames) {
      for (key in data) {
        key_object.push(data[key])
      }
      return key_object
    }
    for (key in data) {
      key_object.push(key)
    }
    return key_object
  }

  function getemojibyclick(item) {
    valuefunc(item + " " + data[item]);
  }

  var [initemojis, emojifunc] = useState(displaykeys());


  return (
    <div className="App">
      <input type="text" placeholder="Type an emoji or name." onChange={checkrespectiveemoji} />
      <h2>{initvalue}</h2>
      <div className="emojisections">
        <ul>
          {initemojis.map(function (item, index) {
            return <li key={item} onClick={() => getemojibyclick(item)}>{item}</li>
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
