import React, { useState, useEffect } from 'react';

export default function App({ ctx, payload }) {
  const [source, setSource] = useState(payload.source);

  useEffect(() => {
    // Handle updates from Elixir side
    ctx.handleEvent("update", ({ source }) => {
      setSource(source);
    });
  }, []);

  const handleChange = (event) => {
    const newSource = event.target.value;
    console.log("I AM CHANGING AND REACTING")
    setSource(newSource);
    ctx.pushEvent("update", { source: newSource });
  };

  return (
    <div>
      <label 
        htmlFor="source" 
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add Your Source Here
      </label>
      <div className="mt-2">
        <textarea
          id="source"
          rows="4"
          name="source"
          value={source}
          onChange={handleChange}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
