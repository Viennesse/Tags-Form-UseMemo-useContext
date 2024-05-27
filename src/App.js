import MemoCounter from "./MemoCounter";
import Form from "./Form"
import UseCallbackFirstExample from "./UseCallbackFirstExample";

function App() {
  return (
    <div className="App">
      <Form />
      <hr/>
      <h4>MemoCounter: use Memo Hook</h4>
      <MemoCounter />
      <hr/>
      <h4>Use Callback First Example</h4>
      <UseCallbackFirstExample />
      <hr/>
    </div>
  );
}

export default App;
