import { useState, useCallback } from 'react';

type Operator = '+' | '-' | '×' | '÷' | null;

interface CalculatorState {
  display: string;
  storedValue: number | null;
  operator: Operator;
  waitingForOperand: boolean;
  justCalculated: boolean;
}

const initialState: CalculatorState = {
  display: '0',
  storedValue: null,
  operator: null,
  waitingForOperand: false,
  justCalculated: false,
};

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState);

  const inputDigit = useCallback((digit: string) => {
    setState((prev) => {
      if (prev.waitingForOperand || prev.justCalculated) {
        return {
          ...prev,
          display: digit,
          waitingForOperand: false,
          justCalculated: false,
        };
      }
      if (prev.display === 'Error') {
        return { ...prev, display: digit };
      }
      const newDisplay =
        prev.display === '0' ? digit : prev.display + digit;
      // Limit display length
      if (newDisplay.replace('.', '').replace('-', '').length > 12) return prev;
      return { ...prev, display: newDisplay };
    });
  }, []);

  const inputDecimal = useCallback(() => {
    setState((prev) => {
      if (prev.display === 'Error') return { ...prev, display: '0.' };
      if (prev.waitingForOperand || prev.justCalculated) {
        return {
          ...prev,
          display: '0.',
          waitingForOperand: false,
          justCalculated: false,
        };
      }
      if (prev.display.includes('.')) return prev;
      return { ...prev, display: prev.display + '.' };
    });
  }, []);

  const clear = useCallback(() => {
    setState(initialState);
  }, []);

  const toggleSign = useCallback(() => {
    setState((prev) => {
      if (prev.display === 'Error' || prev.display === '0') return prev;
      const value = parseFloat(prev.display);
      return { ...prev, display: String(-value) };
    });
  }, []);

  const percentage = useCallback(() => {
    setState((prev) => {
      if (prev.display === 'Error') return prev;
      const value = parseFloat(prev.display);
      const result = value / 100;
      return { ...prev, display: formatResult(result), justCalculated: true };
    });
  }, []);

  const selectOperator = useCallback((op: Operator) => {
    setState((prev) => {
      if (prev.display === 'Error') return prev;

      const currentValue = parseFloat(prev.display);

      // If we already have a stored value and an operator, calculate first
      if (prev.storedValue !== null && prev.operator && !prev.waitingForOperand) {
        const result = calculate(prev.storedValue, currentValue, prev.operator);
        if (result === null) {
          return { ...initialState, display: 'Error' };
        }
        return {
          display: formatResult(result),
          storedValue: result,
          operator: op,
          waitingForOperand: true,
          justCalculated: false,
        };
      }

      return {
        ...prev,
        storedValue: currentValue,
        operator: op,
        waitingForOperand: true,
        justCalculated: false,
      };
    });
  }, []);

  const equals = useCallback(() => {
    setState((prev) => {
      if (prev.display === 'Error') return prev;
      if (prev.storedValue === null || prev.operator === null) {
        return { ...prev, justCalculated: true };
      }
      const currentValue = parseFloat(prev.display);
      const result = calculate(prev.storedValue, currentValue, prev.operator);
      if (result === null) {
        return { ...initialState, display: 'Error' };
      }
      return {
        display: formatResult(result),
        storedValue: null,
        operator: null,
        waitingForOperand: false,
        justCalculated: true,
      };
    });
  }, []);

  return {
    display: state.display,
    operator: state.operator,
    inputDigit,
    inputDecimal,
    clear,
    toggleSign,
    percentage,
    selectOperator,
    equals,
  };
}

function calculate(a: number, b: number, op: Operator): number | null {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '×': return a * b;
    case '÷':
      if (b === 0) return null;
      return a / b;
    default: return b;
  }
}

function formatResult(value: number): string {
  if (!isFinite(value)) return 'Error';
  // Avoid floating point noise
  const rounded = parseFloat(value.toPrecision(12));
  const str = String(rounded);
  // Limit display length
  if (str.length > 14) {
    return rounded.toExponential(6);
  }
  return str;
}
