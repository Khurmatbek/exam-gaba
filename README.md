# 🚀 Exam Gaba — Employee Registry System

🔗 **Live Demo:**
👉 https://exam-gaba.vercel.app/

---

## 📌 About Project

Exam Gaba — bu zamonaviy **Employee Registry (xodimlar ro‘yxati)** web ilova bo‘lib, tezkor qidiruv, pagination va interaktiv UI orqali ma’lumotlarni boshqarishni osonlashtiradi.

Loyiha **clean architecture** va **modern React ecosystem** asosida qurilgan.

---

## 🏗️ Project Structure

```bash
src/
│
├── components/    # UI komponentlar (Table, Search)
├── functions/     # API bilan ishlash (axios)
├── hooks/         # Custom hooks (logic & caching)
├── settings/      # Global config (queryClient, axios)
├── types/         # TypeScript interfeyslar
├── constants/     # Konstantalar
```

---

## ✨ Features

### 🔍 Global Search

* Ism, familiya, lavozim yoki IP orqali qidiruv
* Server-side search (API orqali)

### 📄 Smart Pagination

* Sahifalar bo‘ylab tez navigatsiya
* React Query bilan cache saqlash

### 📞 Interactive Contacts

* 📧 Email → `mailto:` orqali ochiladi
* 📱 Telefon → `tel:` orqali qo‘ng‘iroq

### 🔐 Secure Data

* Bank karta raqami mask qilinadi
* Faqat oxirgi 4 ta raqam ko‘rinadi

### 🎨 Modern UI

* Dark Mode 🌙
* Glassmorphism effect ✨
* Smooth UX

---

## 🧑‍💻 How to Use

### 🔎 Search

* Qidiruv maydoniga yozing
* `Enter` yoki **Search** tugmasini bosing

### 📊 Sorting

* Column header ustiga bosib saralash mumkin

### 📑 Pagination

* Pastdagi pagination orqali sahifalarni almashtiring

### 📍 Tooltip

* Location ustiga hover → to‘liq address chiqadi

---

## ⚙️ Tech Stack

* ⚛️ React
* 🧠 TypeScript
* 🔥 TanStack Query (React Query)
* 🌐 Axios
* 🎨 Ant Design

---

## 🧠 Architecture & Best Practices

### 🔄 Data Fetching

* TanStack Query ishlatilgan
* Stale-While-Revalidate strategiyasi
* Minimal network request

---

### 🔍 Search System

* Server-side search:

```bash
/users/search?q=...
```

* Har qidiruvda:

```bash
page → 1 ga reset
```

---

### 📄 Pagination Logic

```ts
limit  // page size
skip   // offset
```

* Dynamic hisoblanadi
* API bilan sync ishlaydi

---

### 🎨 UI/UX

* Glassmorphism design
* Dark theme
* Hidden scrollbar (clean UI)

#### Interactive:

* `tel:` → call
* `mailto:` → email

---

### 🛡 Type Safety

* Strict TypeScript
* Optional chaining:

```ts
record?.bank?.cardNumber
```

👉 crash oldini oladi

---

## 📦 Installation

```bash
git clone https://github.com/your-username/exam-gaba.git
cd exam-gaba
npm install
npm run dev
```

---

## 🌍 Environment Variables

```env
VITE_BASE_URL=https://api.example.com
```

---

## 🚀 Deployment

Project deploy qilingan:
👉 https://exam-gaba.vercel.app/

---

## 🎯 Summary

Bu loyiha:

* ⚡ Fast
* 🧱 Scalable
* 🧠 Clean Architecture
* 🎨 Modern UI

---

## 👨‍💻 Author

**Xurmatbek  Olloyorov (Uzbekistan)**
