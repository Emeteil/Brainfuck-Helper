class BrainfuckConverter {
    constructor() {
        this.vars = {};
        this.pointerPos = 0;
        this.toOperations = {};
    }

    evaluateExpression(expr) {
        const varNames = Object.keys(this.vars).sort((a, b) => b.length - a.length);
        for (const varName of varNames) {
            expr = expr.replace(new RegExp(`\\b${varName}\\b`, 'g'), this.vars[varName].toString());
        }

        try {
            return eval(expr);
        }
        catch (e) {
            throw new Error(`Ошибка вычисления выражения: ${expr}`);
        }
    }

    processVariableDeclaration(line) {
        const match = line.trim().match(/^\$([a-zA-Z_]\w*)\s*=\s*(-?\d+)$/);
        if (!match)
            throw new Error(`Некорректное объявление переменной: ${line}`);

        const varName = match[1];
        const varValue = parseInt(match[2]);

        if (this.vars.hasOwnProperty(varName))
            throw new Error(`Переменная ${varName} уже объявлена`);

        this.vars[varName] = varValue;
        return "";
    }

    processRepeat(code) {
        return code.replace(/([<>+\-.,\[\]])\{times:\s*([^}]+)\}/g, (match, symbol, expr) => {
            const times = this.evaluateExpression(expr);
            return symbol.repeat(times);
        });
    }

    processToOperation(code) {
        return code.replace(/\{to:\s*([^}]+)\}/g, (match, expr, offset) => {
            const targetPos = this.evaluateExpression(expr);
            if (targetPos < 0)
                throw new Error(`Целевая позиция не может быть отрицательной: ${targetPos}`);

            const steps = targetPos - this.pointerPos;
            const moveSymbol = steps > 0 ? '>' : '<';
            const moveCode = moveSymbol.repeat(Math.abs(steps));

            if (this.toOperations.hasOwnProperty(offset)) {
                const prevSteps = this.toOperations[offset];
                if (prevSteps !== steps)
                    throw new Error(`Неоднозначная операция to: позиция ${offset}, было ${prevSteps}, стало ${steps}`);
            }
            else {
                this.toOperations[offset] = steps;
            }

            this.pointerPos = targetPos;
            return moveCode;
        });
    }

    filterCode(code, chars) {
        let result = "";

        for (let i = 0; i < code.length; i++) {
            if (chars.includes(code.charAt(i)))
                result += code.charAt(i);
        }

        return result
    }

    improveCode(code) {
        return code
            .replace(/\n[ \t]+\n/g, "\n\n")
            .replace(/\n{3,}/g, '\n\n');
    }

    convert(code) {
        this.vars = {};
        this.pointerPos = 0;
        this.toOperations = {};

        const lines = code.split('\n');
        const outputLines = [];

        for (const line of lines) {
            const stripped = line.trim();
            if (stripped.startsWith('$'))
                this.processVariableDeclaration(stripped);
            else
                outputLines.push(line);
        }

        let processedCode = outputLines.join('\n');

        processedCode = this.processRepeat(processedCode);
        processedCode = this.processToOperation(processedCode);

        processedCode = this.filterCode(processedCode, "<>+-.,[]! \n\t");
        processedCode = this.improveCode(processedCode);

        return processedCode.trim();
    }
}