// ===== ZOQ Single Page Application =====

// State
let state = {
  screen: 'auth',
  user: null,
  posts: [],
  notifications: [],
  conversations: [],
  stories: [],
  reels: [],
  trending: [],
  users: []
};

// Mock Data
const MOCK_USERS = [
  { id: '1', name: 'Sarah Chen', username: 'sarahchen', bio: 'AI Researcher | Building the future of ML', role: 'geek', skills: ['Python', 'TensorFlow', 'PyTorch'], techStack: ['Next.js', 'Python', 'AWS'], location: 'San Francisco', followers: 1240, following: 340, connections: 89 },
  { id: '2', name: 'Alex Kumar', username: 'alexkumar', bio: 'Full Stack Developer | React & Node enthusiast', role: 'geek', skills: ['React', 'Node.js', 'TypeScript'], techStack: ['Next.js', 'PostgreSQL', 'Docker'], location: 'Bangalore', followers: 890, following: 210, connections: 56 },
  { id: '3', name: 'Mia Johnson', username: 'miaj', bio: 'Product Designer | UI/UX | Design systems', role: 'geek', skills: ['Figma', 'UI/UX', 'Design Systems'], techStack: ['React', 'Tailwind', 'Storybook'], location: 'London', followers: 2100, following: 450, connections: 120 },
  { id: '4', name: 'David Park', username: 'dpark', bio: 'DevOps Engineer | Cloud architect | Kubernetes', role: 'geek', skills: ['Kubernetes', 'AWS', 'Terraform'], techStack: ['Go', 'Python', 'AWS'], location: 'Seattle', followers: 670, following: 180, connections: 42 },
  { id: '5', name: 'Lisa Wang', username: 'lisaw', bio: 'Data Scientist | ML researcher | Statistics', role: 'geek', skills: ['Python', 'R', 'Statistics'], techStack: ['Jupyter', 'Spark', 'TensorFlow'], location: 'New York', followers: 3400, following: 560, connections: 178 },
];

const MOCK_POSTS = [
  { _id: '1', author: MOCK_USERS[0], content: "Just shipped our new AI feature! The team worked incredibly hard on this. Let us know what you think!\n\n#AI #Tech #Startup", likes: ['u1','u2','u3'], comments: [], reposts: [], createdAt: '2h ago' },
  { _id: '2', author: MOCK_USERS[1], content: "Day 47 of building in public. We just hit 1,000 users! Grateful for this amazing community. 🎉\n\n#BuildInPublic #Startup", likes: ['u1','u2','u3','u4','u5'], comments: [], reposts: [], createdAt: '4h ago' },
  { _id: '3', author: MOCK_USERS[2], content: "React Server Components are a game changer. Here's why you should start using them today...\n\n1/5 🧵", likes: ['u1'], comments: [], reposts: [], createdAt: '6h ago' },
  { _id: '4', author: MOCK_USERS[3], content: "Looking for a senior React developer to join our team. Remote-friendly, competitive salary. DM me!\n\n#Hiring #ReactJS #Remote", likes: ['u1','u2'], comments: [], reposts: [], createdAt: '8h ago' },
  { _id: '5', author: MOCK_USERS[4], content: "Published a new paper on transformer architectures. Check it out if you're into NLP research!\n\n#ML #NLP #Research", likes: ['u1','u2','u3','u4'], comments: [], reposts: [], createdAt: '12h ago' },
];

const MOCK_STORIES = [
  { id: '1', author: MOCK_USERS[0] },
  { id: '2', author: MOCK_USERS[1] },
  { id: '3', author: MOCK_USERS[2] },
  { id: '4', author: MOCK_USERS[3] },
  { id: '5', author: MOCK_USERS[4] },
];

const MOCK_NOTIFICATIONS = [
  { id: '1', sender: MOCK_USERS[0], type: 'like', message: 'liked your post', read: false, time: '2m ago' },
  { id: '2', sender: MOCK_USERS[1], type: 'connection_request', message: 'sent you a connection request', read: false, time: '15m ago' },
  { id: '3', sender: MOCK_USERS[2], type: 'comment', message: 'commented on your post', read: true, time: '1h ago' },
  { id: '4', sender: MOCK_USERS[3], type: 'repost', message: 'reposted your post', read: true, time: '3h ago' },
  { id: '5', sender: MOCK_USERS[4], type: 'mention', message: 'mentioned you in a post', read: true, time: '5h ago' },
];

const MOCK_CONVERSATIONS = [
  { user: MOCK_USERS[0], lastMessage: { content: 'Hey! Are you available for a quick call?', time: '5m ago', isMe: false }, unread: 2 },
  { user: MOCK_USERS[1], lastMessage: { content: 'Thanks for connecting! Love your work.', time: '2h ago', isMe: false }, unread: 0 },
  { user: MOCK_USERS[2], lastMessage: { content: 'The design looks great!', time: '1d ago', isMe: true }, unread: 0 },
];

const MOCK_REELS = [
  { id: '1', author: MOCK_USERS[0], caption: 'Building a neural network from scratch #AI #Coding', likes: 12400 },
  { id: '2', author: MOCK_USERS[1], caption: 'React hooks explained visually #ReactJS #WebDev', likes: 8900 },
  { id: '3', author: MOCK_USERS[2], caption: 'Day in the life of a tech founder #Startup', likes: 5600 },
];

const TRENDING_TOPICS = [
  { tag: '#AI', posts: '12.5K', trend: '+23%' },
  { tag: '#ReactJS', posts: '8.2K', trend: '+15%' },
  { tag: '#Startup', posts: '6.1K', trend: '+31%' },
  { tag: '#OpenSource', posts: '5.4K', trend: '+18%' },
  { tag: '#DevOps', posts: '4.8K', trend: '+27%' },
  { tag: '#MachineLearning', posts: '9.3K', trend: '+42%' },
];

// ===== AUTH =====

function showLogin() {
  document.getElementById('auth-form').innerHTML = `
    <h2>Welcome back</h2>
    <form onsubmit="handleLogin(event)">
      <input type="email" class="input" placeholder="Email" id="login-email" required value="demo@zoq.app">
      <input type="password" class="input" placeholder="Password" required value="password">
      <button type="submit" class="btn-primary">Sign In</button>
    </form>
    <p class="auth-switch">Don't have an account? <a href="#" onclick="showRegister()">Sign up</a></p>
  `;
}

function showRegister() {
  document.getElementById('auth-form').innerHTML = `
    <h2>Create account</h2>
    <form onsubmit="handleRegister(event)">
      <input type="email" class="input" placeholder="Email" id="reg-email" required>
      <input type="text" class="input" placeholder="Full name" id="reg-name" required>
      <input type="text" class="input" placeholder="Username" id="reg-username" required>
      <input type="password" class="input" placeholder="Password" required>
      <button type="submit" class="btn-primary">Create Account</button>
    </form>
    <p class="auth-switch">Already have an account? <a href="#" onclick="showLogin()">Sign in</a></p>
  `;
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  state.user = { id: 'me', name: 'Guest User', username: 'guest', email: email, bio: 'Tech enthusiast', skills: ['React', 'Node.js'], techStack: ['Next.js', 'Tailwind'], location: 'Remote', followers: [1,2], following: [3,4], connections: [1] };
  enterApp();
}

function handleRegister(e) {
  e.preventDefault();
  const email = document.getElementById('reg-email').value;
  const name = document.getElementById('reg-name').value;
  const username = document.getElementById('reg-username').value;
  state.user = { id: 'me', name: name, username: username, email: email, bio: '', skills: [], techStack: [], location: '', followers: [], following: [], connections: [] };
  enterApp();
}

function enterApp() {
  document.getElementById('screen-auth').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('user-avatar-letter').textContent = state.user.name.charAt(0).toUpperCase();
  navigate('home');
}

// ===== NAVIGATION =====

function navigate(screen) {
  state.screen = screen;

  // Update bottom nav
  document.querySelectorAll('.bottom-nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.screen === screen);
  });

  // Update topbar visibility
  const hideTopbarScreens = ['reels', 'auth'];
  document.getElementById('topbar').style.display = hideTopbarScreens.includes(screen) ? 'none' : 'flex';

  // Render screen
  const content = document.getElementById('main-content');
  switch(screen) {
    case 'home': content.innerHTML = renderHome(); break;
    case 'search': content.innerHTML = renderSearch(); break;
    case 'reels': content.innerHTML = renderReels(); break;
    case 'messages': content.innerHTML = renderMessages(); break;
    case 'notifications': content.innerHTML = renderNotifications(); break;
    case 'profile': content.innerHTML = renderProfile(state.user); break;
    case 'explore': content.innerHTML = renderExplore(); break;
    case 'settings': content.innerHTML = renderSettings(); break;
  }
}

// ===== RENDERERS =====

function renderHome() {
  return `
    <div class="fade-in">
      <div class="stories">
        <div class="story-item" onclick="showStoryCreate()">
          <div class="story-add"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div>
          <span>Add</span>
        </div>
        ${MOCK_STORIES.map(s => `
          <div class="story-item">
            <div class="story-ring"><div class="story-ring-inner"><div class="avatar">${s.author.name.charAt(0)}</div></div></div>
            <span>${s.author.username}</span>
          </div>
        `).join('')}
      </div>
      <div class="quick-tags">
        <a href="#" class="tag-chip" onclick="navigate('explore')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>AI</a>
        <a href="#" class="tag-chip" onclick="navigate('explore')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-15 0c0-2.5 1.5-4 3-5.5Z"></path></svg>React</a>
        <a href="#" class="tag-chip" onclick="navigate('explore')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>Startup</a>
        <a href="#" class="tag-chip explore" onclick="navigate('explore')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>Explore</a>
      </div>
      ${MOCK_POSTS.map(post => renderPost(post)).join('')}
    </div>
  `;
}

function renderPost(post) {
  return `
    <div class="post">
      <div class="post-header">
        <div class="post-author">
          <div class="avatar">${post.author.name.charAt(0)}</div>
          <div><div class="name">${post.author.name}</div><div class="handle">@${post.author.username}</div></div>
        </div>
        <div class="post-menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></div>
      </div>
      <div class="post-body">${post.content}</div>
      <div class="post-actions">
        <div class="post-actions-left">
          <div class="post-action" onclick="this.classList.toggle('liked')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <span>${post.likes.length}</span>
          </div>
          <div class="post-action">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 0 1 7.6-8.4 8.38 8.38 0 0 1 3.8.9l.5.2L21 3l-1.9 5.7a8.5 8.5 0 0 1 1.9 2.8z"></path></svg>
            <span>${post.comments.length}</span>
          </div>
          <div class="post-action">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
            <span>${post.reposts.length}</span>
          </div>
        </div>
        <div class="post-action">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
        </div>
      </div>
    </div>
  `;
}

function renderSearch() {
  return `
    <div class="search-box slide-up">
      <div class="search-input-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" class="search-input" placeholder="Search users, skills..." id="search-input" oninput="doSearch()" autofocus>
      </div>
    </div>
    <div class="search-results" id="search-results">
      <div style="text-align:center;padding:40px 0;color:#525252;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:48px;height:48px;margin:0 auto 12px;display:block;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        Search for users, skills, or topics
      </div>
    </div>
  `;
}

function doSearch() {
  const q = document.getElementById('search-input').value.toLowerCase();
  const results = document.getElementById('search-results');
  if (!q) {
    results.innerHTML = '<div style="text-align:center;padding:40px 0;color:#525252;">Search for users, skills, or topics</div>';
    return;
  }
  const matches = MOCK_USERS.filter(u =>
    u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q) || u.skills.some(s => s.toLowerCase().includes(q))
  );
  if (matches.length === 0) {
    results.innerHTML = `<div style="text-align:center;padding:40px 0;color:#525252;">No results for "${q}"</div>`;
    return;
  }
  results.innerHTML = matches.map(u => `
    <a href="#" class="search-user" onclick="showUserProfile('${u.username}')">
      <div class="avatar">${u.name.charAt(0)}</div>
      <div class="info">
        <div class="name">${u.name}</div>
        <div class="handle">@${u.username}</div>
        <div class="bio">${u.skills.join(' \u00B7 ')}</div>
      </div>
    </a>
  `).join('');
}

function renderReels() {
  return `
    <div style="padding:0;margin-top:-56px;">
      <div class="reels-container">
        ${MOCK_REELS.map(reel => `
          <div class="reel">
            <div class="reel-video-placeholder">
              <div class="play-btn"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="width:28px;height:28px;margin-left:4px;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></div>
            </div>
            <div class="reel-overlay"></div>
            <div class="reel-info">
              <div class="reel-author"><div class="avatar">${reel.author.name.charAt(0)}</div><div class="name">${reel.author.name}</div></div>
              <div class="reel-caption">${reel.caption}</div>
            </div>
            <div class="reel-actions">
              <div class="reel-action" onclick="this.querySelector('.reel-action-btn').classList.toggle('liked')">
                <div class="reel-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></div>
                <span>${formatCount(reel.likes)}</span>
              </div>
              <div class="reel-action"><div class="reel-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 0 1 7.6-8.4 8.38 8.38 0 0 1 3.8.9l.5.2L21 3l-1.9 5.7a8.5 8.5 0 0 1 1.9 2.8z"></path></svg></div><span>${Math.floor(reel.likes * 0.03)}</span></div>
              <div class="reel-action"><div class="reel-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg></div><span>Share</span></div>
              <div class="reel-action"><div class="reel-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg></div><span>Save</span></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderMessages() {
  return `
    <div style="padding-top:8px;" class="fade-in">
      ${MOCK_CONVERSATIONS.map(c => `
        <a href="#" class="msg-item">
          <div class="msg-avatar">${c.user.name.charAt(0)}</div>
          <div class="msg-content">
            <div class="msg-name-row"><span class="msg-name">${c.user.name}</span><span class="msg-time">${c.lastMessage.time}</span></div>
            <div class="msg-preview ${c.unread > 0 ? 'unread' : ''}">${c.lastMessage.isMe ? 'You: ' : ''}${c.lastMessage.content}</div>
          </div>
          ${c.unread > 0 ? `<div class="msg-badge">${c.unread}</div>` : ''}
        </a>
      `).join('')}
    </div>
  `;
}

function renderNotifications() {
  return `
    <div style="padding-top:8px;" class="fade-in">
      ${MOCK_NOTIFICATIONS.map(n => `
        <a href="#" class="notif-item ${!n.read ? 'unread' : ''}">
          <div class="notif-avatar">
            ${n.sender.name.charAt(0)}
            <div class="notif-icon" style="background:${n.type === 'like' ? '#ef4444' : n.type === 'comment' ? '#00d4ff' : '#22c55e'}">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                ${n.type === 'like' ? '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>' :
                  n.type === 'comment' ? '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 0 1 7.6-8.4 8.38 8.38 0 0 1 3.8.9l.5.2L21 3l-1.9 5.7a8.5 8.5 0 0 1 1.9 2.8z"></path>' :
                  '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>'}
              </svg>
            </div>
          </div>
          <div class="notif-text"><strong>${n.sender.name}</strong> ${n.message}<div class="notif-time">${n.time}</div></div>
          ${!n.read ? '<div class="notif-dot"></div>' : ''}
        </a>
      `).join('')}
    </div>
  `;
}

function renderProfile(user) {
  const u = user || state.user;
  return `
    <div class="fade-in">
      <div class="profile-cover"></div>
      <div class="profile-info">
        <div class="profile-avatar-row">
          <div class="profile-avatar">${u.name.charAt(0)}</div>
          <div class="profile-actions">
            ${u.id === state.user.id ? `<button class="btn-outline" onclick="navigate('settings')">Settings</button>` : `<button class="btn-cyan">Connect</button>`}
          </div>
        </div>
        <div class="profile-name">${u.name}</div>
        <div class="profile-handle">@${u.username}</div>
        ${u.bio ? `<div class="profile-bio">${u.bio}</div>` : ''}
        <div class="profile-meta">
          ${u.location ? `<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>${u.location}</span>` : ''}
        </div>
        <div class="profile-stats">
          <div><div class="num">${u.following?.length || 0}</div><div class="label">Following</div></div>
          <div><div class="num">${u.followers?.length || 0}</div><div class="label">Followers</div></div>
          <div><div class="num">${u.connections?.length || 0}</div><div class="label">Connections</div></div>
        </div>
        ${u.skills?.length ? `
          <div class="profile-section"><h3>Skills</h3><div class="skill-tags">${u.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div></div>
        ` : ''}
        ${u.techStack?.length ? `
          <div class="profile-section"><h3>Tech Stack</h3><div class="skill-tags">${u.techStack.map(t => `<span class="skill-tag tech">${t}</span>`).join('')}</div></div>
        ` : ''}
      </div>
      <div style="margin-top:20px;">${MOCK_POSTS.slice(0, 2).map(p => renderPost(p)).join('')}</div>
    </div>
  `;
}

function renderExplore() {
  return `
    <div class="fade-in">
      <div style="padding:20px 16px 12px;"><h1 class="gradient-text" style="font-size:24px;font-weight:800;">Explore</h1><p style="color:#a3a3a3;font-size:14px;margin-top:4px;">Discover trending topics and people</p></div>
      <div class="explore-tabs">
        <button class="explore-tab active">Trending</button>
        <button class="explore-tab">People</button>
      </div>
      <div class="trending-card">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" style="width:20px;height:20px;"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-15 0c0-2.5 1.5-4 3-5.5Z"></path></svg>
          <span style="font-weight:600;">Trending Now</span>
        </div>
        <p style="color:#a3a3a3;font-size:14px;margin-bottom:12px;">AI and Machine Learning are dominating conversations this week!</p>
        <a href="#" onclick="navigate('search')" style="color:#00d4ff;font-size:14px;font-weight:500;text-decoration:none;">Explore AI &rarr;</a>
      </div>
      ${TRENDING_TOPICS.map((t, i) => `
        <a href="#" class="trending-item">
          <div style="display:flex;align-items:center;">
            <span class="trend-rank">${String(i + 1).padStart(2, '0')}</span>
            <div>
              <div style="display:flex;align-items:center;gap:6px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2" style="width:14px;height:14px;"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
                <span class="trend-tag">${t.tag}</span>
              </div>
              <span class="trend-posts">${t.posts} posts</span>
            </div>
          </div>
          <span class="trend-pct">${t.trend}</span>
        </a>
      `).join('')}
      <div style="padding:20px 16px 8px;"><h3 style="font-size:16px;font-weight:700;">Suggested People</h3></div>
      ${MOCK_USERS.slice(0, 3).map(u => `
        <a href="#" class="search-user" style="margin:0 16px 8px;" onclick="showUserProfile('${u.username}')">
          <div class="avatar">${u.name.charAt(0)}</div>
          <div class="info"><div class="name">${u.name}</div><div class="handle">@${u.username}</div><div class="bio">${u.skills.join(' \u00B7 ')}</div></div>
        </a>
      `).join('')}
    </div>
  `;
}

function renderSettings() {
  return `
    <div class="fade-in">
      <div style="padding:20px 16px;"><h1 style="font-size:20px;font-weight:700;">Settings</h1></div>
      <div style="padding:0 16px 16px;display:flex;align-items:center;gap:12px;">
        <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#00d4ff,#a855f7);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:20px;">${state.user.name.charAt(0)}</div>
        <div><div style="font-weight:600;">${state.user.name}</div><div style="font-size:13px;color:#a3a3a3;">@${state.user.username}</div></div>
      </div>
      <div class="settings-group"><h3>Appearance</h3>
        <div class="settings-item"><div class="settings-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></div><span class="settings-label">Dark Mode</span><div class="toggle"><div class="toggle-knob"></div></div></div>
      </div>
      <div class="settings-group"><h3>Notifications</h3>
        <div class="settings-item"><div class="settings-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></div><span class="settings-label">Push Notifications</span><div class="toggle"><div class="toggle-knob"></div></div></div>
        <div class="settings-item"><div class="settings-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div><span class="settings-label">Connection Requests</span><div class="toggle"><div class="toggle-knob"></div></div></div>
      </div>
      <div class="settings-group"><h3>Account</h3>
        <a href="#" class="settings-item" onclick="handleLogout()"><div class="settings-icon" style="background:rgba(239,68,68,0.1)"><svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></div><span class="settings-label" style="color:#ef4444">Logout</span></a>
      </div>
    </div>
  `;
}

// ===== HELPERS =====

function formatCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

function showUserProfile(username) {
  const user = MOCK_USERS.find(u => u.username === username);
  if (user) {
    document.getElementById('main-content').innerHTML = renderProfile(user);
  }
}

function showCreatePost() {
  alert('Create Post - In the full version, this would open a post creation modal with image upload and text input.');
}

function showStoryCreate() {
  alert('Create Story - In the full version, this would open a story creation interface with 24h expiration.');
}

function handleLogout() {
  state.user = null;
  document.getElementById('app').classList.add('hidden');
  document.getElementById('screen-auth').classList.remove('hidden');
  showLogin();
}

// ===== INIT =====

showLogin();
