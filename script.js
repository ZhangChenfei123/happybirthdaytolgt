let collectedCakes = [];
const totalCakes = 5;
let isBGMPlaying = false;

window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('password-page-1').style.display = 'flex';
        }, 500);
    }, 2000);
    createPetals();
    
    const parallelLink = document.querySelector('a[href="#parallel"]');
    if (parallelLink) {
        parallelLink.style.display = 'none';
    }
    
    
});

function checkPassword1() {
    const input = document.getElementById('password-input-1').value;
    const error = document.getElementById('password-error-1');
    
    if (input === '20260517') {
        document.getElementById('password-page-1').style.display = 'none';
        document.getElementById('password-page-2').style.display = 'flex';
    } else {
        error.textContent = '❌ 错误！这都不记得了，你好狠的心呜呜呜！';
        setTimeout(function() {
            error.textContent = '';
        }, 2000);
    }
}

function checkPassword2() {
    const input = document.getElementById('password-input-2').value;
    const successArea = document.getElementById('password-success-area-2');
    
    if (input.length > 0) {
        document.getElementById('password-input-2').style.display = 'none';
        document.querySelector('#password-page-2 .password-btn').style.display = 'none';
        successArea.style.display = 'block';
    }
}

function enterWebsite() {
    document.getElementById('password-page-2').style.display = 'none';
}

function createPetals() {
    const container = document.getElementById('petals-container');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        petal.style.width = (Math.random() * 10 + 10) + 'px';
        petal.style.height = (Math.random() * 15 + 15) + 'px';
        container.appendChild(petal);
    }
}

function toggleBGM() {
    const bgm = document.getElementById('bgm');
    const btn = document.getElementById('bgm-toggle');
    
    if (isBGMPlaying) {
        bgm.pause();
        btn.textContent = '🎵 背景音乐：关';
        btn.classList.remove('playing');
    } else {
        bgm.play().catch(function() {
            btn.textContent = '🎵 点击播放音乐';
        });
        btn.textContent = '🎵 背景音乐：开';
        btn.classList.add('playing');
    }
    isBGMPlaying = !isBGMPlaying;
}

// 背景音乐与其他媒体协调：播放视频/音频时暂停BGM，停止后从原位置继续
(function setupBgmCoordination() {
    let bgmWasPlaying = false;

    function isAnyMediaPlaying() {
        const mediaElements = document.querySelectorAll('video, audio');
        for (let m of mediaElements) {
            if (m.id !== 'bgm' && !m.paused) {
                return true;
            }
        }
        return false;
    }

    document.addEventListener('play', function(e) {
        if (e.target.id === 'bgm') return;
        const bgm = document.getElementById('bgm');
        if (isBGMPlaying && !bgm.paused) {
            bgmWasPlaying = true;
            bgm.pause();
        }
    }, true);

    function tryResumeBgm() {
        if (bgmWasPlaying && !isAnyMediaPlaying()) {
            bgmWasPlaying = false;
            const bgm = document.getElementById('bgm');
            bgm.play().catch(function() {});
        }
    }

    document.addEventListener('pause', function(e) {
        if (e.target.id === 'bgm') return;
        setTimeout(tryResumeBgm, 100);
    }, true);

    document.addEventListener('ended', function(e) {
        if (e.target.id === 'bgm') return;
        setTimeout(tryResumeBgm, 100);
    }, true);
})();

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

const memories = [
    {
        title: '[回忆标题1]',
        description: '那你呢，可以在家陪我吗？别流浪了呗',
        icon: '🐱',
        video: '猫狗.mp4'
    },
    {
        title: '[回忆标题2]',
        description: '别忘了你还欠我3面！！！',
        icon: '🐶',
        video: null,
        images: [
            '微信图片_20260728115156_129_1.jpg',
            '微信图片_20260728115157_130_1.jpg'
        ]
    },
    {
        title: '[回忆标题3]',
        description: '文元壬同学，肉干吃完了，还想要，嘻嘻（哦不对，是你的生日......那么你想要什么礼物呢？）',
        icon: '🎁',
        video: null,
        images: [
            '微信图片_20260730115010_143_1.jpg',
            '微信图片_20260730115010_142_1.jpg'
        ]
    },
    {
        title: '[回忆标题4]',
        description: 'I see sparks fly~',
        icon: '✨🎇✨',
        video: '烟花.mp4'
    },
    {
        title: '[回忆标题5]',
        description: '紫藤萝的约定，华池先森可别放紫港小姐的鸽子哦',
        icon: '💜',
        video: null,
        images: [
            '微信图片_20260730114747_141_1.jpg'
        ]
    },
    {
        title: '[回忆标题6]',
        description: '抱抱"连伤感都是奢侈的"的坏狗同学，但在我这里，你永远可以做小孩子~（虽然我也是小孩子）',
        icon: '🌟',
        video: null,
        images: [
            '微信图片_20260728130548_132_1.jpg',
            '微信图片_20260728130549_133_1.jpg',
            '微信图片_20260728130549_134_1.jpg'
        ]
    }
];

function showMemoryDetail(index) {
    const memory = memories[index];
    const modalImage = document.getElementById('modal-image');
    const modalContent = document.querySelector('.modal-content');
    const modalChat = document.getElementById('modal-chat');
    
    if (modalChat) {
        modalChat.style.display = 'none';
    }
    
    if (memory.video) {
        modalImage.innerHTML = `
            <video class="modal-video" controls autoplay>
                <source src="${memory.video}" type="video/mp4">
                您的浏览器不支持视频播放
            
        `;
    } else if (memory.images && memory.images.length > 0) {
        let imagesHtml = '<div class="modal-images">';
        memory.images.forEach((imgUrl, i) => {
            imagesHtml += `<img src="${imgUrl}" alt="回忆图片${i+1}" class="modal-img">`;
        });
        imagesHtml += '</div>';
        modalImage.innerHTML = imagesHtml;
    } else if (memory.chat && memory.chat.length > 0) {
        let chatImagesHtml = '';
        if (memory.chatImages && memory.chatImages.length > 0) {
            chatImagesHtml = '<div class="modal-images">';
            memory.chatImages.forEach((imgUrl, i) => {
                chatImagesHtml += `<img src="${imgUrl}" alt="聊天图片${i+1}" class="modal-img">`;
            });
            chatImagesHtml += '</div>';
        }
        modalImage.innerHTML = chatImagesHtml;
        
        if (!modalChat) {
            const chatDiv = document.createElement('div');
            chatDiv.id = 'modal-chat';
            chatDiv.className = 'modal-chat';
            modalContent.appendChild(chatDiv);
        }
        
        const chatContainer = document.getElementById('modal-chat');
        let chatHtml = '';
        memory.chat.forEach(msg => {
            const isCat = msg.sender === 'cat';
            chatHtml += `
                <div class="chat-message ${isCat ? 'cat-message' : 'dog-message'}">
                    <div class="chat-bubble">${msg.text}</div>
                </div>
            `;
        });
        chatContainer.innerHTML = chatHtml;
        chatContainer.style.display = 'block';
    } else {
        modalImage.innerHTML = '<span class="placeholder-icon">' + memory.icon + '</span>';
    }
    
    document.getElementById('modal-title').textContent = '';
    document.getElementById('modal-description').textContent = memory.description;
    document.getElementById('memory-modal').style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('memory-modal');
    const modalChat = document.getElementById('modal-chat');
    if (modalChat) {
        modalChat.remove();
    }
    modal.style.display = 'none';
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('memory-modal');
    if (event.target === modal) {
        closeModal();
    }
});

function openLetter() {
    document.getElementById('letter-modal').style.display = 'flex';
}

function closeLetter() {
    document.getElementById('letter-modal').style.display = 'none';
}

window.addEventListener('click', function(event) {
    const letterModal = document.getElementById('letter-modal');
    if (event.target === letterModal) {
        closeLetter();
    }
});

function collectCake(cakeId) {
    if (collectedCakes.includes(cakeId)) return;
    
    collectedCakes.push(cakeId);
    const cakeElement = document.getElementById('cake-' + cakeId);
    cakeElement.classList.add('collected');
    
    updateBackpack();
    checkSurpriseStatus();
}

function updateBackpack() {
    const cakeCount = document.querySelector('.cake-count');
    cakeCount.textContent = collectedCakes.length + '/' + totalCakes;
    
    const backpack = document.getElementById('backpack');
    backpack.style.transform = 'scale(1.2)';
    setTimeout(function() {
        backpack.style.transform = 'scale(1)';
    }, 300);
}

function checkSurpriseStatus() {
    if (collectedCakes.length === totalCakes) {
        document.getElementById('surprise-locked').style.display = 'none';
        document.getElementById('surprise-unlocked').style.display = 'block';
    }
}

const catSurprises = [
    '🐱 喵~坏猫老师来蹭蹭你！',
    '🐱 咕噜咕噜~生日快乐！',
    '🐱 送你一颗猫薄荷！🌿',
    '🐱 喵呜~喜欢你！',
    '🐱 尾巴甩甩~开心！',
    '🐱 给你舔舔毛~',
    '🐱 坏狗同学，生日快乐！',
    '🐱 永远是你的坏猫老师~',
    '🐱 今天也要开心哦！',
    '🐱 喵~最最最喜欢你！',
    '🐱 多闻阙疑，慎言其余，则寡尤；多见阙殆，慎行其余，则寡悔。',
    '🐱 君子之交淡如水',
    '🐱 不用（真心）或许不会输，但永远不会赢',
    '🐱 教学相长'
];

function triggerSurprise() {
    if (collectedCakes.length < totalCakes) {
        const resultDiv = document.getElementById('surprise-result');
        resultDiv.innerHTML = '🔒 请先集齐5个小蛋糕！';
        resultDiv.style.opacity = '1';
        return;
    }
    
    const resultDiv = document.getElementById('surprise-result');
    const randomSurprise = catSurprises[Math.floor(Math.random() * catSurprises.length)];
    
    resultDiv.innerHTML = '';
    resultDiv.style.opacity = '0';
    
    setTimeout(function() {
        resultDiv.innerHTML = randomSurprise;
        resultDiv.style.opacity = '1';
    }, 100);
    
    createParticles('cat');
}

// 彩蛋音频连续播放：先"指弹"再"弹唱"
(function setupSurpriseAudioPlaylist() {
    const audio = document.getElementById('surprise-audio');
    if (!audio) return;

    let playedFirst = false;

    audio.addEventListener('ended', function() {
        if (!playedFirst) {
            playedFirst = true;
            audio.src = '弹唱.m4a';
            audio.play();
        }
    });
})();

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

function openGalaxyVideo(videoUrl) {
    const modalImage = document.getElementById('modal-image');
    modalImage.innerHTML = `
        <video class="modal-video" controls autoplay>
            <source src="${videoUrl}" type="video/mp4">
            您的浏览器不支持视频播放
        
    `;
    document.getElementById('modal-title').textContent = videoUrl === '小时候.mp4' ? '小时候的我们' : '湖边的我们';
    document.getElementById('modal-description').textContent = '';
    document.getElementById('memory-modal').style.display = 'flex';
}

function revealSurprise() {
    const blockedOverlay = document.getElementById('blocked-overlay');
    const blockedContent = blockedOverlay.querySelector('.blocked-content');
    const surpriseStart = document.getElementById('surprise-start');
    const surpriseContent = document.getElementById('surprise-content');
    
    blockedOverlay.style.display = 'flex';
    
    setTimeout(function() {
        blockedOverlay.style.background = '#ffffff';
        blockedContent.style.background = '#ffffff';
        blockedContent.style.padding = '0';
        blockedContent.style.maxWidth = '100%';
        blockedContent.style.width = '100%';
        blockedContent.style.height = '100%';
        blockedContent.style.display = 'flex';
        blockedContent.style.justifyContent = 'center';
        blockedContent.style.alignItems = 'center';
        blockedContent.innerHTML = `
            <h2 class="blocked-prank">嘻嘻<br>逗你的<br>略略略</h2>
        `;
    }, 7500);
    
    setTimeout(function() {
        blockedOverlay.style.background = '';
        blockedOverlay.style.display = 'none';
        blockedContent.style.background = '';
        blockedContent.style.padding = '';
        blockedContent.style.maxWidth = '';
        blockedContent.style.width = '';
        blockedContent.style.height = '';
        blockedContent.style.display = '';
        blockedContent.style.justifyContent = '';
        blockedContent.style.alignItems = '';
        surpriseStart.style.display = 'none';
        surpriseContent.style.display = 'block';
        
        document.getElementById('parallel').style.display = 'block';
        
        const parallelLink = document.querySelector('a[href="#parallel"]');
        if (parallelLink) {
            parallelLink.style.display = 'block';
        }
    }, 11000);
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});