const stands = {
    flecha: [
      { nome: "Star Platinum", peso: 30 },
      { nome: "Killer Queen", peso: 25 },
      { nome: "Crazy Diamond", peso: 25 },
      { nome: "Gold Experience Requiem", peso: 5, especial: true },
      { nome: "Made in Heaven", peso: 2, especial: true }
    ],
    cadaver: [
      { nome: "Tusk ACT4", peso: 5, especial: true },
      { nome: "D4C - Love Train", peso: 3, especial: true },
      { nome: "Soft & Wet", peso: 30 },
      { nome: "Wonder of U", peso: 10 },
      { nome: "The World Over Heaven", peso: 2, especial: true }
    ]
  };
  
  function escolher(tipo) {
    const pool = stands[tipo];
    const totalPeso = pool.reduce((sum, stand) => sum + stand.peso, 0);
    let rand = Math.random() * totalPeso;
  
    let escolhido;
    for (let stand of pool) {
      if (rand < stand.peso) {
        escolhido = stand;
        break;
      }
      rand -= stand.peso;
    }
  
    // Mostrar resultado
    const resultado = document.getElementById("resultado");
    resultado.textContent = `Você recebeu o stand: ${escolhido.nome}!`;
  
    // Se for especial, ativar animação
    if (escolhido.especial) {
      const animacao = document.getElementById("animacao-rara");
      const nomeStand = document.getElementById("nome-stand");
      nomeStand.textContent = escolhido.nome;
      animacao.classList.add("active");
  
      setTimeout(() => {
        animacao.classList.remove("active");
      }, 5000);
    }
  }