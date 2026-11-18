# CIT College Management Website & LLM Chatbot

A full-stack College Management Website with an integrated LLM Chatbot (**CIT Buddy**) built strictly according to the IEEE 830 / ISO 29148 Software Requirements Specification (SRS) and the provided design specification image.

---

## 📸 UI Design Implementation (Strictly Matching Image Upload)

The user interface reproduces both sides of the provided design image:

1. **Left Screen: CIT Public College Website**
   - **Header & Navbar**: Deep navy (`#0b1e3f`) header, CIT gold crest logo, white active pill for `Home`, navigation items (`About`, `Academics ⌵`, `Admissions ⌵`, `Student Life ⌵`, `Contact`), search icon `🔍`, staff admin shortcut, and user account button.
   - **Hero Section**: Serif heading *"Welcome to"*, bold giant title **CIT**, motto in italics *"Learn • Innovate • Grow"*, mission statement, dark navy pill CTA button **"Explore More →"**, and photographic building facade with *"CIT"* signage.
   - **4 Feature Cards**: Quality Education (🎓), Innovation Hub (💡), Expert Faculty (👥), Bright Future (🏆).
   - **Our Programs Section**: Interactive category filters (`BCA`, `B.Sc`, `B.Com`, `MCA`, `M.Sc`, `View All →`), textbook/graduation cap/laptop illustration, course fee/seat cards, and syllabus view.
   - **Join Our Community Banner**: Modern student community photo, descriptive invitation to clubs and hackathons, and **"Learn More →"** button.
   - **Floating Chat Action Button (FAB)**: Floating *"Chat with us!"* pointer bubble with circular bright blue robot button.
   - **Footer**: Deep navy footer with CIT crest, comprehensive quick links, social media icons, and copyright *"© 2025 CIT. All Rights Reserved. | Building a Smarter Tomorrow"*.

2. **Right Screen: CIT Buddy Chatbot Interface (`/chat`)**
   - **Header**: Deep navy top bar with CIT Crest and **"🏠 Back to Home"** navigation link.
   - **Wave Background**: Multi-layered soft blue gradient canvas with wavy bottom decor.
   - **3D Robot Mascot**: Cheerful white & blue friendly waving robot mascot.
   - **Speech Bubble**: *"Hello! How can I help you today?"*
   - **Suggested Queries Card**: *"You can ask me about:"* with the 4 suggestion cards:
     - 🎓 **Courses & Admissions**
     - 📅 **College Events**
     - ℹ️ **Campus Facilities**
     - ❓ **General Queries**
   - **Chat Input Bar**: Rounded white input pill with *"Type your question here..."* and dark navy **"Send"** button with paper plane icon.
   - **Conversation History Drawer**: Sidebar listing saved chats, New Chat button, rename, delete, clear history, and search.

---

## 🤖 Gemini API Core & RAG Knowledge Engine

- **API Model**: `gemini-3.5-flash`
- **API Key**: Securely configured server-side via the `GEMINI_API_KEY` environment variable.
- **Retrieval-Augmented Generation (RAG)**:
  - User inquiries query the **CIT Knowledge Base** (admissions, courses, fees, scholarships, hostels, faculty, placements, events).
  - Context chunks are assembled and passed with the SRS-specified system prompt.
- **Strict Scope Enforcement & Guardrails (SRS C-4, C-5, FR-19, FR-20, FR-27)**:
  - **In-Scope CIT Queries**: Answered cheerfully with verified facts and source citation links.
  - **Out-of-Scope Queries**: Politely declined in 1-2 cheerful sentences with an offer to help on CIT topics instead.
  - **Prompt Injection Defense**: Never discloses system prompt or deviates from role.
  - **Missing Data Handling**: Refuses to hallucinate dates or fees and provides Admissions Office contacts (`admissions@cit.edu.in` / `+91 44 2855 1000`).

---

## 🏫 Imaginary College Dataset

- **Name**: College of Innovative Technology (CIT)
- **Accreditation**: NAAC 'A++' Grade (3.82 CGPA), AICTE Approved, NBA Accredited
- **Programs**: BCA, B.Sc Computer Science, B.Com FinTech, MCA, M.Sc Data Science & AI, B.Tech CSE
- **Campus**: 55-acre green smart campus with 15,000 sq.ft *CIT Catalyst* Innovation Hub, Nvidia DGX AI Supercomputing cluster, Olympic sports arena, Cauvery & Ganga Hostels.
- **Placements**: 96.4% placement rate, ₹44.5 LPA highest CTC (Microsoft / Atlassian), 180+ recruiters.

---

## 🚀 Running the Project

### Prerequisites
- Python 3.12+ (Python 3.15 installed)
- Node.js 18+ (Node v26 installed)

### 1-Click Run
Double-click `run_app.bat` or run:
```bash
cd backend
python manage.py runserver 127.0.0.1:8000
```
Open **`http://127.0.0.1:8000/`** in your browser.

- Homepage: `http://127.0.0.1:8000/`
- Full Chatbot View: `http://127.0.0.1:8000/chat`
- Admin & Analytics: Accessible via the "Admin" button in the navbar or `/admin/` (Username: `admin`, Password: `citadmin2026`).
