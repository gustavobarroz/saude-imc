// Seleciona o formulário e a área de dicas
const form = document.getElementById("healthForm");
const dicasArea = document.getElementById("dicas");
const alturaInput = document.getElementById("altura");
const pesoInput = document.getElementById("peso");

// Função para calcular o IMC
function calcularIMC(peso, alturaCm) {
    console.log(`Peso: ${peso}, Altura (cm): ${alturaCm}`); // Verifica os valores passados

    // Converte a altura de cm para metros
    const alturaMetros = alturaCm / 100; 

    // Verifica se os valores são válidos
    if (peso <= 0 || alturaMetros <= 0 || alturaMetros > 3 || peso > 300) {
        return 0; // Retorna 0 se o valor for inválido ou fora dos limites razoáveis
    }
    
    return peso / (alturaMetros * alturaMetros); // Calcula o IMC usando a altura em metros
}

// Função para gerar o alerta baseado no IMC
function gerarAlertaIMC(imc) {
    if (imc < 18.5) {
        return "Você está abaixo do peso. Consulte um profissional de saúde para orientações.";
    } else if (imc >= 18.5 && imc < 24.9) {
        return "Parabéns! Seu IMC está dentro da faixa saudável.";
    } else if (imc >= 25 && imc < 29.9) {
        return "Você está com sobrepeso. Considere adotar hábitos mais saudáveis e consulte um profissional.";
    } else {
        return "Cuidado! Você está com obesidade. É importante procurar um médico para cuidados especializados.";
    }
}

// Função para mudar o fundo da área de dicas após o envio do formulário
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obtém os valores do formulário
    const peso = parseFloat(pesoInput.value);
    const alturaCm = parseFloat(alturaInput.value); // Agora recebemos a altura em centímetros

    // Verifica se os valores de peso e altura são válidos
    if (isNaN(peso) || isNaN(alturaCm) || peso <= 0 || alturaCm <= 0 || alturaCm > 300 || peso > 300) {
        alert("Por favor, insira valores válidos para peso (10kg a 300kg) e altura (50cm a 300cm).");
        return;
    }

    // Calcula o IMC
    const imc = calcularIMC(peso, alturaCm);

    // Verifica se o IMC é válido
    if (imc === 0) {
        alert("Valores de peso ou altura inválidos. Tente novamente.");
        return;
    }

    // Gera o alerta baseado no IMC
    const alertaIMC = gerarAlertaIMC(imc);

    // Exibe o alerta e o IMC na área de dicas
    dicasArea.style.backgroundColor = "#A9DFBF"; // Verde suave
    document.getElementById("dicaSaude").innerHTML = `
        <p>Seu IMC é: ${imc.toFixed(2)}</p>
        <p>${alertaIMC}</p>
    `;
    
    // Limpa os campos do formulário após o envio
    form.reset();
});
