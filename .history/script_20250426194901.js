const stands = {
  flecha: [
    { nome: "Star Platinum", peso: 10 },
    { nome: "Killer Queen", peso: 5, especial: true },
    { nome: "Crazy Diamond", peso: 10 },
    { nome: "Gold Experience Requiem", peso: 1, especial: true },
    { nome: "The World", peso: 10, },
    { nome: "King Crimson", peso: 5, especial: true },
    { nome: "Red Hot Chili Pepper", peso: 15 },
    { nome: "The Hand", peso: 5 },
    { nome: "Cream", peso: 10 },
    { nome: "Hierophant Green", peso: 15 },
    { nome: "Magician's Red", peso: 15, especial: true },
    { nome: "Anubis", peso: 15,  },
    { nome: "Heaven's Door", peso: 15, },
    { nome: "Sticky Fingers", peso: 15, },
    { nome: "Chariot Requiem", peso: 2,especial: true },
    { nome: "Metallica", peso: 5, },
    { nome: "Purple Haze", peso: 10, },
    { nome: "Weather Report", peso: 5, },
    { nome: "Whitesnake", peso: 10, },
    { nome: "C-MOON", peso: 5, },
    { nome: "Made in Heaven", peso: 1, especial:true },
   
  ],
  cadaver: [
    { nome: "Tusk ACT4", peso: 2, especial: true },
    { nome: "D4C", peso: 2, especial: true },
    { nome: "Soft & Wet", peso: 5 },
    { nome: "Wonder of U", peso: 1, especial: true },
    { nome: "The World - Alternativo", peso: 5, especial: true },
    { nome: "Ball Breaker", peso: 2, especial: true },
    { nome: "Scary Monsters", peso: 10, especial: true },
    { nome: "Catch the Rainbow", peso: 15, especial: true },
    { nome: "Cream Starter", peso: 15, especial: true },
    { nome: "Killer Queen - Alternativo", peso: 10 },
    { nome: "November Rain", peso: 10 },

  ]
};

let videoInProgress = false; // Flag para impedir a troca do stand durante o vídeo

function escolher(tipo) {
  // Verifica se o usuário está autenticado
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      alert("Você precisa estar logado para sortear um Stand.");
      window.location.href = 'login.html'; // Redireciona para o login, se não estiver logado
      return;
    }

    const userId = user.uid; // ID único do usuário

    // Verifica se o usuário já sorteou um stand
    firebase.database().ref('users/' + userId).once('value').then(snapshot => {
      if (snapshot.exists() && snapshot.val().stand) {
        alert('Você já sorteou um Stand!');
        // Redireciona para a página do Stand do usuário
        window.location.href = `standinfo.html?nome=${encodeURIComponent(snapshot.val().stand)}`;
        return;
      }

      // Se não há stand sorteado, continua com a escolha
      if (videoInProgress) {
        alert("Você não pode mudar de Stand durante a animação.");
        return; // Impede a mudança durante o vídeo
      }

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

      // Se nenhum stand foi escolhido (todos com peso 0), escolhe aleatoriamente
      if (!escolhido) {
        escolhido = pool[Math.floor(Math.random() * pool.length)];
      }

      const resultado = document.getElementById("resultado");
      resultado.textContent = `Você recebeu o stand: ${escolhido.nome}!`;

      // Configura a animação caso o stand seja especial
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

        // Configura o vídeo para a animação
        videoSource.src = videoPath;
        animacaoStand.style.display = "block";
        animacaoStand.load();

        // Marque que a animação está em progresso
        videoInProgress = true;

        // Quando o vídeo terminar de carregar, redireciona para a página do Stand
        animacaoStand.onloadedmetadata = () => {
          const duracao = animacaoStand.duration * 1000;
          setTimeout(() => {
            animacao.classList.remove("active");
            // Salva o stand no Firebase e redireciona para a página de informações
            firebase.database().ref('users/' + userId).set({
              stand: escolhido.nome,
              video: videoPath
            }).then(() => {
              window.location.href = `standinfo.html?nome=${encodeURIComponent(escolhido.nome)}`;
            });
          }, duracao);
        };
      } else {
        // Caso o stand não seja especial, apenas redireciona após 2 segundos
        setTimeout(() => {
          // Salva o stand no Firebase e redireciona para a página de informações
          firebase.database().ref('users/' + userId).set({
            stand: escolhido.nome,
            video: null // Nenhum vídeo necessário para stands não especiais
          }).then(() => {
            window.location.href = `standinfo.html?nome=${encodeURIComponent(escolhido.nome)}`;
          });
        }, 2000);
      }
    }).catch((error) => {
      console.error("Erro ao verificar usuário no Firebase: ", error);
      alert("Ocorreu um erro. Tente novamente mais tarde.");
    });
  });
}

// Quando o vídeo termina, reseta a flag para permitir novas escolhas de stand
function videoTerminou() {
  videoInProgress = false;
}

// Adiciona um evento de "fim de vídeo"
document.getElementById("animacao-stand").addEventListener("ended", videoTerminou);