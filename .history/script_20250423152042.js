const animacao = document.getElementById("animacao-rara");
const nomeStand = document.getElementById("nome-stand");
const animacaoStand = document.getElementById("animacao-stand");
const videoSource = document.getElementById("video-source");

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

  // Mostrar resultado textual
  document.getElementById("resultado").textContent = `Você recebeu o stand: ${escolhido.nome}!`;

  if (escolhido.especial) {
    nomeStand.textContent = escolhido.nome;

    // Determina o vídeo do stand
    let videoPath = "";
    switch (escolhido.nome) {
      case "Gold Experience Requiem":
        videoPath = "videos/ger-animation.mp4";
        break;
      case "Tusk ACT4":
        videoPath = "videos/tusk-act4-animation.mp4";
        break;
      case "D4C - Love Train":
        videoPath = "videos/d4c-love-train-animation.mp4";
        break;
      case "Made in Heaven":
        videoPath = "videos/mih-animation.mp4";
        break;
      case "The World Over Heaven":
        videoPath = "videos/twoh-animation.mp4";
        break;
    }

    // Atualiza e exibe animação
    videoSource.src = videoPath;
    animacaoStand.load();
    animacao.classList.add("active");

    setTimeout(() => {
      animacao.classList.remove("active");
    }, 5000);
  }
}