# 7K Master Dashboard

**7K Master Dashboard** is a comprehensive, AI-enhanced personal productivity PWA designed to help you take full control of your goals, skills, routines, and environment — all in one clean, offline-first interface.

---

## 🚀 Features

### 🗓️ Today Tab
- AI-generated daily schedule with time-blocks
- Edit, add, or delete tasks easily
- Smart task suggestions based on your context
- Optional Pomodoro timer & energy tracking

### 📁 Projects Tab
- Goal cards with nested to-do lists and work logs
- AI-powered breakdown of goals into milestones
- Color-coded project categories and tags

### 📚 Skills Tab
- Track skills with interactive progress bars
- AI “Focus Mode” suggests priority skills for the week
- Add resources, practice logs, and custom notes

### 🧘‍♂️ Self & Space Tab
- Personal vision board with custom image uploads
- Track daily habits and room/environmental improvements
- Mood and lifestyle inputs for holistic self-growth

### 🤖 AI Assistant Tab
- Chat interface to plan, brainstorm, reflect
- Smart prompt shortcuts (e.g., “Plan week”, “Review goals”)
- Full offline fallback with local context

### 📊 Progress Tab
- Visual progress charts across tasks, goals, and habits
- Weekly and monthly trend analytics
- Export reports as CSV or PDF

---

## 🌐 Tech Stack

- **Frontend**: React + TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **Storage**: IndexedDB via `localForage` (offline-first)
- **AI**: Gemini API / GPT (optional)
- **PWA**: Service Workers, manifest.json for installable app

---

## 📦 Local Setup

```bash
git clone https://github.com/yourusername/7k-master-dashboard
cd 7k-master-dashboard
npm install
npm run dev
