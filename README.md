# 🃏 德州扑克游戏 / Texas Hold'em Poker Game

一个功能完整、体验丰富的在线多人德州扑克游戏，集成了智能AI、实时交互、数据分析和沉浸式音效体验。

A full-featured, experience-rich online multiplayer Texas Hold'em poker game with intelligent AI, real-time interaction, data analysis, and immersive audio experience.

![GitHub stars](https://img.shields.io/github/stars/ZiFeng666/texas-holdem-poker?style=social)
![GitHub forks](https://img.shields.io/github/forks/ZiFeng666/texas-holdem-poker?style=social)
![GitHub license](https://img.shields.io/github/license/ZiFeng666/texas-holdem-poker)
![Python version](https://img.shields.io/badge/python-3.8%2B-blue)
[![Upstream](https://img.shields.io/badge/Upstream-原作者%20Jason%20He-blue)](https://github.com/stars1210JasonHe/texas-holdem-poker)

> 🔱 **Fork 维护版**：本仓库由 [ZiFeng666](https://github.com/ZiFeng666) 在原作者 [Jason He](https://github.com/stars1210JasonHe) 的项目基础上维护，新增牌型分析、玩家信息增强、房间解散等功能，并持续修复问题。
>
> 🔱 **Fork maintained by** [ZiFeng666](https://github.com/ZiFeng666) on top of the original project by [Jason He](https://github.com/stars1210JasonHe) — adds hand analysis, enhanced player info, room dissolution and ongoing fixes.

[中文](#中文版) | [English](#english-version)

---

## 中文版

### 🎯 项目概述

这是一个基于Web的实时多人德州扑克游戏平台，支持人机对战、智能辅助、数据分析和沉浸式音效。无论您是德州扑克新手还是资深玩家，都能在这里找到适合的游戏体验。

#### 🎮 在线体验
- **快速开始**: 无需注册，输入昵称即可开始游戏
- **多人对战**: 支持最多9人同时在线游戏
- **智能AI**: 提供不同难度的机器人对手
- **实时互动**: WebSocket实现低延迟实时通信

### ✨ 核心特性

#### 🎲 游戏体验
- **🃏 标准德州扑克规则** - 完整实现Hold'em游戏逻辑
- **👥 多人在线对战** - 支持2-9人实时游戏
- **🤖 智能AI机器人** - 三种难度级别的AI对手
- **🎵 沉浸式音效** - 智能背景音乐系统，根据游戏状态自动切换
- **📱 响应式设计** - 适配桌面、平板和手机设备
- **🔄 断线重连** - 网络断线后自动恢复游戏状态
- **👤 玩家信息面板** - 每位玩家显示下注金额、本手累计投入，以及庄家/小盲/大盲徽章
- **💥 房间解散** - 创建者可一键解散房间，所有玩家自动返回大厅

#### 🧠 智能辅助
- **📊 实时胜率计算** - 精确枚举剩余牌组合计算当前手牌对单对手胜率
- **🔍 牌型分析** - 翻牌后实时分析：公共牌最佳牌型、对手可能牌型分布、我的当前牌型
- **🃏 记牌助手** - 跟踪已出现牌面，显示剩余牌组信息
- **📈 数据分析** - 详细的游戏统计和历史记录
- **🎯 决策建议** - 基于概率的最优决策提示
- **👀 观察者模式** - 零筹码玩家可继续观察游戏

#### 🎵 音乐系统
- **🎶 智能音乐切换** - 根据游戏场景自动播放相应音乐
- **🎛️ 音乐控制面板** - 播放/暂停、音量调节、位置自定义
- **⌨️ 快捷键操作** - M键切换播放，Ctrl+M打开设置
- **💾 偏好记忆** - 自动保存音量、静音状态等用户设置
- **📱 响应式界面** - 适配不同设备的音乐控制体验

#### 💾 数据管理
- **🗃️ 完整数据持久化** - SQLite数据库存储所有游戏数据
- **📋 摊牌记录系统** - 详细记录每次摊牌的牌型和排名
- **📊 个人统计面板** - 胜率、奖金、手牌历史等数据分析
- **🔍 历史查询** - 支持摊牌历史的详细查询和回顾
- **⚡ 状态恢复** - 游戏意外中断后的状态自动恢复

### 🛠️ 技术架构

#### 后端技术栈
- **🐍 Python 3.8+** - 核心开发语言
- **🌶️ Flask** - Web应用框架
- **🔌 Flask-SocketIO** - 实时通信
- **🗄️ SQLite** - 数据存储
- **🎯 自研游戏引擎** - 德州扑克核心逻辑

#### 前端技术栈
- **🌐 HTML5 + CSS3** - 现代Web标准
- **⚡ JavaScript ES6+** - 交互逻辑
- **🎨 Tailwind CSS** - 现代化UI框架
- **🔌 Socket.IO** - 实时通信客户端
- **🎵 Web Audio API** - 音频播放控制

### 🆕 近期更新

- **♠️ 标准盲注轮换** - 小盲/大盲随庄家轮换（多人局：庄家下一位/下两位；单挑局：庄家即小盲），行动顺序同步轮转（翻牌前大盲下家先行动）
- **🎚️ 下注金额滑块** - 下注/加注输入框旁新增滑块，范围自动适配（最小下注~筹码），拖动与手动输入双向联动
- **🔍 牌型分析面板** - 根据公共牌实时分析：公共牌最佳牌型、对手可能牌型分布（枚举全部组合）、我的当前牌型与单挑胜率
- **👤 玩家信息增强** - 每名玩家显示下注金额、本手累计投入，以及庄家/小盲/大盲徽章（修复徽章不显示问题）
- **💥 房间解散** - 创建者可在房间列表一键解散房间，房间内所有玩家自动返回大厅
- **🔄 投票状态恢复** - 一局结束后刷新页面可恢复"开始下一轮"投票，已投票状态同步保留
- **🔗 断线重连增强** - 刷新/跳转页面不再被移出房间；满员房间的成员可随时"进入房间"
- **🤖 机器人思考节奏** - 每个机器人决策间隔 1 秒并逐步广播行动状态，节奏更真实
- **🛡️ 机器人等级修复** - 从数据库重建机器人时优先使用已存等级，昵称兜底补全"至尊/无敌"等高级名字（此前"至尊5"会被错误降级为初级）
- **⚡ 游戏稳定性** - 修复机器人补充处理改变下注额导致游戏卡死的问题（补充处理仅跟注补齐）；欠注时禁止过牌；修复 eventlet 未正确 patch 导致的服务器阻塞
- **🎵 音乐提示优化** - 音乐文件缺失时静默运行，提示弹窗去重并支持"不再提示"

### 🚀 快速开始

#### 环境要求
- **Python 3.8+**（Python 3.13 需将 eventlet 升级至 0.37+：`pip install "eventlet>=0.37"`）
- **现代浏览器** (Chrome 80+, Firefox 75+, Edge 80+, Safari 13+)

#### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/ZiFeng666/texas-holdem-poker.git
cd texas-holdem-poker
```

2. **创建虚拟环境**
```bash
python -m venv poker_env

# Windows
poker_env\Scripts\activate

# macOS/Linux  
source poker_env/bin/activate
```

3. **安装依赖**
```bash
pip install -r requirements.txt
```

4. **启动服务**
```bash
python app.py
```

5. **开始游戏**
```
浏览器访问: http://localhost:8888
```

### 🎮 游戏指南

#### 基础操作
- **♠️ 过牌 (Check)** - 不下注，传递行动权
- **💰 跟注 (Call)** - 跟进当前下注额
- **📈 加注 (Raise/Bet)** - 增加下注金额（可拖动滑块快速调整）
- **🗑️ 弃牌 (Fold)** - 放弃当前手牌
- **🎯 全下 (All-in)** - 投入所有筹码

#### 🎵 音乐体验
- **🏠 大厅音乐** - 轻松舒缓的背景音乐
- **🎲 游戏桌音乐** - 专注沉稳的游戏配乐
- **⚡ 紧张时刻** - 轮到行动或大额下注时的刺激音乐

#### AI机器人级别
- **🟢 简单 (Beginner)** - 保守型打法，适合新手练习
- **🟡 中等 (Intermediate)** - 平衡型打法，有一定技巧
- **🔴 困难 (Advanced)** - 激进型打法，善于虚张声势

### 🔧 高级配置

#### 游戏房间设置
```python
DEFAULT_SETTINGS = {
    'small_blind': 10,      # 小盲注
    'big_blind': 20,        # 大盲注  
    'initial_chips': 1000,  # 初始筹码
    'max_players': 9,       # 最大玩家数
    'auto_start_delay': 3   # 自动开始延迟(秒)
}
```

#### 音乐文件配置
```bash
# 音乐文件路径 (static/audio/)
lobby-music.mp3    # 大厅背景音乐
table-music.mp3    # 游戏桌音乐  
action-music.mp3   # 紧张时刻音乐
```

### 📞 联系方式

- **Fork 仓库主页**: [ZiFeng666/texas-holdem-poker](https://github.com/ZiFeng666/texas-holdem-poker)
- **问题反馈**: [GitHub Issues](https://github.com/ZiFeng666/texas-holdem-poker/issues)
- **维护者邮箱**: Zi_Feng666@126.com
- **上游原仓库**: [stars1210JasonHe/texas-holdem-poker](https://github.com/stars1210JasonHe/texas-holdem-poker)（原作者 [Jason He](https://github.com/stars1210JasonHe)）

---

## English Version

### 🎯 Project Overview

This is a web-based real-time multiplayer Texas Hold'em poker game platform that supports human-AI battles, intelligent assistance, data analysis, and immersive audio effects. Whether you're a Texas Hold'em beginner or veteran player, you can find a suitable gaming experience here.

#### 🎮 Online Experience
- **Quick Start**: No registration required, just enter a nickname to start playing
- **Multiplayer Battles**: Support up to 9 players online simultaneously
- **Smart AI**: Provides robot opponents of different difficulty levels
- **Real-time Interaction**: WebSocket enables low-latency real-time communication

### ✨ Core Features

#### 🎲 Gaming Experience
- **🃏 Standard Texas Hold'em Rules** - Complete implementation of Hold'em game logic
- **👥 Multiplayer Online Battles** - Support 2-9 players real-time gaming
- **🤖 Smart AI Robots** - Three difficulty levels of AI opponents
- **🎵 Immersive Audio** - Smart background music system that automatically switches based on game state
- **📱 Responsive Design** - Compatible with desktop, tablet, and mobile devices
- **🔄 Disconnect Reconnection** - Automatic game state recovery after network disconnection
- **👤 Player Info Panel** - Each player shows current bet, total hand contribution, and Dealer/SB/BB badges
- **💥 Room Dissolution** - The creator can dissolve a room with one click; all players return to the lobby

#### 🧠 Intelligent Assistance
- **📊 Real-time Win Rate Calculation** - Exact enumeration of remaining card combinations for heads-up win probability
- **🔍 Hand Analysis** - Real-time analysis after the flop: best board hand, opponent hand distribution, and your current hand
- **🃏 Card Tracking Assistant** - Track revealed cards and display remaining deck information
- **📈 Data Analysis** - Detailed game statistics and historical records
- **🎯 Decision Suggestions** - Optimal decision tips based on probability
- **👀 Observer Mode** - Zero-chip players can continue observing the game

#### 🎵 Music System
- **🎶 Smart Music Switching** - Automatically play appropriate music based on game scenarios
- **🎛️ Music Control Panel** - Play/pause, volume adjustment, position customization
- **⌨️ Keyboard Shortcuts** - M key for play/pause, Ctrl+M for settings
- **💾 Preference Memory** - Automatically save volume, mute state, and other user settings
- **📱 Responsive Interface** - Music control experience adapted for different devices

#### 💾 Data Management
- **🗃️ Complete Data Persistence** - SQLite database stores all game data
- **📋 Showdown Recording System** - Detailed recording of hand types and rankings for each showdown
- **📊 Personal Statistics Panel** - Win rate, prize money, hand history data analysis
- **🔍 Historical Query** - Support detailed query and review of showdown history
- **⚡ State Recovery** - Automatic state recovery after unexpected game interruption

### 🛠️ Technical Architecture

#### Backend Technology Stack
- **🐍 Python 3.8+** - Core development language
- **🌶️ Flask** - Web application framework
- **🔌 Flask-SocketIO** - Real-time communication
- **🗄️ SQLite** - Data storage
- **🎯 Self-developed Game Engine** - Texas Hold'em core logic

#### Frontend Technology Stack
- **🌐 HTML5 + CSS3** - Modern web standards
- **⚡ JavaScript ES6+** - Interactive logic
- **🎨 Tailwind CSS** - Modern UI framework
- **🔌 Socket.IO** - Real-time communication client
- **🎵 Web Audio API** - Audio playback control

### 🆕 Recent Updates

- **♠️ Standard Blind Rotation** - SB/BB rotate with the dealer button (multiway: next/next-next seats; heads-up: dealer is the SB), with matching action order (UTG acts first preflop)
- **🎚️ Bet Amount Slider** - A slider next to the bet/raise input, auto-ranged (min bet ~ chips), synced with manual input
- **🔍 Hand Analysis Panel** - Real-time board analysis: best board hand, opponent hand distribution (full enumeration), your current hand and heads-up win rate
- **👤 Enhanced Player Info** - Current bet, total hand contribution, and Dealer/SB/BB badges for every player (badge display fixed)
- **💥 Room Dissolution** - The creator can dissolve a room from the lobby; all players are returned to the lobby automatically
- **🔄 Vote State Recovery** - Refreshing after a hand ends restores the "Start Next Round" vote, including your previous vote
- **🔗 Reconnect Improvements** - Refreshing/navigating no longer removes you from the room; members can re-enter full rooms anytime
- **🤖 Bot Thinking Pace** - Each bot takes a 1-second decision interval with per-step board updates for a natural pace
- **🛡️ Bot Level Fix** - Bot levels are restored from the database on rebuild, with the nickname fallback covering "至尊/无敌" advanced names (previously "至尊5" could be wrongly rebuilt as a beginner)
- **⚡ Game Stability** - Fixed a deadlock where supplementary bot actions changed the bet amount (supplementary processing now only calls to match); disallowed check while owing a bet; fixed server blocking caused by an unpatched eventlet
- **🎵 Music Prompt Fix** - Silent mode when audio files are missing; deduplicated prompt with a "Don't ask again" option

### 🚀 Quick Start

#### Requirements
- **Python 3.8+** (On Python 3.13, upgrade eventlet to 0.37+: `pip install "eventlet>=0.37"`)
- **Modern Browser** (Chrome 80+, Firefox 75+, Edge 80+, Safari 13+)

#### Installation Steps

1. **Clone the project**
```bash
git clone https://github.com/ZiFeng666/texas-holdem-poker.git
cd texas-holdem-poker
```

2. **Create virtual environment**
```bash
python -m venv poker_env

# Windows
poker_env\Scripts\activate

# macOS/Linux  
source poker_env/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Start service**
```bash
python app.py
```

5. **Start gaming**
```
Visit in browser: http://localhost:8888
```

### 🎮 Game Guide

#### Basic Operations
- **♠️ Check** - No bet, pass action to next player
- **💰 Call** - Match the current bet amount
- **📈 Raise/Bet** - Increase the bet amount (use the slider for quick adjustment)
- **🗑️ Fold** - Give up current hand
- **🎯 All-in** - Bet all remaining chips

#### 🎵 Music Experience
- **🏠 Lobby Music** - Relaxing and soothing background music
- **🎲 Game Table Music** - Focused and calm game soundtrack
- **⚡ Tense Moments** - Exciting music when it's your turn or during big bets

#### AI Robot Levels
- **🟢 Beginner** - Conservative playstyle, suitable for beginners
- **🟡 Intermediate** - Balanced playstyle with some skills
- **🔴 Advanced** - Aggressive playstyle, good at bluffing

### 🔧 Advanced Configuration

#### Game Room Settings
```python
DEFAULT_SETTINGS = {
    'small_blind': 10,      # Small blind
    'big_blind': 20,        # Big blind
    'initial_chips': 1000,  # Initial chips
    'max_players': 9,       # Maximum players
    'auto_start_delay': 3   # Auto start delay (seconds)
}
```

#### Music File Configuration
```bash
# Music file paths (static/audio/)
lobby-music.mp3    # Lobby background music
table-music.mp3    # Game table music
action-music.mp3   # Tense moment music
```

### 🚀 Deployment Guide

#### Development Environment
```bash
# Start development server
python app.py

# Enable debug mode
export FLASK_ENV=development
python app.py
```

#### Production Environment

##### Using Gunicorn + Nginx
```bash
# Install Gunicorn
pip install gunicorn

# Start service
gunicorn --worker-class eventlet -w 1 --bind 0.0.0.0:8888 app:app
```

##### Nginx Configuration Example
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://127.0.0.1:8888;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /socket.io/ {
        proxy_pass http://127.0.0.1:8888;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### 🤝 Contributing

#### How to Contribute
1. **Fork the project** to your GitHub account
2. **Create branch** `git checkout -b feature/your-feature`
3. **Commit changes** `git commit -m 'Add some feature'`
4. **Push branch** `git push origin feature/your-feature`
5. **Submit Pull Request**

#### Code Standards
- **Python**: Follow PEP 8 code standards
- **JavaScript**: Use ESLint code checking
- **Commit Messages**: Use conventional commit format
- **Documentation**: Update related documentation and comments

### 📄 License

This project is based on the [MIT License](LICENSE) open source license.

### 📞 Contact

- **Fork Repository**: [ZiFeng666/texas-holdem-poker](https://github.com/ZiFeng666/texas-holdem-poker)
- **Issue Feedback**: [GitHub Issues](https://github.com/ZiFeng666/texas-holdem-poker/issues)
- **Maintainer Email**: Zi_Feng666@126.com
- **Upstream Repository**: [stars1210JasonHe/texas-holdem-poker](https://github.com/stars1210JasonHe/texas-holdem-poker) by [Jason He](https://github.com/stars1210JasonHe)

---

## 🌟 Star History

如果这个项目对您有帮助，请考虑给我们一个 ⭐ Star！

If this project helps you, please consider giving us a ⭐ Star!

[![Star History Chart](https://api.star-history.com/svg?repos=stars1210JasonHe/texas-holdem-poker&type=Date)](https://star-history.com/#stars1210JasonHe/texas-holdem-poker&Date)

---

<div align="center">

**🃏 享受德州扑克的乐趣，体验智能游戏的魅力！ 🃏**

**🃏 Enjoy the fun of Texas Hold'em and experience the charm of intelligent gaming! 🃏**

Made with ❤️ by [Jason He](https://github.com/stars1210JasonHe)

🛠️ Fork 维护 / Fork Maintainer: [ZiFeng666](https://github.com/ZiFeng666) · Zi_Feng666@126.com

</div>
