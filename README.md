# Sky AI - AI-Powered Content Creation Platform

Sky AI is an advanced AI-powered content creation platform that helps users generate high-quality blog articles, marketing content, YouTube scripts, and even AI-generated images and videos. Built with **Next.js, React, TypeScript, Tailwind CSS, and Drizzle ORM**, Sky AI integrates multiple AI APIs to provide powerful content automation tools.

## **Features**
- ✍️ **AI Blog & Article Generator** - Instantly create high-quality blog posts.
- 🎥 **YouTube SEO & Script Generator** - Generate optimized YouTube scripts.
- 🖼️ **AI-Powered Image Generation** - Uses Hugging Face API for AI image creation.
- 📹 **AI Video Generation** - Generate short videos using Hugging Face.
- 🔄 **Content Rewriter & Improvement** - Rewrite and enhance existing content.
- 📢 **Instagram & Marketing Tools** - AI-generated social media posts and ads.
- 🛠 **AI Code Generator & Bug Fixing** - Help developers with AI-powered coding.
- 🔑 **User Authentication** - Secure login with Clerk.
- 💳 **Subscription Management** - Manage premium features and billing.

---

## **Tech Stack**
- **Frontend:** Next.js (React, TypeScript, Tailwind CSS)
- **Backend:** Drizzle ORM, Node.js
- **Authentication:** Clerk
- **APIs:** Hugging Face, Gemini AI (Google), OpenAI
- **Database:** PostgreSQL (or any relational DB with Drizzle ORM)
- **Deployment:** Vercel / Railway / Render

---

## **Installation & Setup**

### **1. Prerequisites**
Ensure you have the following installed on your system:
- **Node.js** (LTS recommended) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)
- **A PostgreSQL database** (or modify the config for another DB)

### **2. Clone the Repository**
```sh
$ git clone https://github.com/shettyv985/skyc.git
$ cd skyc
```

### **3. Install Dependencies**
Using npm:
```sh
$ npm install
```
Or using yarn:
```sh
$ yarn install
```

### **4. Set Up Environment Variables**
Create a **.env** file in the root directory and configure the following:
```sh
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key
CLERK_SECRET_KEY=your-clerk-secret-key

DATABASE_URL=your-database-url

HUGGING_FACE_API_KEY=your-hugging-face-api-key
HUGGING_FACE_VIDEO_API_KEY=your-hugging-face-video-api-key

GEMINI_API_KEY=your-gemini-api-key
```
Make sure to replace the values with actual credentials.

### **5. Configure the Database (Drizzle ORM)**
Run migrations:
```sh
$ npx drizzle-kit push
```
Or:
```sh
$ npm run db:migrate
```

### **6. Start the Development Server**
```sh
$ npm run dev
```
Or:
```sh
$ yarn dev
```
The app should now be running at **http://localhost:3000** 🚀

### **7. Build for Production**
```sh
$ npm run build
$ npm run start
```


---

## **Project Structure**
```
sky-ai/
├── .gitignore
├── README.md
├── drizzle.config.js
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   ├── sign-up/[[...sign-up]]/page.tsx
│   ├── (data)/Templates.tsx
│   ├── dashboard/
│   │   ├── billing/page.tsx
│   │   ├── content/[template-slug]/page.tsx
│   │   ├── history/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── _components/
│   │   │   ├── Header.tsx
│   │   │   ├── SideNav.tsx
│   │   │   ├── ImageOutputSection.tsx
│   │   │   ├── VideoOutputSection.tsx
│   ├── layout.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   ├── json/
├── public/
│   ├── file.svg
│   ├── logo.svg
│   ├── next.svg
├── utils/
│   ├── AiModal.tsx
│   ├── huggingFaceApi.ts
│   ├── huggingFaceVideoApi.ts
│   ├── schema.tsx
```

---


---
### 🚀 **Enjoy building with Sky AI!**

