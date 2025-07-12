document.addEventListener('DOMContentLoaded', function () {
    const converter = new BrainfuckConverter();
    const inputCode = document.getElementById('input-code');
    const outputCode = document.getElementById('output-code');
    const convertBtn = document.getElementById('convert-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    const runBtn = document.getElementById('run-btn');
    const copyStatus = document.getElementById('copy-status');

    convertBtn.addEventListener('click', function () {
        try {
            const converted = converter.convert(inputCode.value);
            outputCode.textContent = converted;
            copyStatus.style.opacity = '0';
        } catch (e) {
            outputCode.textContent = `Ошибка: ${e.message}`;
            outputCode.style.color = 'var(--error-color)';
            setTimeout(() => {
                outputCode.style.color = '';
            }, 2000);
        }
    });

    clearBtn.addEventListener('click', function () {
        inputCode.value = '';
        outputCode.textContent = '';
        copyStatus.style.opacity = '0';
    });

    copyBtn.addEventListener('click', function () {
        if (outputCode.textContent.trim() === '') return;

        navigator.clipboard.writeText(outputCode.textContent)
            .then(() => {
                copyStatus.textContent = 'Скопировано!';
                copyStatus.style.opacity = '1';
                setTimeout(() => {
                    copyStatus.style.opacity = '0';
                }, 2000);
            })
            .catch(err => {
                console.error(err);
            });
    });

    runBtn.addEventListener('click', function () {
        convertBtn.click();

        const code = outputCode.textContent.trim();
        if (code === '') return;
        if (code.includes("Ошибка")) return;

        const encodedCode = btoa(outputCode.textContent.trim());
        const visualizerUrl = `https://ashupk.github.io/Brainfuck/brainfuck-visualizer-master/index.html#${encodedCode}`;

        window.open(visualizerUrl, '_blank');
    });
});