# DZ Notes 📝

Упрощённая копия приложения «Заметки» из macOS, созданная с использованием современного фронтенд-стека.

## 🚀 Стек технологий

- **React 19** + **TypeScript**
- **Vite** для сборки
- **React Router v6**
- **Mantine UI** — для компонентов и редактора
- **Tiptap** — расширяемый редактор текста
- **Firebase** — аутентификация и хранение данных
- **PWA** — работает в оффлайн-режиме
- **Context API** + кастомные хуки
- Архитектура: **Feature-Sliced Design (FSD)**

## 📱 Возможности

- Авторизация и регистрация пользователей
- Просмотр и редактирование заметок
- Автосохранение текста при редактировании
- Rich text-редактор с поддержкой форматирования
- Поиск по заметкам по части слова
- Удаление заметки с подтверждением
- Полностью адаптивный интерфейс: десктоп + мобильный
- Работа в оффлайне (PWA)

## 🔗 Веб-приложение

[https://notes-result-university-middle.web.app](https://notes-result-university-middle.web.app)

## 🖼️ Скриншоты

### Десктопный режим
<p float="left">
  <img src="./public/screenshot/desktop_1.png" width="32%" />
  <img src="./public/screenshot/desktop_2.png" width="32%" />
  <img src="./public/screenshot/desktop_3.png" width="32%" />
</p>

### Мобильный режим
<p float="left">
  <img src="./public/screenshot/mobile_1.png" width="24%" />
  <img src="./public/screenshot/mobile_2.png" width="24%" />
  <img src="./public/screenshot/mobile_3.png" width="24%" />
  <img src="./public/screenshot/mobile_4.png" width="24%" />
</p>

## ⚙️ Установка и запуск

```bash
# Установить зависимости
npm install

# Запустить проект в dev-режиме
npm run dev

# Собрать production-бандл
npm run build

# Просмотр собранного проекта локально
npm run preview

# Проверка линтера
npm run lint
```
