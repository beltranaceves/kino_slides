import React, { useState, useEffect } from 'react';
import SlidesEditor from './components/slide_editor/SlidesEditor';

export default function App({ ctx, payload }) {
  const [state, setState] = useState(payload.state);
  const [route, setRoute] = useState(payload.route);

  useEffect(() => {
    ctx.handleEvent("update", ({ state, route }) => {
      setState(state);
      setRoute(route);
    });
  }, []);

  const handleChange = (event) => {
    const newState = event.target.value;
    console.log("I AM CHANGING AND REACTING")
    setState(newState);
    ctx.pushEvent("update", { state: newState });
  };

  const handleRouteChange = (newRoute) => {
    setRoute(newRoute);
    ctx.pushEvent("update", { route: newRoute });
  };

  const renderRoute = (route) => {
    switch(route) {
      case 'new':
        return (
          <div>
            We are in the new slide route
            <button
              onClick={() => handleRouteChange('edit')}
              className="mt-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Go to Edit
            </button>
          </div>
        )
      case 'edit':
        return (
          <div>
            <div style={{ width: '800px', height: '600px' }}>
              <SlidesEditor />
            </div>
            <button
              onClick={() => handleRouteChange('new')}
              className="mt-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Back to New
            </button>
          </div>
        )
      default:
        return <div>
          route value is: {route}
        </div>
    }
  }
  return (
    <div>
      <label 
        htmlFor="state" 
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add Your Source Here
      </label>
      <div className="mt-2">
        <textarea
          id="state"
          rows="4"
          name="state"
          value={state}
          onChange={handleChange}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      {renderRoute(route)}
    </div>
  );
}