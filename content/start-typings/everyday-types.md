# Ежедневные типы
## Особое внимание
### `any/unknown`

Данные тип используется для неопределенного типа (Когда тип может быть любой). Обычно использование типа `any` не приветствуется в данной языке и на него жалуются некоторые форматировщики по типу `eslint`. Однако данные тип (типы: `any/unknown`) можно использовать, когда тип и правда может быть любым, или когда излишняя типизация не к месту.
Желательно не использовать данный тип, переменную с данным типом можно переопределить на любое значение, что может привести к непредвиденным ошибкам. Используйте тип `any/unknown` по назначению или тогда, когда знаете, что делаете.
# Обычные типы

- `string` - тип строки (`"Привет"`, `'Привет'` и другие).
- `number` - числовой тип (`1`, `2`, `3.52`, `-23` и другие).
- `bigint` - числовой тип (позволяет работать с более большими числами) (`1n`, `23n`, `12385735291999239576719235079235n`, `1n << 2n`, `1n <<< 2n` и другие).
- `boolean` - тип булевого значения (`false` или  `true`)
- ...возможно тут ещё что-то появится... автору в голову ничего не лезет...
# "Усиленная" типизация

Желательно просмотреть узнать [дженерики](./generics.md)
Прочитайте также [информацию то TypeScript](https://www.typescriptlang.org/docs/handbook/utility-types.html)
Рассмотрим типы, которые встроены в TypeScript по умолчанию:
### `Awaited<Type>`

Тип, который может использоваться совместно с `Promise`. Думаю, что все понимают, как он работает
```ts
type A = Awaited<Promise<string>>;
// type A - string
type B = Awaited<Promise<Promise<number>>>;
// type B - number
type C = Awaited<boolean | Promise<number>>;
// type C - boolean | number
```

### `Partial<Type>`

Тип для создания необязательных объектов. Он делаем все ключи в объекте необязательными. Обычно он используется для обновления какой-то информации:
```ts
// Сам тип выглядит так
type Partial<T> = {
  [P in keyof T]?: T[P] | undefined;
};
```
```ts
interface User {
  username: string;
  description: string;
};

const updateUser = (user: User, update: Partial<User>): User => {
  return { ...user, ...update };
};

const user: User = {
  username: "FOCKUSTY",
  description: ""
};

const updatedUser = updateUser(user, { description: "CEO, Backend-developer" });
// updatedUser = { username: "FOCKUSTY", description: "CEO, Backend-developer" }
```

### `Required<Type>`

Противоположный тип к `Partial`.
```ts
type Required<T> = {
  [P in keyof T]-?: T[P];
}
```
```ts
interface ICreateUser {
  username: string;
  description?: string
};

const createUser = (user: ICreateUser): Required<ICreateUser> => { ... };

const user = createUser({ username: "FOCKUSTY" });
// type user - { username: string, description: string }
```