const stands = {
  flecha: [
    { nome: "Star Platinum", peso: 0 },
    { nome: "Killer Queen", peso: 0, especial: true },
    { nome: "Crazy Diamond", peso: 0 },
    { nome: "Gold Experience Requiem", peso: 0, especial: true },
    { nome: "The World", peso: 0, especial: true },
    { nome: "King Crimson", peso: 55, especial: true },
  ],
  cadaver: [
    { nome: "Tusk ACT4", peso: 0, especial: true },
    { nome: "D4C", peso: 0, especial: true },
    { nome: "Soft & Wet", peso: 0 },
    { nome: "Wonder of U", peso: 0, especial: true },
    { nome: "The World - Alternativo", peso: 50, especial: true }
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

  const resultado = document.getElementById("resultado");
  resultado.textContent = `Você recebeu o stand: ${escolhido.nome}!`;

  if (escolhido.especial) {
    const animacao = document.getElementById("animacao-rara");
    const nomeStand = document.getElementById("nome-stand");
    nomeStand.textContent = escolhido.nome;
    animacao.classList.add("active");

    const videoSource = document.getElementById("video-source");
    const animacaoStand = document.getElementById("animacao-stand");

    let videoPath = "";
    switch (escolhido.nome) {
      case "Gold Experience Requiem":
        videoPath = "videos/ger-animation.mp4";
        break;
      case "Tusk ACT4":
        videoPath = "videos/tusk.mp4";
        break;
      case "D4C":
        videoPath = "videos/d4c.mp4";
        break;
      case "The World - Alternativo":
        videoPath = "videos/world.mp4";
        break;
      case "Killer Queen":
        videoPath = "videos/queen.mp4";
        break;
      case "Wonder of U":
        videoPath = "videos/wonder.mp4";
        break;
        case "King Crimson":
        videoPath = "videos/king.mp4";
        break;
    }

    videoSource.src = videoPath;
    animacaoStand.style.display = "block";
    animacaoStand.load();

    animacaoStand.onloadedmetadata = () => {
      const duracao = animacaoStand.duration * 1000;
      setTimeout(() => {
        animacao.classList.remove("active");
        window.location.href = `standinfo.html?nome=${encodeURIComponent(escolhido.nome)}`;
      }, duracao);
    };
  } else {
    setTimeout(() => {
      window.location.href = `standinfo.html?nome=${encodeURIComponent(escolhido.nome)}`;
    }, 2000);
  }
}