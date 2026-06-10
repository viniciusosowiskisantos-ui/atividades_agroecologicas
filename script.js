// Banco de dados inicial (Array de Objetos com as 5 disciplinas solicitadas)
const initialActivities = [
    {
        subject: 'ciências',
        title: 'Defensivos Orgânicos vs. Químicos',
        desc: 'Análise do ciclo do nitrogênio e fósforo no solo. Os estudantes devem pesquisar como a agricultura de precisão reduz contaminações e criar um infográfico digital.',
        author: 'Prof. Integrado'
    },
    {
        subject: 'matemática',
        title: 'Pegada Hídrica e Irrigação',
        desc: 'Cálculo de volume de água em sistemas de gotejamento vs. aspersão. Construção de gráficos de linhas comparativos de desperdício de recursos.',
        author: 'Prof. Integrado'
    },
    {
        subject: 'português',
        title: 'Análise de Discurso: O Agro na Mídia',
        desc: 'Estudo de campanhas publicitárias do agronegócio tradicional e sustentável. Produção de um manifesto textual ou roteiro de podcast sobre eco-eficiência.',
        author: 'Prof. Integrado'
    },
    {
        subject: 'história',
        title: 'Da Revolução Verde à Agricultura 4.0',
        desc: 'Linha do tempo investigando os impactos sociais e ambientais das transformações no campo na metade do século XX e o surgimento das IAs no agro.',
        author: 'Prof. Integrado'
    },
    {
        subject: 'geografia',
        title: 'Cartografia dos Biomas e Sistemas Agroflorestais',
        desc: 'Mapeamento do avanço da fronteira agrícola sobre o Cerrado (região do Matopiba) usando ferramentas digitais e estudo de caso de agroflorestas.',
        author: 'Prof. Integrado'
    }
];

// Carrega dados salvos no navegador ou usa os iniciais
let activities = JSON.parse(localStorage.getItem('savedActivities')) || initialActivities;

// Função para renderizar os cards na tela
function displayActivities(data) {
    const grid = document.getElementById('repoGrid');
    if (!grid) return; // Segurança caso o HTML ainda não tenha carregado
    
    grid.innerHTML = ''; // Limpa a tela antes de renderizar

    data.forEach(act => {
        const card = document.createElement('div');
        card.classList.add('activity-card');
        
        // Determina a cor da etiqueta
        const badgeClass = act.author === 'Prof. Integrado' ? act.subject : 'colaborativa';

        card.innerHTML = `
            <div>
                <span class="badge ${badgeClass}">${act.subject}</span>
                <h3>${act.title}</h3>
                <p>${act.desc}</p>
            </div>
            <div class="author">Por: ${act.author}</div>
        `;
        grid.appendChild(card);
    });
}

// Função para filtrar por disciplina
function filterActivities(subject, event) {
    // Atualiza a cor do botão ativo
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (event && event.target) {
        event.target.classList.add('active');
    }

    if (subject === 'todos') {
        displayActivities(activities);
    } else {
        const filtered = activities.filter(act => act.subject === subject);
        displayActivities(filtered);
    }
}

// Captura o envio do Formulário apenas quando a página terminar de carregar
document.addEventListener('DOMContentLoaded', function() {
    // Exibe as atividades assim que a página carrega
    displayActivities(activities);

    const form = document.getElementById('activityForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede a página de recarregar

            // Pega os valores digitados
            const newActivity = {
                subject: document.getElementById('activitySubject').value,
                title: document.getElementById('activityTitle').value,
                desc: document.getElementById('activityDesc').value,
                author: document.getElementById('teacherName').value
            };

            // Adiciona na lista e salva no navegador
            activities.push(newActivity);
            localStorage.setItem('savedActivities', JSON.stringify(activities));

            // Atualiza a tela e limpa os campos
            filterActivities('todos', null); 
            
            // Força o botão "Todos" a ficar ativo após o envio
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector('.filter-btn').classList.add('active');
            
            form.reset();
            
            alert('Atividade enviada com sucesso e adicionada ao repositório local!');
            document.getElementById('repositorio').scrollIntoView({ behavior: 'smooth' });
        });
    }
});