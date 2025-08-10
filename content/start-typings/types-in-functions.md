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

# Объекты в функциях

```ts
type Props = {
	name: string;
	age: number
};

function SomeFunction({ name, age }: Props) {
	return `Your are ${age} age, wow! Congratulations, ${name}`;
};

const data: Props = {
	name: "FOCKUSTY",
	age: 15
};

console.log(SomeFunction({ name: "FOCKUSTY", age: 15 }));
console.log(SomeFunction(data));
// Итак, я точно не знаю, как это называется, но я называю это разворачиванием объекта в аргументы функции. Фактически мы принимаем объект и сразу его разбиваем на аргументы.
// Такое точно используется в фреймворке React и других, также это является полезным, когда аргументы функции превышают двух.
```
