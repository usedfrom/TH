# Транспортная накладная App

Это веб-приложение для заполнения формы транспортной накладной (на основе Приложения №4 к Правилам перевозок) и генерации PDF. Основано на вашем Excel-файле.

## Установка

1. Клонируйте репозиторий: `git clone <your-repo-url>`
2. `cd transport-app`
3. `npm install`
4. `npm run dev` — запустите на localhost:5173

## Функции

- Форма для ввода данных (грузоотправитель, груз, перевозчик и т.д.).
- Генерация PDF по кнопке (использует @react-pdf/renderer).
- Шаблон Excel в /public для референса.

## Деплой на Vercel

1. Пушьте на GitHub.
2. В Vercel: New Project > Import Repo.
3. Настройки: Framework Preset - Vite.

## Зависимости

- React
- @react-pdf/renderer для PDF

Лицензия: MIT