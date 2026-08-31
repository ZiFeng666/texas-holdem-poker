class MusicPlayer {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        this.volume = 0.3; // 默认音量30%
        this.currentTrack = null;
        this.position = 'top-right'; // 默认位置
        this.isVisible = true; // 控制面板是否可见
        this.promptShown = false; // 当前页面是否已显示过播放提示
        this.audioMissing = false; // 音乐文件是否缺失（缺失时静默，不再弹窗）
        this.tracks = {
            lobby: '/static/audio/lobby-music.mp3',
            table: '/static/audio/table-music.mp3',
            action: '/static/audio/action-music.mp3'
        };
        
        this.init();
    }
    
    init() {
        // 从localStorage读取用户设置
        const savedVolume = localStorage.getItem('musicVolume');
        const savedMuted = localStorage.getItem('musicMuted') === 'true';
        const savedPosition = localStorage.getItem('musicPosition') || 'top-right';
        const savedVisible = localStorage.getItem('musicVisible');
        
        if (savedVolume !== null) {
            this.volume = parseFloat(savedVolume);
        }
        
        this.position = savedPosition;
        
        // 如果用户之前设置了隐藏，则默认隐藏
        if (savedVisible !== null) {
            this.isVisible = savedVisible === 'true';
        }
        
        // 创建音频元素
        this.audio = new Audio();
        this.audio.loop = true;
        this.audio.volume = savedMuted ? 0 : this.volume;
        this.audio.preload = 'auto';
        
        // 创建音乐控制界面
        this.createControlPanel();
        
        // 添加事件监听器
        this.addEventListeners();
        
        // 检测页面类型并播放相应音乐
        this.autoPlay();
    }
    
    createControlPanel() {
        // 创建音乐控制面板
        const controlPanel = document.createElement('div');
        controlPanel.id = 'music-control-panel';
        controlPanel.className = 'music-control-panel';
        
        // 如果用户设置为隐藏，则初始状态为隐藏
        if (!this.isVisible) {
            controlPanel.style.display = 'none';
        }
        
        controlPanel.innerHTML = `
            <div class="music-control-content">
                <button id="music-toggle" class="music-btn" title="播放/暂停音乐">
                    <span class="music-icon">🎵</span>
                </button>
                <div class="volume-control">
                    <button id="volume-toggle" class="music-btn" title="静音/取消静音">
                        <span class="volume-icon">🔊</span>
                    </button>
                    <input type="range" id="volume-slider" class="volume-slider" 
                           min="0" max="1" step="0.1" value="${this.volume}">
                </div>
                <div class="music-info">
                    <span id="music-track-name">背景音乐</span>
                </div>
                <button id="music-settings" class="music-btn" title="音乐设置">
                    <span class="settings-icon">⚙️</span>
                </button>
                <button id="music-hide" class="music-btn" title="隐藏音乐面板 (Ctrl+H)">
                    <span class="hide-icon">👁️</span>
                </button>
            </div>
        `;
        
        // 设置面板位置
        this.updatePanelPosition(controlPanel);
        
        document.body.appendChild(controlPanel);
        
        // 创建显示按钮（当面板隐藏时显示）
        this.createShowButton();
        
        // 绑定控制按钮事件
        this.bindControlEvents();
    }
    
    createShowButton() {
        // 创建一个小的显示按钮
        const showButton = document.createElement('div');
        showButton.id = 'music-show-button';
        showButton.className = 'music-show-button';
        showButton.innerHTML = `
            <button class="show-music-btn" title="显示音乐控制面板 (Ctrl+H)">
                🎵
            </button>
        `;
        
        // 如果面板可见，则隐藏显示按钮
        if (this.isVisible) {
            showButton.style.display = 'none';
        }
        
        // 设置显示按钮位置
        this.updateShowButtonPosition(showButton);
        
        document.body.appendChild(showButton);
        
        // 绑定显示按钮事件
        showButton.addEventListener('click', () => {
            this.showPanel();
        });
    }
    
    bindControlEvents() {
        // 播放/暂停按钮
        document.getElementById('music-toggle').addEventListener('click', () => {
            this.toggle();
        });
        
        // 音量控制
        document.getElementById('volume-toggle').addEventListener('click', () => {
            this.toggleMute();
        });
        
        // 音量滑块
        document.getElementById('volume-slider').addEventListener('input', (e) => {
            this.setVolume(parseFloat(e.target.value));
        });
        
        // 设置按钮
        document.getElementById('music-settings').addEventListener('click', () => {
            this.showSettings();
        });
        
        // 隐藏按钮
        document.getElementById('music-hide').addEventListener('click', () => {
            this.hidePanel();
        });
    }
    
    addEventListeners() {
        // 音频加载完成
        this.audio.addEventListener('canplaythrough', () => {
            console.log('🎵 背景音乐加载完成');
        });
        
        // 音频播放出错
        this.audio.addEventListener('error', (e) => {
            console.warn('🎵 背景音乐加载失败:', e);
            this.handleError();
        });
        
        // 音频开始播放
        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
            this.updatePlayButton();
        });
        
        // 音频暂停
        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
            this.updatePlayButton();
        });
        
        // 页面可见性变化
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else if (this.wasPlayingBeforeHide) {
                this.play();
            }
        });
        
        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            // Ctrl+H 切换面板显示/隐藏
            if (e.ctrlKey && e.key === 'h') {
                e.preventDefault();
                this.togglePanel();
            }
            // M键 播放/暂停
            else if (e.key === 'm' || e.key === 'M') {
                if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
                    e.preventDefault();
                    this.toggle();
                }
            }
        });
    }
    
    autoPlay() {
        // 根据当前页面自动选择音乐
        const currentPage = this.detectCurrentPage();
        this.loadTrack(currentPage);
        
        // 延迟播放，避免浏览器自动播放限制
        setTimeout(() => {
            this.play();
        }, 1000);
    }
    
    detectCurrentPage() {
        const path = window.location.pathname;
        
        if (path.includes('/table/')) {
            return 'table';
        } else if (path.includes('/lobby')) {
            return 'lobby';
        } else {
            return 'lobby'; // 默认
        }
    }
    
    loadTrack(trackName) {
        if (this.tracks[trackName] && this.currentTrack !== trackName) {
            this.currentTrack = trackName;
            this.audio.src = this.tracks[trackName];
            this.updateTrackInfo(trackName);
        }
    }
    
    updateTrackInfo(trackName) {
        const trackNames = {
            lobby: '大厅背景音乐',
            table: '游戏桌音乐',
            action: '紧张刺激音乐'
        };
        
        const infoElement = document.getElementById('music-track-name');
        if (infoElement) {
            infoElement.textContent = trackNames[trackName] || '背景音乐';
        }
    }
    
    play() {
        if (this.audio && this.audio.src) {
            const playPromise = this.audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('🎵 背景音乐开始播放');
                }).catch((error) => {
                    console.warn('🎵 自动播放被阻止:', error);
                    if (!this.audioMissing) {
                        this.showPlayButton();
                    }
                });
            }
        }
    }
    
    pause() {
        if (this.audio) {
            this.wasPlayingBeforeHide = this.isPlaying;
            this.audio.pause();
        }
    }
    
    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.audio) {
            this.audio.volume = this.volume;
        }
        
        // 保存到localStorage
        localStorage.setItem('musicVolume', this.volume.toString());
        
        // 更新音量图标
        this.updateVolumeIcon();
        
        // 更新滑块
        const slider = document.getElementById('volume-slider');
        if (slider) {
            slider.value = this.volume;
        }
    }
    
    toggleMute() {
        const isMuted = this.audio.volume === 0;
        
        if (isMuted) {
            this.audio.volume = this.volume;
            localStorage.setItem('musicMuted', 'false');
        } else {
            this.audio.volume = 0;
            localStorage.setItem('musicMuted', 'true');
        }
        
        this.updateVolumeIcon();
    }
    
    updatePlayButton() {
        const button = document.getElementById('music-toggle');
        const icon = button ? button.querySelector('.music-icon') : null;
        
        if (icon) {
            icon.textContent = this.isPlaying ? '⏸️' : '🎵';
            button.title = this.isPlaying ? '暂停音乐' : '播放音乐';
        }
    }
    
    updateVolumeIcon() {
        const button = document.getElementById('volume-toggle');
        const icon = button ? button.querySelector('.volume-icon') : null;
        
        if (icon) {
            if (this.audio.volume === 0) {
                icon.textContent = '🔇';
                button.title = '取消静音';
            } else if (this.audio.volume < 0.5) {
                icon.textContent = '🔉';
                button.title = '静音';
            } else {
                icon.textContent = '🔊';
                button.title = '静音';
            }
        }
    }
    
    showPlayButton() {
        // 去重：每个页面最多提示一次
        if (this.promptShown) return;
        // 音乐文件缺失时提示无意义，不弹窗
        if (this.audioMissing) return;
        // 用户选择过"不再提示"则永久不再弹窗
        if (localStorage.getItem('musicPromptDismissed') === 'true') return;
        this.promptShown = true;
        
        // 移除可能残留的旧提示，避免多个弹窗叠加
        document.querySelectorAll('.music-notification').forEach(n => n.remove());
        
        // 显示明显的播放提示
        const notification = document.createElement('div');
        notification.className = 'music-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span>🎵</span>
                <p>点击播放背景音乐</p>
                <button onclick="musicPlayer.play(); this.parentElement.parentElement.remove();">播放</button>
                <button onclick="localStorage.setItem('musicPromptDismissed','true'); this.parentElement.parentElement.remove();">不再提示</button>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
    
    handleError() {
        console.warn('🎵 音乐文件加载失败，使用静默模式');
        // 标记音乐文件缺失：后续不再弹"点击播放背景音乐"提示
        this.audioMissing = true;
        // 隐藏音乐控制面板或显示错误状态
        const panel = document.getElementById('music-control-panel');
        if (panel) {
            panel.style.opacity = '0.5';
            panel.title = '音乐文件不可用';
        }
    }
    
    showSettings() {
        // 创建设置弹窗
        const modal = document.createElement('div');
        modal.className = 'music-settings-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🎵 音乐设置</h3>
                    <button class="close-btn" onclick="this.closest('.music-settings-modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="setting-item">
                        <label>音量: <span id="volume-display">${Math.round(this.volume * 100)}%</span></label>
                        <input type="range" id="settings-volume" min="0" max="1" step="0.1" value="${this.volume}">
                    </div>
                    <div class="setting-item">
                        <label>
                            <input type="checkbox" id="auto-play" ${this.autoPlayEnabled ? 'checked' : ''}> 
                            自动播放
                        </label>
                    </div>
                    <div class="setting-item">
                        <label>
                            <input type="checkbox" id="panel-visible" ${this.isVisible ? 'checked' : ''}> 
                            显示音乐控制面板
                        </label>
                        <small style="color: #666; display: block; margin-top: 5px;">
                            快捷键: Ctrl+H 切换显示/隐藏
                        </small>
                    </div>
                    <div class="setting-item">
                        <label>选择音乐:</label>
                        <select id="track-selector">
                            <option value="lobby" ${this.currentTrack === 'lobby' ? 'selected' : ''}>大厅音乐</option>
                            <option value="table" ${this.currentTrack === 'table' ? 'selected' : ''}>游戏桌音乐</option>
                            <option value="action" ${this.currentTrack === 'action' ? 'selected' : ''}>紧张音乐</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <label>控制面板位置:</label>
                        <select id="position-selector">
                            <option value="top-right" ${this.position === 'top-right' ? 'selected' : ''}>右上角</option>
                            <option value="top-left" ${this.position === 'top-left' ? 'selected' : ''}>左上角</option>
                            <option value="bottom-right" ${this.position === 'bottom-right' ? 'selected' : ''}>右下角</option>
                            <option value="bottom-left" ${this.position === 'bottom-left' ? 'selected' : ''}>左下角</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="this.closest('.music-settings-modal').remove()">关闭</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 绑定设置面板事件
        modal.querySelector('#settings-volume').addEventListener('input', (e) => {
            const volume = parseFloat(e.target.value);
            this.setVolume(volume);
            modal.querySelector('#volume-display').textContent = Math.round(volume * 100) + '%';
        });
        
        modal.querySelector('#track-selector').addEventListener('change', (e) => {
            this.loadTrack(e.target.value);
            if (this.isPlaying) {
                this.play();
            }
        });
        
        modal.querySelector('#position-selector').addEventListener('change', (e) => {
            this.setPosition(e.target.value);
        });
        
        modal.querySelector('#panel-visible').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.showPanel();
            } else {
                this.hidePanel();
            }
        });
        
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // 切换到特定音乐（供外部调用）
    switchToTrack(trackName) {
        if (this.tracks[trackName]) {
            this.loadTrack(trackName);
            if (this.isPlaying) {
                this.play();
            }
        }
    }
    
    // 播放动作音效（短音效，不循环）
    playActionSound(soundType = 'action') {
        if (this.tracks[soundType]) {
            const actionAudio = new Audio(this.tracks[soundType]);
            actionAudio.volume = this.volume * 0.7; // 动作音效稍微小声一点
            actionAudio.play().catch(e => console.warn('动作音效播放失败:', e));
        }
    }
    
    // 设置控制面板位置
    setPosition(position) {
        this.position = position;
        localStorage.setItem('musicPosition', position);
        
        const panel = document.getElementById('music-control-panel');
        const showButton = document.getElementById('music-show-button');
        
        if (panel) {
            this.updatePanelPosition(panel);
        }
        
        if (showButton) {
            this.updateShowButtonPosition(showButton);
        }
    }
    
    // 更新面板位置样式
    updatePanelPosition(panel) {
        // 清除所有位置类
        panel.classList.remove('position-left', 'position-bottom');
        
        // 重置样式
        panel.style.top = '';
        panel.style.bottom = '';
        panel.style.left = '';
        panel.style.right = '';
        
        // 根据位置设置样式
        switch(this.position) {
            case 'top-left':
                panel.style.top = '80px';
                panel.style.left = '20px';
                break;
            case 'top-right':
                panel.style.top = '80px';
                panel.style.right = '20px';
                break;
            case 'bottom-left':
                panel.style.bottom = '20px';
                panel.style.left = '20px';
                break;
            case 'bottom-right':
                panel.style.bottom = '20px';
                panel.style.right = '20px';
                break;
            default:
                // 默认右上角
                panel.style.top = '80px';
                panel.style.right = '20px';
        }
    }
    
    // 隐藏音乐控制面板
    hidePanel() {
        const panel = document.getElementById('music-control-panel');
        const showButton = document.getElementById('music-show-button');
        
        if (panel && showButton) {
            panel.style.display = 'none';
            showButton.style.display = 'block';
            this.isVisible = false;
            localStorage.setItem('musicVisible', 'false');
            
            // 显示提示信息
            this.showNotification('音乐控制面板已隐藏，按 Ctrl+H 可重新显示', 3000);
        }
    }
    
    // 显示音乐控制面板
    showPanel() {
        const panel = document.getElementById('music-control-panel');
        const showButton = document.getElementById('music-show-button');
        
        if (panel && showButton) {
            panel.style.display = 'block';
            showButton.style.display = 'none';
            this.isVisible = true;
            localStorage.setItem('musicVisible', 'true');
        }
    }
    
    // 切换面板显示状态
    togglePanel() {
        if (this.isVisible) {
            this.hidePanel();
        } else {
            this.showPanel();
        }
    }
    
    // 显示通知消息
    showNotification(message, duration = 3000) {
        const notification = document.createElement('div');
        notification.className = 'music-notification-message';
        notification.innerHTML = `
            <div class="notification-content">
                <span>🎵</span>
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, duration);
    }
    
    // 更新显示按钮位置
    updateShowButtonPosition(button) {
        // 清除所有位置样式
        button.style.top = '';
        button.style.bottom = '';
        button.style.left = '';
        button.style.right = '';
        
        // 根据面板位置设置显示按钮位置
        switch(this.position) {
            case 'top-left':
                button.style.top = '80px';
                button.style.left = '20px';
                break;
            case 'top-right':
                button.style.top = '80px';
                button.style.right = '20px';
                break;
            case 'bottom-left':
                button.style.bottom = '20px';
                button.style.left = '20px';
                break;
            case 'bottom-right':
                button.style.bottom = '20px';
                button.style.right = '20px';
                break;
            default:
                button.style.top = '80px';
                button.style.right = '20px';
        }
    }
}

// 全局音乐播放器实例
let musicPlayer;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    musicPlayer = new MusicPlayer();
});

// 导出供外部使用
window.musicPlayer = musicPlayer; 