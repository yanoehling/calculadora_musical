const lista_notas = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const lista_modos = ['Jônio (maior)', 'Dórico', 'Frígio', 'Lídio', 'Mixolídio', 'Eólio (menor)', 'Lócrio'];
const base_tom = [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1];
const posicao = [0, 2, 4, 5, 7, 9, 11] // posicao dos primeiros 1s (notas) da lista de cima
const base_acordes = ['', 'm', 'm', '', '', 'm', 'dim', '', 'm', 'm', '', '', 'm', 'dim'];
const base_setimas = ['7M', '7', '7', '7M', '7', '7', 'Ø', '7M', '7', '7', '7M', '7', '7', 'Ø'];

// cria as options com cada modo no select com ids de 0 a 6
for (cont in lista_modos){               
    var option = document.createElement('option');
    option.id = `${cont}`;
    option.text = lista_modos[cont];
    let modos = document.getElementById('select');
    modos.appendChild(option);
}

// cria os botoes com ids e textos de cada nota
let div = document.getElementById('notas');
lista_notas.forEach(function(nota){                  
    if (div.querySelectorAll('button').length < 12){
        var botao = document.createElement('button');
        botao.id = nota;
        botao.classList.add('padrao');
        botao.innerText = nota;
        div.appendChild(botao);
    }
})

//cria o botão de limpar
let botao = document.createElement('button');
botao.id = 'limpar';
botao.innerText = 'Limpar';
div.appendChild(botao);
botao = document.getElementById('limpar');
botao.onclick = function run_cores(){cores(null, 'limpar')}

// executa as funções se algum botão for clicado
document.body.addEventListener("click", event => {
    if (event.target.nodeName == "BUTTON") {
        let id_clicado = event.target.id;
        let listas = listagens();
        let nota_escolhida = nota(id_clicado);
        finalizacao(id_clicado, listas, nota_escolhida);
    }
})

// cria recortes das listas a partir do modo escolhido
function listagens(){
    var modo_escolhido = [];
    var lista_acordes = [];
    var lista_setimas = [];
    const select = document.getElementById('select');
    var options = select.options;
    var id = parseInt(options[options.selectedIndex].id);
    modo_escolhido = base_tom.slice(posicao[id], (posicao[id] + 12));
    lista_acordes = base_acordes.slice(id, (id + 7));
    lista_setimas = base_setimas.slice(id, (id + 7));
    return [modo_escolhido, lista_acordes, lista_setimas];

}

// cria uma lista (recorte da lista 'lista_notas') a partir da nota escolhida
function nota(id_clicado){
    var nota_escolhida = [];
    let posicao_nota = lista_notas.indexOf(String(id_clicado));
    nota_escolhida = lista_notas.slice(posicao_nota, (posicao_nota + 12));
    return nota_escolhida;
}

// roda as funções de cor e texto dependendo da nota clicada e do modo escolhido
function finalizacao(id_clicado, listas, nota_escolhida){    
    let modo_escolhido = listas[0];
    let lista_acordes = listas[1];
    let lista_setimas = listas[2];        
    for (var cont in nota_escolhida){ 
        let nota_atual = nota_escolhida[cont];
        let botao_atual = document.getElementById(`${nota_atual}`);
        if (modo_escolhido[cont] == 1){   
            if (botao_atual.id == id_clicado){
                cores(botao_atual, 'CLICADO')
            } else {
                cores(botao_atual, 'NA_ESCALA')
            }
            acordes_box = document.getElementById('acordes');
            setimas_box = document.getElementById('setimas');
            if (acordes_box.checked){
                botao_atual.innerText += lista_acordes[0];
                lista_acordes.shift();
                if (setimas_box.checked){    
                    botao_atual.innerText += lista_setimas[0];
                    lista_setimas.shift();
                }
            } else if (setimas_box.checked && acordes_box.checked === false){
                setimas_box.checked = false;}
        } else {
            cores(botao_atual, 'IGNORADO');
        }
    }
}

//função das mudanças de cores e voltar textos ao padrão nos botões
function cores(botao_atual = null, comando){
    comando = String(comando).toUpperCase()
    if (comando == 'CLICADO'){
        botao_atual.innerText = botao_atual.id;
        botao_atual.style.backgroundColor = '#269962';
        botao_atual.style.color = 'white';
        botao_atual.style.borderBlockColor = 'lightsilver';
    } 
    if (comando == 'NA_ESCALA'){
        botao_atual.innerText = botao_atual.id;
        botao_atual.style.backgroundColor = '#fff238';
        botao_atual.style.color = 'black';
        botao_atual.style.borderBlockColor = 'lightgrey';
    } 
    if (comando == 'IGNORADO'){
        botao_atual.innerText = botao_atual.id;
        botao_atual.style.backgroundColor = '';
        botao_atual.style.color = 'grey';
        botao_atual.style.borderBlockColor = '';
    } 
    if (comando == 'LIMPAR'){
        lista_notas.forEach(function(nota){
            botao = document.getElementById(`${nota}`);
            cores(botao, 'ignorado');
            botao.style.color = 'black';
        })
    }
}
