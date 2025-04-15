const botaoSim = document.getElementById("botaoSim");
const botaoNao = document.getElementById("botaoNao");
const mensagemErro = document.getElementById("mensagemErro"); // Criar um elemento para a mensagem de erro
const pagina = document.getElementById('pagina'); // A div que contém o conteúdo a ser exibido

// Evento para o botão "Sim" - mostrar o restante do conteúdo
botaoSim.addEventListener("click", () => {
  // Mostrar a página com o conteúdo
  pagina.style.display = 'block';
  
  // Esconder o botão de início
  document.getElementById('inicio').style.display = 'none';

  // Ação para carregar o conteúdo da página

  abrirPagina();
});

// Evento para o botão "Não" - mostrar o erro
botaoNao.addEventListener("click", () => {
  mensagemErro.textContent = "Resposta errada! Tente novamente!";
  mensagemErro.style.color = "red";
  mensagemErro.style.fontSize = "20px";
  mensagemErro.style.textAlign = "center";
  mensagemErro.style.marginTop = "20px";
});

function abrirPagina() {
  tocarMusica();
  iniciarContador();
  coracoesCaindo();
  atualizarFoto(); // mostra a primeira foto do carrossel
}

function tocarMusica() {
  const musica = document.getElementById("musica");
  musica.play();
}

function iniciarContador() {
  const dataInicial = new Date();  // Pegando o momento em que a página é carregada
  const contador = document.getElementById("contador");

  setInterval(() => {
    const agora = new Date();
    let diff = agora - dataInicial;  // Calcula a diferença em milissegundos desde a abertura da página

    const msPorSegundo = 1000;
    const msPorMinuto = msPorSegundo * 60;
    const msPorHora = msPorMinuto * 60;
    const msPorDia = msPorHora * 24;
    const msPorAno = msPorDia * 365.25;

    const anos = Math.floor(diff / msPorAno);
    diff -= anos * msPorAno;

    const dias = Math.floor(diff / msPorDia);
    diff -= dias * msPorDia;

    const horas = Math.floor(diff / msPorHora);
    diff -= horas * msPorHora;

    const minutos = Math.floor(diff / msPorMinuto);
    diff -= minutos * msPorMinuto;

    const segundos = Math.floor(diff / msPorSegundo);

    contador.textContent = `${anos} anos, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos 💕`;
  }, 1000);
}


function coracoesCaindo() {
  setInterval(() => {
    const coracao = document.createElement("div");
    coracao.classList.add("coraçao");
    coracao.style.left = Math.random() * window.innerWidth + "px";
    coracao.style.animationDuration = (Math.random() * 3 + 2) + "s";
    document.body.appendChild(coracao);

    setTimeout(() => {
      coracao.remove();
    }, 5000);
  }, 300);
}

// === CARROSSEL ===
const fotos = [
  "images/image1.png",
  "images/image2.png",
  "images/image3.png",
  "images/image4.png",
  "images/image6.jpg"
];

let fotoAtual = 0;

function atualizarFoto() {
  const img = document.getElementById("fotoCarrossel");
  img.src = fotos[fotoAtual];
}

function proximaFoto() {
  fotoAtual = (fotoAtual + 1) % fotos.length;
  atualizarFoto();
}

function fotoAnterior() {
  fotoAtual = (fotoAtual - 1 + fotos.length) % fotos.length;
  atualizarFoto();
}

// === PLAYER ===
const musica = document.getElementById("musica");
const playPauseBtn = document.getElementById("playPauseBtn");
const tempoAtual = document.getElementById("tempoAtual");
const duracaoTotal = document.getElementById("duracaoTotal");
const tempoRestante = document.getElementById("tempoRestante");
const progressoBarra = document.getElementById("progresso");

musica.addEventListener("loadedmetadata", () => {
  duracaoTotal.textContent = formatarTempo(musica.duration);
});

musica.addEventListener("timeupdate", () => {
  const atual = musica.currentTime;
  const duracao = musica.duration;
  const restante = duracao - atual;

  tempoAtual.textContent = formatarTempo(atual);
  tempoRestante.textContent = `-${formatarTempo(restante)}`;

  const porcentagem = (atual / duracao) * 100;
  progressoBarra.style.width = `${porcentagem}%`;
});

playPauseBtn.addEventListener("click", () => {
  if (musica.paused) {
    musica.play();
    playPauseBtn.textContent = "⏸";
  } else {
    musica.pause();
    playPauseBtn.textContent = "▶️";
  }
});

function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min}:${seg < 10 ? "0" + seg : seg}`;
}
