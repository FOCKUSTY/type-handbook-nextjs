# Стандартная типизация

## Возможные типы

- `string`
- `number`
- `bigint`
- `any`
- `unknown`
- `object`
- `undefined`
- `null`
- `void`
- `never`
- [and other...](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
## Стандартная типизация
### Типы в переменных

```ts
// ! - Об этом поговорим попозже
const alpha: any = "some-value";
const beta: number = 50;
const gamma: string = "Hello, World";
const epsilon: object = {...}; // !
const delta: [] = []; // !
// etc...
```
### Типы в функциях

Больше Вы узнаете в [Типы в функциях](./types-in-functions.md)
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
### Использование нескольких типов

```ts
let alpha: number|string = "Hello";
const beta: number|string|any[] = [];
alpha = 1;

function someFunc(data: number|string) {...};

someFunc(aplha); // Нормально
someFunc(beta); // Ошибка: тип any[] не может быть назначен для типа number; тип any[] не может быть назначен для типа string
```
Также есть пересечения типов (Через знак `&`), но о них поговорим позже.
### Типы в классах

Типизация в классах ничем почти не отличается от типизации в функциях/переменных. Просто смотрите:
```ts
class MyClass {
	private _some_value: string;

	public constuctor(someValue: string) {
		this._some_value = someValue;
	}

	public getSomeValue(): string {
		return this._some_value;
	}

	public getSomeValue2 = (): string => {
		return this._some_value;
	};

	public set someValue(value: string) {
		this._some_value = value;
	}

	public get someValue(): string {
		return this._some_value;
	}
}
```
Думаю, что тут не стоит что-то рассказывать, итак всё видно и ясно.
# Типизация массивов

Я специально выделю это в отдельный слот, также будет отдельный слот для объектов и Map.
Объявления типа массива можно сделать двумя способами, рассмотрим на примере `string`
```ts
const usernames: string[] = [
   "FOCKUSTY",
   "Valentin Bird",
   "Adelya",
   "beyz1k",
   "Omonillo"
];

const usernames2: Array<string> = [
   "FOCKUSTY",
   "Valentin Bird",
   "Adelya",
   "beyz1k",
   "Omonillo"
];

const usernames3: {
	[key: number]: string
} = [...]; // Насчёт этого варианта поговорим позже, когда затроним объекты
```
```ts
	// Проверка массива
type MaybeArray = string | string[]

const foo = "";
const bar = [];

Array.isArray(foo) // false
Array.isArray(bar) // true
```
Что первый, что второй вариант одинаковы, однако второй вариант я обычно не использую. Лично я считаю, что он немного большой и не удобный, однако другим людям виднее, особенно Вам. Я рекомендую использовать первый вариант.
Что насчёт стрелок (`<` и `>`), это дженерик, я про них потом ещё поговорю, сейчас это немного рано.
# Типизация объектов

Типизация объектов иногда сложна для понимания, сразу скажу, что я не рекомендую использовать тип `object`. Так как этим типом обладают большинство вещей в TypeScript. К примеру, функция, массив, Map и другие вещи имеют тип `object`.
Тогда как же типизировать объекты? — Через `{}`, сейчас покажу на примере:
```ts
const mebers: {
	[key: string]: string
} = {
	FOCKUSTY: "ceo",
	"Valentin Bird": "teamlead",
	Adelya: "manager",
	beyz1k: "promoter",
	Omonillo: "promoter"
};
```
Что значит `[key: string]`? — Думаю, что некоторые уже поняли, однако я всё равно объясню. В квадратные скобки мы ставим значения ключа, то есть определяем, какой тип может быть ключом в данном объекте. Не рекомендую ставить что-то кроме строкового значения. Но рассмотрим и другие примеры.
```ts
const users: {
	[key: number]: string
} = [
	"FOCKUSTY",
	"Valentin Bird",
	"Adelya",
	"beyz1k",
	"Omonillo"
];
```
Итак... Как это у нас объект превратился в массив? — Всё просто, ключами в массиве являются числовые значения (индексы), так что вот так вот и получается. Да, можно написать и по-другому:
```ts
const users: {
	[key: number]: string
} = {
	1: "FOCKUSTY",
	2: "Adelya",
	...
}; // Да, мне уже лень команду расписывать
```
Конечно, есть и ещё варианты указать тип объекта, но мы про них поговорим позже.
# Типизация Map

Думаю, что тут некоторые знают, что за `Map` такой, если нет, то загуглите, объяснять не буду.
```ts
const users: Map<string, string> = new Map([
	["FOCKUSTY", "ceo"],
	["Valentin Bird", "teamlead"],
	["Adelya", "manager"],
	["beyz1k", "promoter"],
	["Omonillo", "promoter"]
]);
```
Итак, не будем обращать пока что внимания на стрелки, перейдём сразу к типам, что записаны в них.
Первый `string` — ключ, по которому мы будем брать значения.
Второй `string` — значение, которые мы будем получать по ключу.
Думаю, что некоторые знают, что `Map` лучше, чем `object`, потому что в ключи можно закинуть (как я думаю) любое значение, даже массив. Однако я, всё же, рекомендую приводить ключ к типу `string`, потому что так надёжнее, как я считаю.
```ts
users.get("FOCKUSTY"); // string ("ceo")
users.set("FOCKUSTY", "author");
users.set("Adelya", "ceo");
```