# Документация API (RUCH Back-end)

Документация для REST API бэкенда RUCH, разработанная по аналогии со спецификацией OpenAPI (Swagger).

## Базовый URL
В локальной среде разработки базовый URL по умолчанию: `http://localhost:3000` (или порт, настроенный в вашем окружении).

Все пути запросов указываются относительно базового URL.

---

## Модели Данных (Схемы)

### TrainingType (Enum)
Тип тренировки. Допустимые значения:
- `RUNNING` — Бег
- `SWIMMING` — Плавание
- `CYCLING` — Велоспорт
- `GYM` — Тренажерный зал
- `STRETCHING` — Растяжка
- `YOGA` — Йога

### Training
| Поле | Тип | Описание | Обязательное |
| :--- | :--- | :--- | :--- |
| `id` | `integer` | Идентификатор тренировки | Да (генерируется автоинкрементом) |
| `type` | `TrainingType` | Тип тренировки | Да |
| `duration` | `integer` | Длительность тренировки | Да |
| `calories` | `integer` | Расход калорий | Да |
| `date` | `string (ISO 8601)` | Дата и время тренировки | Да |
| `exercises` | `Array<Exercise>` | Список связанных упражнений | Нет |

### Exercise
| Поле | Тип | Описание | Обязательное |
| :--- | :--- | :--- | :--- |
| `id` | `integer` | Идентификатор упражнения | Да (генерируется автоинкрементом) |
| `trainingId` | `integer` | ID связанной тренировки | Да |
| `name` | `string` | Название упражнения | Да |
| `sets` | `Array<ExerciseSet>` | Подходы (сеты) для силовых упражнений | Нет |
| `laps` | `Array<ExerciseLap>` | Круги для циклических упражнений | Нет |

### ExerciseSet
| Поле | Тип | Описание | Обязательное |
| :--- | :--- | :--- | :--- |
| `id` | `integer` | Идентификатор сета | Да (генерируется автоинкрементом) |
| `exerciseId` | `integer` | ID связанного упражнения | Да |
| `reps` | `integer` | Количество повторений | Да |
| `approach` | `integer` | Номер подхода (серии) | Да |
| `weight` | `float` | Вес снаряда (кг) | Нет (опционально, может быть `null`) |

### ExerciseLap
| Поле | Тип | Описание | Обязательное |
| :--- | :--- | :--- | :--- |
| `id` | `integer` | Идентификатор круга | Да (генерируется автоинкрементом) |
| `exerciseId` | `integer` | ID связанного упражнения | Да |
| `lapNumber` | `integer` | Номер круга | Да |
| `duration` | `integer` | Длительность круга (в секундах) | Да |
| `distance` | `float` | Дистанция круга (метры/км) | Нет (опционально, может быть `null`) |

---

## 1. Тренировки (`/trainings`)

### GET `/trainings`
Получить список всех тренировок. Тренировки возвращаются в порядке убывания даты (новые в начале). Каждая тренировка возвращается с полным деревом вложенности: связанными упражнениями, а также их сетами и кругами.

- **Метод:** `GET`
- **Путь:** `/trainings`
- **Ответ:** `200 OK`
- **Тело ответа (JSON):**
  ```json
  [
    {
      "id": 1,
      "type": "RUNNING",
      "duration": 45,
      "calories": 450,
      "date": "2026-07-08T12:00:00.000Z",
      "exercises": [
        {
          "id": 1,
          "trainingId": 1,
          "name": "Разминка на стадионе",
          "sets": [],
          "laps": [
            {
              "id": 1,
              "exerciseId": 1,
              "lapNumber": 1,
              "duration": 120,
              "distance": 400
            }
          ]
        }
      ]
    }
  ]
  ```

### GET `/trainings/{id}`
Получить информацию о тренировке по её ID. Возвращается объект тренировки с полным деревом вложенных упражнений, сетов и кругов.

- **Метод:** `GET`
- **Путь:** `/trainings/{id}`
- **Параметры пути:**
  - `id` (integer, required) — ID тренировки
- **Ответы:**
  - `200 OK` — Успешно найдено
    - **Тело ответа (JSON):**
      ```json
      {
        "id": 1,
        "type": "RUNNING",
        "duration": 45,
        "calories": 450,
        "date": "2026-07-08T12:00:00.000Z",
        "exercises": [...]
      }
      ```
  - `404 Not Found` — Тренировка не найдена
    - **Тело ответа (JSON):**
      ```json
      {
        "message": "Training not found"
      }
      ```

### POST `/trainings`
Создать новую тренировку.

- **Метод:** `POST`
- **Путь:** `/trainings`
- **Тело запроса (JSON):**
  - `type` (TrainingType, required) — Тип тренировки
  - `duration` (integer, required) — Длительность тренировки
  - `calories` (integer, required) — Потраченные калории
  - `date` (string, ISO 8601, required) — Дата и время тренировки
  - *Пример:*
    ```json
    {
      "type": "GYM",
      "duration": 60,
      "calories": 300,
      "date": "2026-07-08T10:00:00.000Z"
    }
    ```
- **Ответ:** `201 Created`
  - **Тело ответа (JSON):**
    ```json
    {
      "id": 2,
      "type": "GYM",
      "duration": 60,
      "calories": 300,
      "date": "2026-07-08T10:00:00.000Z",
      "exercises": []
    }
    ```

### PATCH `/trainings/{id}`
Частично обновить данные существующей тренировки.

- **Метод:** `PATCH`
- **Путь:** `/trainings/{id}`
- **Параметры пути:**
  - `id` (integer, required) — ID тренировки
- **Тело запроса (JSON):**
  - Любые из полей схемы `Training` (за исключением `id`), например:
    ```json
    {
      "duration": 70,
      "calories": 350
    }
    ```
- **Ответы:**
  - `200 OK` — Успешно обновлено
    - **Тело ответа (JSON):**
      ```json
      {
        "id": 2,
        "type": "GYM",
        "duration": 70,
        "calories": 350,
        "date": "2026-07-08T10:00:00.000Z",
        "exercises": []
      }
      ```
  - `404 Not Found` — Тренировка не найдена

### DELETE `/trainings/{id}`
Удалить тренировку по её ID. При этом каскадно удаляются все связанные упражнения, сеты и круги.

- **Метод:** `DELETE`
- **Путь:** `/trainings/{id}`
- **Параметры пути:**
  - `id` (integer, required) — ID тренировки
- **Ответы:**
  - `204 No Content` — Успешно удалено (тело ответа пустое)
  - `404 Not Found` — Тренировка не найдена

---

## 2. Упражнения (`/exercises`)

### GET `/exercises`
Получить список всех упражнений. Каждое упражнение включает в себя связанные сеты и круги.

- **Метод:** `GET`
- **Путь:** `/exercises`
- **Ответ:** `200 OK`
- **Тело ответа (JSON):**
  ```json
  [
    {
      "id": 1,
      "trainingId": 1,
      "name": "Приседания",
      "sets": [
        {
          "id": 1,
          "exerciseId": 1,
          "reps": 12,
          "approach": 1,
          "weight": 60
        }
      ],
      "laps": []
    }
  ]
  ```

### GET `/exercises/{id}`
Получить упражнение по его ID. Включает в себя связанные сеты и круги.

- **Метод:** `GET`
- **Путь:** `/exercises/{id}`
- **Параметры пути:**
  - `id` (integer, required) — ID упражнения
- **Ответы:**
  - `200 OK` — Успешно
    - **Тело ответа (JSON):**
      ```json
      {
        "id": 1,
        "trainingId": 1,
        "name": "Приседания",
        "sets": [...],
        "laps": [...]
      }
      ```
  - `404 Not Found` — Упражнение не найдено
    - **Тело ответа (JSON):**
      ```json
      {
        "message": "Exercise not found"
      }
      ```

### POST `/exercises`
Создать упражнение для конкретной тренировки.

- **Метод:** `POST`
- **Путь:** `/exercises`
- **Тело запроса (JSON):**
  - `trainingId` (integer, required) — ID связанной тренировки
  - `name` (string, required) — Название упражнения
  - *Пример:*
    ```json
    {
      "trainingId": 1,
      "name": "Жим лежа"
    }
    ```
- **Ответ:** `201 Created`
  - **Тело ответа (JSON):**
    ```json
    {
      "id": 2,
      "trainingId": 1,
      "name": "Жим лежа",
      "sets": [],
      "laps": []
    }
    ```

### PATCH `/exercises/{id}`
Обновить данные упражнения.

- **Метод:** `PATCH`
- **Путь:** `/exercises/{id}`
- **Параметры пути:**
  - `id` (integer, required) — ID упражнения
- **Тело запроса (JSON):**
  - `name` (string, optional) — Название упражнения
  - `trainingId` (integer, optional) — Ссылка на другую тренировку
  - *Пример:*
    ```json
    {
      "name": "Жим лежа на наклонной скамье"
    }
    ```
- **Ответы:**
  - `200 OK` — Успешно обновлено
  - `404 Not Found` — Упражнение не найдено

### DELETE `/exercises/{id}`
Удалить упражнение. При удалении каскадно удаляются все сеты и круги, связанные с ним.

- **Метод:** `DELETE`
- **Путь:** `/exercises/{id}`
- **Параметры пути:**
  - `id` (integer, required) — ID упражнения
- **Ответы:**
  - `204 No Content` — Успешно удалено
  - `404 Not Found` — Упражнение не найдено

---

## 3. Подходы (Сеты) (`/exercise-sets`)

### GET `/exercise-sets`
Получить все сеты. Каждая запись содержит вложенный объект `exercise` с информацией об упражнении.

- **Метод:** `GET`
- **Путь:** `/exercise-sets`
- **Ответ:** `200 OK`
- **Тело ответа (JSON):**
  ```json
  [
    {
      "id": 1,
      "exerciseId": 1,
      "reps": 12,
      "approach": 1,
      "weight": 60,
      "exercise": {
        "id": 1,
        "trainingId": 1,
        "name": "Приседания"
      }
    }
  ]
  ```

### GET `/exercise-sets/{id}`
Получить конкретный сет по его ID. Включает в себя связанное упражнение.

- **Метод:** `GET`
- **Путь:** `/exercise-sets/{id}`
- **Параметры пути:**
  - `id` (integer, required) — ID сета
- **Ответы:**
  - `200 OK` — Успешно
  - `404 Not Found` — Подход не найден
    - **Тело ответа (JSON):**
      ```json
      {
        "message": "Exercise set not found"
      }
      ```

### POST `/exercise-sets`
Создать новый сет для упражнения.

- **Метод:** `POST`
- **Путь:** `/exercise-sets`
- **Тело запроса (JSON):**
  - `exerciseId` (integer, required) — ID связанного упражнения
  - `reps` (integer, required) — Количество повторений
  - `approach` (integer, required) — Номер подхода (серии)
  - `weight` (float, optional) — Вес снаряда (в кг)
  - *Пример:*
    ```json
    {
      "exerciseId": 1,
      "reps": 10,
      "approach": 2,
      "weight": 65.5
    }
    ```
- **Ответ:** `201 Created`
  - **Тело ответа (JSON):**
    ```json
    {
      "id": 2,
      "exerciseId": 1,
      "reps": 10,
      "approach": 2,
      "weight": 65.5
    }
    ```

### PATCH `/exercise-sets/{id}`
Обновить данные сета.

- **Метод:** `PATCH`
- **Путь:** `/exercise-sets/{id}`
- **Параметры пути:**
  - `id` (integer, required) — ID сета
- **Тело запроса (JSON):**
  - `reps` (integer, optional) — Количество повторений
  - `approach` (integer, optional) — Номер подхода
  - `weight` (float, null/optional) — Вес. Для очистки значения можно передать `null`.
  - *Пример:*
    ```json
    {
      "reps": 12,
      "weight": 70
    }
    ```
- **Ответы:**
  - `200 OK` — Успешно обновлено
  - `404 Not Found` — Сет не найден

### DELETE `/exercise-sets/{id}`
Удалить сет.

- **Метод:** `DELETE`
- **Путь:** `/exercise-sets/{id}`
- **Параметры пути:**
  - `id` (integer, required) — ID сета
- **Ответы:**
  - `204 No Content` — Успешно удалено
  - `404 Not Found` — Сет не найден

---

## 4. Круги (`/exercise-laps`)

### GET `/exercise-laps`
Получить список всех кругов. Каждый круг содержит вложенный объект `exercise` с информацией об упражнении.

- **Метод:** `GET`
- **Путь:** `/exercise-laps`
- **Ответ:** `200 OK`
- **Тело ответа (JSON):**
  ```json
  [
    {
      "id": 1,
      "exerciseId": 2,
      "lapNumber": 1,
      "duration": 95,
      "distance": 400,
      "exercise": {
        "id": 2,
        "trainingId": 1,
        "name": "Бег на стадионе"
      }
    }
  ]
  ```

### GET `/exercise-laps/{id}`
Получить информацию о круге по его ID. Включает в себя связанное упражнение.

- **Метод:** `GET`
- **Путь:** `/exercise-laps/{id}`
- **Параметры пути:**
  - `id` (integer, required) — ID круга
- **Ответы:**
  - `200 OK` — Успешно
  - `404 Not Found` — Круг не найден
    - **Тело ответа (JSON):**
      ```json
      {
        "message": "Exercise lap not found"
      }
      ```

### POST `/exercise-laps`
Создать новый круг для упражнения.

- **Метод:** `POST`
- **Путь:** `/exercise-laps`
- **Тело запроса (JSON):**
  - `exerciseId` (integer, required) — ID связанного упражнения
  - `lapNumber` (integer, required) — Номер круга/дистанции
  - `duration` (integer, required) — Длительность круга (в секундах)
  - `distance` (float, optional) — Дистанция круга (в метрах/километрах)
  - *Пример:*
    ```json
    {
      "exerciseId": 2,
      "lapNumber": 2,
      "duration": 92,
      "distance": 400
    }
    ```
- **Ответ:** `201 Created`
  - **Тело ответа (JSON):**
    ```json
    {
      "id": 2,
      "exerciseId": 2,
      "lapNumber": 2,
      "duration": 92,
      "distance": 400
    }
    ```

### PATCH `/exercise-laps/{id}`
Обновить данные круга.

- **Метод:** `PATCH`
- **Путь:** `/exercise-laps/{id}`
- **Параметры пути:**
  - `id` (integer, required) — ID круга
- **Тело запроса (JSON):**
  - `lapNumber` (integer, optional) — Номер круга
  - `duration` (integer, optional) — Длительность
  - `distance` (float, null/optional) — Дистанция. Для сброса значения можно передать `null`.
  - *Пример:*
    ```json
    {
      "duration": 88
    }
    ```
- **Ответы:**
  - `200 OK` — Успешно обновлено
  - `404 Not Found` — Круг не найден

### DELETE `/exercise-laps/{id}`
Удалить круг.

- **Метод:** `DELETE`
- **Путь:** `/exercise-laps/{id}`
- **Параметры пути:**
  - `id` (integer, required) — ID круга
- **Ответы:**
  - `204 No Content` — Успешно удалено
  - `404 Not Found` — Круг не найден
