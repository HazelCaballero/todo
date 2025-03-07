import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppToDoByHazel from '../pages/AppToDoByHazel';

function RoutingByHazel() {


  return (
    <div>
      <Router>
        <Routes>
                            <Route path="/AppToDo" element={<AppToDoByHazel/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default RoutingByHazel