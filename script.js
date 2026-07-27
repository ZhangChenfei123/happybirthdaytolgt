window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500);
    }, 2000);
});

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

const memories = [
    {
        title: '[回忆标题1]',
        description: '[详细描述1]',
        icon: '🐱'
    },
    {
        title: '[回忆标题2]',
        description: '[详细描述2]',
        icon: '🐶'
    },
    {
        title: '[回忆标题3]',
        description: '[详细描述3]',
        icon: '🎂'
    },
    {
        title: '[回忆标题4]',
        description: '[详细描述4]',
        icon: '🎈'
    }
];

function showMemoryDetail(index) {
    const memory = memories[index];
    document.getElementById('modal-image').innerHTML = '<span class="placeholder-icon">' + memory.icon + '</span>';
    document.getElementById('modal-title').textContent = memory.title;
    document.getElementById('modal-description').textContent = memory.description;
    document.getElementById('memory-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('memory-modal').style.display = 'none';
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('memory-modal');
    if (event.target === modal) {
        closeModal();
    }
});

const catSurprises = [
    '🐱 喵~坏猫老师来蹭蹭你！',
    '🐱 咕噜咕噜~生日快乐！',
    '🐱 送你一颗猫薄荷！🌿',
    '🐱 喵呜~喜欢你！',
    '🐱 尾巴甩甩~开心！',
    '🐱 给你舔舔毛~'
];

const dogSurprises = [
    '🐶 汪汪！生日快乐！',
    '🐶 摇尾巴~超级开心！',
    '🐶 给你叼来一根骨头！🍖',
    '🐶 扑进怀里！❤️',
    '🐶 汪汪汪！爱你！',
    '🐶 带你去遛弯！🚶'
];

function triggerSurprise(type) {
    const resultDiv = document.getElementById('surprise-result');
    const surprises = type === 'cat' ? catSurprises : dogSurprises;
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
    
    resultDiv.innerHTML = '';
    resultDiv.style.opacity = '0';
    
    setTimeout(function() {
        resultDiv.innerHTML = randomSurprise;
        resultDiv.style.opacity = '1';
    }, 100);
    
    createParticles(type);
}

function createParticles(type) {
    const container = document.querySelector('.surprise-container');
    const emoji = type === 'cat' ? ['🐱', '🐾', '✨'] : ['🐶', '🐾', '✨'];
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.textContent = emoji[Math.floor(Math.random() * emoji.length)];
        particle.style.position = 'absolute';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.fontSize = Math.random() * 20 + 15 + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 100 + 50;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        container.appendChild(particle);
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = function() {
            particle.remove();
        };
    }
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});