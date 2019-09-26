import React from 'react';
import ReactDOM from 'react-dom';

function App(): JSX.Element {
  const [text, setText] = React.useState('Loading...');

  React.useEffect(() => {
    (async () => {
      const data = await fetch('bff');
      const json = await data.json();

      if (typeof json === 'string') {
        setText(json);
      } else {
        setText(json.message || json.errorMessage || 'Unknown error');
      }
    })().catch(error => {
      setText(error.message);
    });
  }, []);

  return <h1>{text}</h1>;
}

ReactDOM.render(<App />, document.getElementById('app'));
