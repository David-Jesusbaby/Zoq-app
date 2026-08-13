# ZOQ - Full-Stack Tech Social Network

## Project Overview

ZOQ is a full-stack real-time social networking platform built for tech professionals. It connects developers, engineers, startups, and companies in a collaborative space.

## Project Location

The complete project is located at: `/tmp/zoq/`

## Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Responsive Mobile-First Design**

### Backend
- **Next.js API Routes**
- **MongoDB** with Mongoose
- **JWT Authentication**
- **bcrypt** password hashing
- **Socket.io** for real-time features

## Features Implemented

### 1. Authentication System
- User registration with multi-step wizard
- Login with JWT tokens
- Protected routes
- Password hashing with bcrypt

### 2. Profile System
- Profile creation wizard
- Profile picture upload
- Bio, skills, tech stack
- Role selection (Geek/Company)
- Edit profile functionality
- View other profiles

### 3. Connection System
- Send connection requests
- Accept/reject requests
- View connections list
- Connection count tracking

### 4. Feed System
- Create posts (text + images)
- Like/unlike posts
- Comment on posts
- Repost functionality
- Share posts
- Infinite scroll
- Post ownership (edit/delete)

### 5. Story System
- Upload temporary stories
- 24-hour expiration
- Story viewer list
- Instagram-style story rings

### 6. Notification System
- Real-time notifications
- Notification types: like, comment, connection, repost, mention
- Mark as read functionality
- Notification counter badge

### 7. Search System
- Search users by name/username
- Search posts by content
- Filter by skills
- Tab-based results (All/Users/Posts)

### 8. Mobile-First UI
- Fixed bottom navigation
- Top bar with create post button
- Notification bell
- Responsive design
- Instagram-inspired story circles

## Project Structure

```
/tmp/zoq/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   │   ├── login/route.ts
│   │   │   │   └── register/route.ts
│   │   │   ├── connections/   # Connection endpoints
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── notifications/ # Notification endpoints
│   │   │   │   └── route.ts
│   │   │   ├── posts/         # Post endpoints
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       ├── like/route.ts
│   │   │   │       └── comment/route.ts
│   │   │   ├── search/        # Search endpoint
│   │   │   │   └── route.ts
│   │   │   ├── stories/       # Story endpoints
│   │   │   │   └── route.ts
│   │   │   ├── users/         # User endpoints
│   │   │   │   ├── me/route.ts
│   │   │   │   └── [username]/route.ts
│   │   │   └── socket/        # Socket.io route
│   │   │       └── route.ts
│   │   ├── login/             # Login page
│   │   │   └── page.tsx
│   │   ├── register/          # Register page
│   │   │   └── page.tsx
│   │   ├── profile/           # Profile pages
│   │   │   └── [username]/
│   │   │       └── page.tsx
│   │   ├── search/            # Search page
│   │   │   └── page.tsx
│   │   ├── notifications/     # Notifications page
│   │   │   └── page.tsx
│   │   ├── messages/          # Messages page
│   │   │   └── page.tsx
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Avatar.tsx
│   │   ├── layout/           # Layout components
│   │   │   ├── TopBar.tsx
│   │   │   └── BottomNav.tsx
│   │   ├── feed/             # Feed components
│   │   │   ├── Feed.tsx
│   │   │   └── CreatePost.tsx
│   │   ├── stories/          # Story components
│   │   │   └── Stories.tsx
│   │   ├── profile/          # Profile components
│   │   ├── notifications/    # Notification components
│   │   └── chat/             # Chat components
│   ├── context/              # React contexts
│   │   └── AuthContext.tsx   # Authentication context
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utilities
│   │   ├── db/              # Database
│   │   │   └── mongodb.ts
│   │   ├── auth/            # Auth utilities
│   │   │   └── jwt.ts
│   │   └── socket/          # Socket.io
│   │       └── server.ts
│   ├── models/               # Mongoose models
│   │   ├── User.ts
│   │   ├── Post.ts
│   │   ├── Connection.ts
│   │   ├── Notification.ts
│   │   ├── Story.ts
│   │   ├── Message.ts
│   │   └── index.ts
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   └── utils/                # Helper functions
│       └── cn.ts
├── public/                   # Static files
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── .env.local.example
└── README.md
```

## Database Models

### User
- email, password, username, name
- avatar, bio, skills, techStack
- role (geek/company)
- companyName, companySize, website, location
- followers, following, connections
- isVerified, badges

### Post
- author, content, images
- likes, comments, reposts
- originalPost (for reposts)

### Connection
- requester, recipient
- status (pending/accepted/rejected)

### Notification
- recipient, sender, type
- post (optional), message, isRead

### Story
- author, image, caption
- viewers, expiresAt

### Message
- sender, recipient, content
- isRead, readAt

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update current user
- `GET /api/users/[username]` - Get user by username

### Posts
- `GET /api/posts?page=1&limit=10` - Get feed posts
- `POST /api/posts` - Create post
- `POST /api/posts/[id]/like` - Like/unlike post
- `POST /api/posts/[id]/comment` - Comment on post

### Connections
- `GET /api/connections?status=accepted` - Get connections
- `POST /api/connections` - Send connection request
- `PUT /api/connections/[id]` - Accept/reject request
- `DELETE /api/connections/[id]` - Remove connection

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications` - Mark all as read

### Stories
- `GET /api/stories` - Get active stories
- `POST /api/stories` - Create story

### Search
- `GET /api/search?q=query&type=users` - Search

## Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=mongodb://localhost:27017/zoq
JWT_SECRET=your-super-secret-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Getting Started

1. **Install dependencies:**
   ```bash
   cd /tmp/zoq
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your values
   ```

3. **Start MongoDB** (local or use MongoDB Atlas)

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
cd /tmp/zoq
npm run build
npm start
```

## Deployment

### Vercel (Frontend)
1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy

### MongoDB Atlas (Database)
1. Create free cluster
2. Get connection string
3. Update MONGODB_URI

### Render/Railway (Backend if separate)
1. Connect repo
2. Add environment variables
3. Deploy

## Security Features

- Password hashing with bcrypt
- JWT authentication
- Protected API routes
- Input validation
- CORS protection
- Secure cookies

## Mobile-First Design

- Fixed bottom navigation (Home, Search, Updates, Inbox, Profile)
- Top bar with create post button
- Story circles (Instagram-style)
- Responsive breakpoints
- Touch-friendly UI

## Real-Time Features (Socket.io)

- Live notifications
- Real-time feed updates
- Chat messaging
- Typing indicators
- Online status

## Notes

- The project uses Next.js API routes for the backend
- MongoDB is used as the database with Mongoose ODM
- JWT tokens are stored in localStorage
- Socket.io is set up for real-time features
- Images are stored as base64 (can be upgraded to Cloudinary)
- Stories automatically expire after 24 hours (MongoDB TTL)
