import Calculator from "./calculator/calculator";

function App() {
  const appStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#000000'
  };

  return (
    <div style={appStyle}>
      <Calculator />
    </div>
  );
}

export default App;
