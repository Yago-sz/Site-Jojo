const stands = {
    flecha: [
      { nome: "Star Platinum", peso: 30 },
      { nome: "Killer Queen", peso: 50, especial: true },
      { nome: "Crazy Diamond", peso: 25 },
      { nome: "Gold Experience Requiem", peso: 5, especial: true },
      { nome: "The World", peso: 2, especial: true }
    ],
    cadaver: [
      { nome: "Tusk ACT4", peso: 0, especial: true },
      { nome: "D4C - Love Train", peso: 50, especial: true },
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
  
      // Atualiza o vídeo da animação
      const videoSource = document.getElementById("video-source");
      const animacaoStand = document.getElementById("animacao-stand");
  
      // Associar o vídeo correspondente ao stand
      let videoPath = "";
      switch (escolhido.nome) {
        case "Gold Experience Requiem":
          videoPath = "videos/ger-animation.mp4";
          break;
        case "Tusk ACT4":
          videoPath = "videos/tusk.mp4";
          break;
        case "D4C - Love Train":
          videoPath = "videos/d4c.mp4";
          break;
        case "Made in Heaven":
          videoPath = "videos/mih-animation.mp4";
          break;
        // Adicione mais casos conforme necessário
        case "Killer Queen":
          videoPath = "videos/queen.mp4";
          break;
          case "Killer Queen":
            videoPath = "videos/queen.mp4";
            break;
      }
  
      // Atualiza o caminho do vídeo
      videoSource.src = videoPath;
  
      // Exibe o vídeo
      animacaoStand.style.display = "block";
      animacaoStand.load();  // Recarrega o vídeo
  
      // Remover animação após 5 segundos
      animacaoStand.onloadedmetadata = () => {
        const duracao = animacaoStand.duration * 1000; // segundos → milissegundos
      
        setTimeout(() => {
          animacao.classList.remove("active");
        }, duracao);
      };
    }
    function gerarKanjisFlutuantes() {
        const container = document.querySelector('.kanji-flutuante-container');
        const simbolos = ['ゴゴゴゴ', 'ドドドド', 'メメメメ', 'ザワザワ', 'バァァァン'];
      
        for (let i = 0; i < 20; i++) {
          const span = document.createElement('span');
          span.className = 'kanji';
          span.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
      
          // Posição aleatória
          span.style.left = `${Math.random() * 100}%`;
          span.style.fontSize = `${2 + Math.random() * 2}rem`;
          span.style.animationDuration = `${4 + Math.random() * 3}s`;
          container.appendChild(span);
      
          // Remover após animação
          setTimeout(() => {
            span.remove();
          }, 7000);
        }
        if (escolhido.especial) {
  animacao.classList.add("active");
  animacaoStand.play();
  gerarKanjisFlutuantes(); // <<< aqui!
}
      }
  }