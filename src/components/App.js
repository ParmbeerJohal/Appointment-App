import '../css/App.css';
import { useState, useEffect } from 'react';

import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import { filter, without } from 'lodash';

function App() {

  const [myAppointments, setMyAppointments] = useState([{}]);
  const [formDisplay, setFormDisplay] = useState(false);
  const [lastIndex, setLastIndex] = useState(0);
  const [orderBy, setOrderBy] = useState('petName');
  const [orderDir, setOrderDir] = useState('asc');
  const [queryText, setQueryText] = useState('');

  const [isSafari, setIsSafari] = useState(true);

  const toggleForm = () => setFormDisplay(!formDisplay);

  const deleteAppointment = (apt) => {
    const tempApts = without(myAppointments, apt);
    setMyAppointments(tempApts);
  }

  const addAppointment = (apt) => {
    apt.id = lastIndex;
    setLastIndex(lastIndex + 1);
    
    const tempApts = myAppointments;
    tempApts.unshift(apt);
    
    setMyAppointments(tempApts);
  };

  const changeOrder = (order, dir) => {
    setOrderBy(order);
    setOrderDir(dir);
  }

  useEffect(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        var index = 0;
        const apts = result.map(item => {
          item.id = index;
          index++;
          return item;
        });
        setMyAppointments(apts);
        setLastIndex(index);
      });

      // check if the browser being used is Safari or not
      setIsSafari(navigator.userAgent.indexOf("Chrome") === -1);

  },[]);

  var order;
  var filteredApts = myAppointments;
  if (orderDir === 'asc') {
    order = 1;
  } else {
    order = -1;
  }

  filteredApts.sort((a,b) => {
    if(a[orderBy].toLowerCase() < b[orderBy].toLowerCase()) {
      return -1 * order;
    } else {
      return 1 * order;
    }
  });
  /*
  .filter(eachItem => {
      eachItem['petName'].toLowerCase().includes(queryText) ||
      eachItem['ownerName'].toLowerCase().includes(queryText) ||
      eachItem['aptNotes'].toLowerCase().includes(queryText)

  });
  */

  return (
    <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <AddAppointments
                formDisplay={formDisplay}
                toggleForm={toggleForm}
                addAppointment={addAppointment}
                isSafari={isSafari}
              />
              <SearchAppointments
                orderBy={orderBy}
                orderDir={orderDir}
                changeOrder={changeOrder}
                setQueryText={setQueryText}
              />
              <ListAppointments
                appointments={filteredApts}
                deleteAppointment={deleteAppointment}
                queryText={queryText}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
