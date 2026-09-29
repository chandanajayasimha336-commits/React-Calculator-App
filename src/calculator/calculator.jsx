import React, { useState } from 'react';
import './calculator.css';

export default function Calculator() {
  const [display, setDisplay] = useState('');

  const appendValue = (val) => setDisplay((prev) => prev + val);
  const clearDisplay = () => setDisplay('');
  const deleteLast = () => setDisplay((prev) => prev.slice(0, -1));

  const calculate = () => {
    try {
      // Replace visual symbols with actual math operators
      const expression = display.replace(/×/g, '*').replace(/÷/g, '/');
      const result = new Function(`return ${expression}`)();
      
      if (result === undefined || isNaN(result)) {
        setDisplay('Error');
      } else {
        setDisplay(Number(result.toFixed(4)).toString()); // Limits decimals
      }
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display || '0'}</div>
      <div className="keypad">
        <button onClick={clearDisplay} className="btn fn">C</button>
        <button onClick={deleteLast} className="btn fn">⌫</button>
        <button onClick={() => appendValue('%')} className="btn fn">%</button>
        <button onClick={() => appendValue('÷')} className="btn op">÷</button>

        <button onClick={() => appendValue('7')} className="btn">7</button>
        <button onClick={() => appendValue('8')} className="btn">8</button>
        <button onClick={() => appendValue('9')} className="btn">9</button>
        <button onClick={() => appendValue('×')} className="btn op">×</button>

        <button onClick={() => appendValue('4')} className="btn">4</button>
        <button onClick={() => appendValue('5')} className="btn">5</button>
        <button onClick={() => appendValue('6')} className="btn">6</button>
        <button onClick={() => appendValue('-')} className="btn op">-</button>

        <button onClick={() => appendValue('1')} className="btn">1</button>
        <button onClick={() => appendValue('2')} className="btn">2</button>
        <button onClick={() => appendValue('3')} className="btn">3</button>
        <button onClick={() => appendValue('+')} className="btn op">+</button>

        <button onClick={() => appendValue('0')} className="btn zero">0</button>
        <button onClick={() => appendValue('.')} className="btn">.</button>
        <button onClick={calculate} className="btn eq">=</button>
      </div>
    </div>
  );
}
