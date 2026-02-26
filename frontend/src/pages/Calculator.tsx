import { useCalculator } from '@/hooks/useCalculator';
import { cn } from '@/lib/utils';

type ButtonVariant = 'digit' | 'operator' | 'action' | 'equals';

interface CalcButtonProps {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
  wide?: boolean;
  active?: boolean;
}

function CalcButton({ label, onClick, variant = 'digit', wide = false, active = false }: CalcButtonProps) {
  const base =
    'flex items-center justify-center rounded-2xl text-xl font-semibold select-none cursor-pointer transition-all duration-100 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring h-16';

  const variants: Record<ButtonVariant, string> = {
    digit: 'bg-card text-foreground hover:bg-accent border border-border shadow-card-sm',
    operator: cn(
      'border border-border shadow-card-sm',
      active
        ? 'bg-primary text-primary-foreground'
        : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
    ),
    action: 'bg-muted text-muted-foreground hover:bg-accent border border-border shadow-card-sm',
    equals: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-card border border-primary/20',
  };

  return (
    <button
      onClick={onClick}
      className={cn(base, variants[variant], wide && 'col-span-2')}
      aria-label={label}
    >
      {label}
    </button>
  );
}

export function Calculator() {
  const {
    display,
    operator,
    inputDigit,
    inputDecimal,
    clear,
    toggleSign,
    percentage,
    selectOperator,
    equals,
  } = useCalculator();

  const isError = display === 'Error';

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10 bg-background">
      <div className="w-full max-w-sm">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="font-display text-2xl font-bold text-foreground">Calculator</h1>
          <p className="text-sm text-muted-foreground mt-1">Standard arithmetic calculator</p>
        </div>

        {/* Calculator Card */}
        <div className="bg-card rounded-3xl shadow-card border border-border overflow-hidden">
          {/* Display */}
          <div className="px-6 pt-6 pb-4 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="text-right min-h-[4rem] flex flex-col items-end justify-end gap-1">
              {/* Operator indicator */}
              <div className="h-5 flex items-center gap-1">
                {operator && (
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {operator}
                  </span>
                )}
              </div>
              {/* Main display */}
              <div
                className={cn(
                  'font-display font-bold leading-none break-all',
                  isError
                    ? 'text-destructive text-3xl'
                    : display.length > 10
                    ? 'text-2xl text-foreground'
                    : display.length > 7
                    ? 'text-3xl text-foreground'
                    : 'text-5xl text-foreground'
                )}
              >
                {display}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border mx-4" />

          {/* Button Grid */}
          <div className="p-4 grid grid-cols-4 gap-3">
            {/* Row 1: Action buttons */}
            <CalcButton label="C" onClick={clear} variant="action" />
            <CalcButton label="+/−" onClick={toggleSign} variant="action" />
            <CalcButton label="%" onClick={percentage} variant="action" />
            <CalcButton label="÷" onClick={() => selectOperator('÷')} variant="operator" active={operator === '÷'} />

            {/* Row 2 */}
            <CalcButton label="7" onClick={() => inputDigit('7')} />
            <CalcButton label="8" onClick={() => inputDigit('8')} />
            <CalcButton label="9" onClick={() => inputDigit('9')} />
            <CalcButton label="×" onClick={() => selectOperator('×')} variant="operator" active={operator === '×'} />

            {/* Row 3 */}
            <CalcButton label="4" onClick={() => inputDigit('4')} />
            <CalcButton label="5" onClick={() => inputDigit('5')} />
            <CalcButton label="6" onClick={() => inputDigit('6')} />
            <CalcButton label="−" onClick={() => selectOperator('-')} variant="operator" active={operator === '-'} />

            {/* Row 4 */}
            <CalcButton label="1" onClick={() => inputDigit('1')} />
            <CalcButton label="2" onClick={() => inputDigit('2')} />
            <CalcButton label="3" onClick={() => inputDigit('3')} />
            <CalcButton label="+" onClick={() => selectOperator('+')} variant="operator" active={operator === '+'} />

            {/* Row 5 */}
            <CalcButton label="0" onClick={() => inputDigit('0')} wide />
            <CalcButton label="." onClick={inputDecimal} />
            <CalcButton label="=" onClick={equals} variant="equals" />
          </div>
        </div>

        {/* Hint */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Tap C to clear · Tap an operator to chain calculations
        </p>
      </div>
    </div>
  );
}
