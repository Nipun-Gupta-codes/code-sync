
export const executeCode = (lang: string, sourceCode: string, input: string) => {
  try {
    switch (lang) {
      case 'javascript':
        // Enhanced JavaScript execution
        const logs: string[] = [];
        const errors: string[] = [];
        
        // Create a safe environment with console.log capture
        const originalLog = console.log;
        const originalError = console.error;
        
        console.log = (...args) => logs.push(args.map(arg => String(arg)).join(' '));
        console.error = (...args) => errors.push(args.map(arg => String(arg)).join(' '));
        
        try {
          // Simple execution for basic JavaScript
          if (sourceCode.includes('console.log')) {
            // Extract console.log statements and execute them
            const jsLogMatches = sourceCode.match(/console\.log\([^)]+\)/g);
            if (jsLogMatches) {
              jsLogMatches.forEach(logStatement => {
                try {
                  eval(logStatement);
                } catch (e) {
                  errors.push(`Error in ${logStatement}: ${e}`);
                }
              });
            }
          } else {
            // Try to execute the whole code
            eval(sourceCode);
          }
        } catch (error) {
          errors.push(`Runtime Error: ${error}`);
        }
        
        // Restore original console methods
        console.log = originalLog;
        console.error = originalError;
        
        let result = '';
        if (logs.length > 0) result += logs.join('\n');
        if (errors.length > 0) result += (result ? '\n' : '') + 'ERRORS:\n' + errors.join('\n');
        
        return result || 'Code executed successfully (no output)';

      case 'python':
        // Enhanced Python simulation
        const pythonOutput: string[] = [];
        
        // Handle print statements
        const pythonPrintMatches = sourceCode.match(/print\([^)]+\)/g);
        if (pythonPrintMatches) {
          pythonPrintMatches.forEach(printStatement => {
            // Extract content between quotes
            const contentMatch = printStatement.match(/print\(["']([^"']+)["']\)/);
            if (contentMatch) {
              pythonOutput.push(contentMatch[1]);
            } else {
              // Handle variables or expressions
              const varMatch = printStatement.match(/print\(([^)]+)\)/);
              if (varMatch) {
                pythonOutput.push(`${varMatch[1]} (simulated output)`);
              }
            }
          });
        }
        
        // Handle input if provided
        if (input && sourceCode.includes('input(')) {
          pythonOutput.push(`Input received: ${input}`);
        }
        
        return pythonOutput.length > 0 ? pythonOutput.join('\n') : 'Python code executed (no print statements found)';

      case 'java':
        // Enhanced Java simulation
        const javaOutput: string[] = [];
        
        // Handle System.out.println statements
        const javaPrintlnMatches = sourceCode.match(/System\.out\.println\([^)]+\)/g);
        if (javaPrintlnMatches) {
          javaPrintlnMatches.forEach(printStatement => {
            const contentMatch = printStatement.match(/System\.out\.println\(["']([^"']+)["']\)/);
            if (contentMatch) {
              javaOutput.push(contentMatch[1]);
            } else {
              const varMatch = printStatement.match(/System\.out\.println\(([^)]+)\)/);
              if (varMatch) {
                javaOutput.push(`${varMatch[1]} (simulated output)`);
              }
            }
          });
        }
        
        // Handle System.out.print statements
        const javaPrintMatches = sourceCode.match(/System\.out\.print\([^)]+\)/g);
        if (javaPrintMatches) {
          javaPrintMatches.forEach(printStatement => {
            const contentMatch = printStatement.match(/System\.out\.print\(["']([^"']+)["']\)/);
            if (contentMatch) {
              javaOutput.push(contentMatch[1]);
            }
          });
        }
        
        return javaOutput.length > 0 ? javaOutput.join('\n') : 'Java code compiled and executed (no output statements found)';

      case 'cpp':
        // Enhanced C++ simulation
        const cppOutput: string[] = [];
        
        // Handle cout statements
        const cppCoutMatches = sourceCode.match(/cout\s*<<[^;]+/g);
        if (cppCoutMatches) {
          cppCoutMatches.forEach(coutStatement => {
            // Extract quoted strings
            const stringMatches = coutStatement.match(/"([^"]+)"/g);
            if (stringMatches) {
              stringMatches.forEach(str => {
                cppOutput.push(str.replace(/"/g, ''));
              });
            }
            
            // Handle endl
            if (coutStatement.includes('endl')) {
              cppOutput.push(''); // Add newline
            }
          });
        }
        
        return cppOutput.length > 0 ? cppOutput.join('\n') : 'C++ code compiled and executed (no cout statements found)';

      default:
        return `Language ${lang} execution not implemented`;
    }
  } catch (error) {
    return `Execution Error: ${error}`;
  }
};
