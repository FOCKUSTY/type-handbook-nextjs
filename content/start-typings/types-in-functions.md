# Типы в функциях

Я решил вынести это в отдельный блок, чтобы было удобнее.

```ts
// Стандартная функция на js
function printHello(name) {
	console.log("Hello, " + name);
};

// Рассмотрим функции на ts
function printHello2(name: string): void {
	console.log("Hello, " + name);
};

// Указание типов для аргументов в функции идёт после двоеточия, как в переменных.
// Чтобы указать тип, который возвращает функция, то ставим двоеточие после круглых скобок.

// Рассмотрим другую функцию
const otherFunc = (num: number): void => {
	console.log(num);
};
```

Рассмотри подробно:

```ts
// Асинхронные функции
async function getNumber(num: number) {
	return num;
}
const getNumber2 = async(num: number) => {
	return num;
}

const data = getNumber(0); // Promise<number>
const data2 = getNumer2(0); // Promise<number>
```

Примечание: Асинхронные функции всегда возвращают `Promise`.

```ts
const languages = ["JavaScript", "TypeScript", "GoLang", "Rust", "C++", "C#"];

languages.map(function(language: string): string {
	return language + " Language";
});

languages.map((language: string): string => {
	return language + " is the best";
});
```

## Типизация объектов в функциях

```ts
type Props = {
	name: string;
	age: number
};

function someFunction({ name, age }: Props) {
	return `Your are ${age} age, wow! Congratulations, ${name}`;
};

const data: Props = {
	name: "FOCKUSTY",
	age: 15
};

console.log(someFunction({ name: "FOCKUSTY", age: 15 }));
console.log(someFunction(data));
// Итак, я точно не знаю, как это называется, но я называю это разворачиванием объекта в аргументы функции. Фактически мы принимаем объект и сразу его разбиваем на аргументы.
// Такое точно используется в фреймворке React и других, также это является полезным, когда аргументы функции превышают двух.
```

## Дженерики в типах

[Прошу ознакомиться, если не знакомы](./generics.md)

```ts
function fromJson<T>(json: string): T {
	return JSON.parse(json);
}

type User = {
	id: string;
	username: string;
};

const user = fromJson<User>('{"id":"1","username":"FOCKUSTY"}');
// У user будет тип User, прочем логично

console.log(user) // { id: "1", username: "FOCKUSTY" };
```

Тут нет ничего особенного, мы просто в передаём в функцию тип, который мы хотим получить. Однако дженерики можно использовать не только для этого

```ts
function mergeObjects<T, K>(first: T, second: K): T & K {
	return { ...first, ...second };
}

type User = {
	id: string;
	username: string;
	nickname?: string;
};

type CreateUser = {
	username: string;
	nickname?: string
}

const user = mergeObjects<CreateUser, User>({
	username: "FOCKUSTY"
}, {
	id: "1",
	username: "FOCKUSTY"
}) // type: { id: string, username: string, nickname?: string }
```

Но стоп, что если мы передадим в дженерики не объект? Можно ли от этого защититься? — Да, можно!

```ts
// Первый вариант
function mergeObjects<T, K>(
	first: { [key: string]: T },
	second: { [key: string]: K }
): {[key: string]: T | K} {
	return { ...first, ...second }
}

// Второй вариант
function mergeObjects<
	T extends {[key: string]: unknown},
	K extends {[key: string]: unknown}
>(first: T, second: K) {
    return { ...frist, ...second };
};
```

**В первом варианте** мы говорим, что объект может принимать только определенный тип в качестве значения, из-за чего у нас получится однородный объект.
**Во втором варианте**, мы засовываем тип объекта, из-за чего значения объекта могут различаться.
Эти оба варианта используются в разработке, смотря что нужно.
**Итак вопрос**. Нужно ли каждый раз прописывать эти типы в дженерики?
**Ответ — нет**, но почему? Сейчас покажу!

```ts
function parseObject<T extends {[key: string]: unknown}>(object: T): T {
	// тут будет код парсера
	return object;
}

type User = {
	id: string;
	username: string;
};

const data: User = {
	id: "1",
	username: "FOCKUSTY"
}

const user = parseObject(data); // type: User
```

Но почему тут не нужно указывать тип в дженериках?
Потому что TypeScript умный и сам выставляет тип, когда мы передаём данные функцию.
