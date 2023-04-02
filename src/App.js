import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import oven from './oven.png'
import "./App.css";

// import logo from './logo.svg';

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Search Bears with Paint Brushes the Starry Night, painted by Vincent Van Gogh..."
  );
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };

  return (
    <div className="app-main">
      {loading ? (
        <>
          <h2>Your image is generating, please wait...</h2>
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          <h1>The Bakery</h1>
          <h2>Bake your image below</h2>
          
            <textarea
              className="app-input"
              placeholder={placeholder}
              onChange={(e) => setPrompt(e.target.value)}
              rows="10"
              cols="40"
            />
          <button onClick={generateImage}>Generate an Image</button>
          {/* <img src={oven} className="App-logo" alt="logo" /> */}
          <div className="oven-outline">
            {result.length > 0 ? (
              <img className="result-image" src={result} alt="result" />
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

{/* <div className="App">
<header className="App-header">
  <h1>The Bakery</h1>
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
</div> */}