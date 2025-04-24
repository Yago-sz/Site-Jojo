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
      { nome: "Wonder of U", peso: 50,  especial:  true },
      { nome: "The World Over Heaven", peso: 1, especial: true }
    ]
  };

  const infosDoStand = {
    "Star Platinum": {
      imagem: "img/star_platinum.jpg",
      descricao: "Extremamente rápido e poderoso. Famoso pelo grito 'ORA ORA ORA!' e capaz de parar o tempo com 'The World'."
    },
    "Killer Queen": {
      imagem: "img/killer_queen.jpg",
      descricao: "Pode transformar qualquer coisa em bomba. Possui habilidades como Sheer Heart Attack e Bites the Dust."
    },
    "Crazy Diamond": {
      imagem: "img/crazy_diamond.jpg",
      descricao: "Pode restaurar objetos e pessoas à sua forma original. Forte e preciso, mas com um coração gentil."
    },
    "Gold Experience Requiem": {
      imagem: "img/ger.jpg",
      descricao: "Possui o poder de anular causas e efeitos. Virtualmente invencível ao retornar tudo ao 'zero'."
    },
    "The World": {
      imagem: "img/the_world.jpg",
      descricao: "Stand de DIO com poder de parar o tempo. Extremamente veloz e forte."
    },
    "Tusk ACT4": {
      imagem: "img/tusk_act4.jpg",
      descricao: "A forma final do Tusk. Usa rotações infinitas para causar danos que ignoram defesas e não podem ser curados."
    },
    "D4C - Love Train": {
      imagem: "img/d4c.jpg",
      descricao: "Manipula dimensões e desvia o destino ruim para os outros. Um dos stands mais perigosos."
    },
    "Soft & Wet": {
      imagem: "img/soft_wet.jpg",
      descricao: "Pode roubar propriedades de objetos e pessoas usando bolhas. Extremamente versátil."
    },
    "Wonder of U": {
      imagem: "img/wonder.jpg",
      descricao: "Invoca calamidades contra quem o persegue. Atua com uma aura de inevitabilidade."
    },
    "The World Over Heaven": {
      imagem: "img/world_over_heaven.jpg",
      descricao: "Versão alternativa e ainda mais poderosa do The World, capaz de reescrever a realidade com seus socos."
    }
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
    // Mostrar imagem e descrição do stand
const infoContainer = document.getElementById("stand-info");
const standImg = document.getElementById("stand-img");
const standNome = document.getElementById("stand-nome");
const standDesc = document.getElementById("stand-desc");

const info = infosDoStand[escolhido.nome];

if (info) {
  standImg.src = info.imagem;
  standNome.textContent = escolhido.nome;
  standDesc.textContent = info.descricao;
  infoContainer.classList.remove("hidden");
} else {
  infoContainer.classList.add("hidden");
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
          case "Wonder of U":
            videoPath = "videos/wonder.mp4";
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

      }
  