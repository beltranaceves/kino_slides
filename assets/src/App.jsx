import { useState, useEffect } from 'react';
import Edit from './routes/edit';
import New from './routes/new';
import Sample from './routes/sample';
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
    switch (route) {
      case 'edit':
        return <Edit handleRouteChange={handleRouteChange} />
      case 'new':
        return <New handleRouteChange={handleRouteChange} />
      case 'sample':
        return <Sample handleRouteChange={handleRouteChange} />
      default:
        return (<div>
          route value is: {route}
        </div>)
    }
  }
  return (
    <div>
      {renderRoute(route)}
    </div>
  );
}