import React from 'react';
import Widget from '../components/Widget';

export default ({ location }) => {
  // console.log(props);

  return (
    <Widget>
      <h1>A página {location.pathname} não existe!</h1>
    </Widget>
  );
}
