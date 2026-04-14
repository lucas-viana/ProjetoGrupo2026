
const grupos = [
    {
        nome: "Inteligência Artificial na Saúde",
        area: "Tecnologia / Medicina",
        descricao: "Pesquisa aplicada sobre redes neurais para diagnósticos médicos precoces."
    },
    {
        nome: "Sustentabilidade Urbana",
        area: "Engenharia / Meio Ambiente",
        descricao: "Estudo de novos materiais para construção civil com foco na redução da pegada de carbono."
    },
    {
        nome: "História e Sociedade Digital",
        area: "Ciências Humanas",
        descricao: "Análise do impacto das redes sociais no comportamento e movimentos sociais contemporâneos."
    },
    {
        nome: "Criptografia Quântica",
        area: "Física / Computação",
        descricao: "Desenvolvimento de novos protocolos de segurança da informação utilizando computação quântica."
    }
];

const groupsContainer = document.getElementById('groupsContainer');
const searchInput = document.getElementById('searchInput');

function renderizarGrupos(filtro = "") {
    groupsContainer.innerHTML = "";

    const gruposFiltrados = grupos.filter(grupo => {
        const termoBusca = filtro.toLowerCase();
        return grupo.nome.toLowerCase().includes(termoBusca) || 
               grupo.area.toLowerCase().includes(termoBusca);
    });

    if (gruposFiltrados.length === 0) {
        groupsContainer.innerHTML = "<p>Nenhum grupo encontrado com este termo.</p>";
        return;
    }

    gruposFiltrados.forEach(grupo => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h3>${grupo.nome}</h3>
            <span class="area">${grupo.area}</span>
            <p>${grupo.descricao}</p>
            <button onclick="solicitarParticipacao('${grupo.nome}')">Solicitar Participação</button>
        `;
        
        groupsContainer.appendChild(card);
    });
}

function solicitarParticipacao(nomeGrupo) {
    alert(`Solicitação para o grupo "${nomeGrupo}" enviada com sucesso! Aguarde o contato do coordenador.`);
}

searchInput.addEventListener('input', (e) => {
    renderizarGrupos(e.target.value);
});

renderizarGrupos();