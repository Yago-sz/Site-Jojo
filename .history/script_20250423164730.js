const stands = {
  flecha: [
    { nome: "Star Platinum", peso: 30 },
    { nome: "Killer Queen", peso: 50, especial: true },
    { nome: "Crazy Diamond", peso: 25 },
    { nome: "Gold Experience Requiem", peso: 5, especial: true },
    { nome: "The World", peso: 2, especial: true }
  ],
  cadaver: [
    { nome: "Tusk ACT4", peso: 10, especial: true },
    { nome: "D4C - Love Train", peso: 50, especial: true },
    { nome: "Soft & Wet", peso: 10 },
    { nome: "Wonder of U", peso: 50, especial: true },
    { nome: "The World Over Heaven", peso: 1, especial: true }
  ]
};

// Função para sortear o stand
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
  const info = infosDoStand[escolhido.nome];

  // Atualiza descrição do stand
  const standinfo = document.getElementById("stand-info");
  standinfo.innerHTML = `
    <h2>${escolhido.nome}</h2>
    <p>${info.descricao}</p>
  `;
  
  // Atualiza imagem do stand flutuante no canto superior direito
  const standFlutuante = document.getElementById("stand-img-flutuante");
  standFlutuante.src = info.imagem;
  standFlutuante.classList.add("show");

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
      case "Killer Queen":
        videoPath = "videos/queen.mp4";
        break;
      case "Wonder of U":
        videoPath = "videos/wonder.mp4";
        break;
    }

    // Atualiza o caminho do vídeo
    videoSource.src = videoPath;

    // Exibe o vídeo
    animacaoStand.style.display = "block";
    animacaoStand.load();  // Recarrega o vídeo

    // Remover animação após o vídeo e redirecionar
    animacaoStand.onloadedmetadata = () => {
      const duracao = animacaoStand.duration * 1000; // segundos → milissegundos

      setTimeout(() => {
        animacao.classList.remove("active");
        // Redirecionar para a página com as informações do stand após o vídeo
        window.location.href = `standinfo.html?stand=${encodeURIComponent(escolhido.nome)}`;
      }, duracao);
    };
  } else {
    // Para stands não-especiais, redireciona após 2 segundos
    setTimeout(() => {
      window.location.href = `standinfo.html?stand=${encodeURIComponent(escolhido.nome)}`;
    }, 2000);
  }
}