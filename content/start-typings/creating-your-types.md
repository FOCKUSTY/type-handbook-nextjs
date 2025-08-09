# Создания своих типов

Чтобы создать свой тип, мы можем использовать следующие ключевые слова: `type` и `interface`, также можем использовать абстрактные классы (`abstact class`), но если быть честным, то я сам немного не понимаю, как они работают.

## Отличия

На самом деле эти два метода создания типа довольно похожи, однако имеют свои различия. Например:
```ts
interface Foo {...};
type Bar = {...};
```
Заметили, да? Чтобы создать тип через `type` нам нужно использовать знак `=`, а при `interface` такого не наблюдается. Скоро поймете почему так.
```ts
interface Foo {
	name: string
	age: number
};

interface Foo {
	address: string
}

const foo: Foo = {
	name: "FOCKUSTY",
	age: 15,
	address: "Улица Пушкина дом Колотушкина"
};
```
Возможно Вы и не поняли, так что я поясню: `interface` можно спокойно расширять, просто дописывая `interface {name}` и объявляя его заново. Через `type` такого сделать не получится.
```ts
interface Foo {
	[key: number]: string
};

type Foo2 = string[];
```
Что ж, вот так вот объявляются массивы с помощью двух разных методов. Рекомендую использовать `type` для объявления типа массива, потому что через `interface` код получится совсем не читаемым.
```ts
type Foo = string | number;

const foo1: Foo = 1;
const foo2: Foo = "some string";

type Bar = { name: string } & { age: number }; // { name: string, age: number }
const bar: Bar = {
	name: "FOCKUSTY",
	age: 15
};

type FooBar = { name: string } | { age: number };
const fooBar1: FooBar = {
	name: "FOCKUSTY"
};

const fooBar2: FooBar = {
	age: 15
};

const fooBar3: FooBar = {
	name: "FOCKUSTY",
	age: 15
};
/*
Нормально, потому что оператор ИЛИ также позволяет совмещать значения, то есть в нём сочитается также оператор И.
*/
```
Итак, пересечения и объединения доступны только если Вы будете использовать `type`. Ничего сложного.
## Наследование

```ts
// Типы
type Foo = {
	name: string
};

type Bar = Foo & {
	age: number
};

const foo: Foo = {
	name: "FOCKUSTY"
};
const bar: Bar = {
	name: "FOCKUSTY",
	age: 15
};
const errorFoo: Foo = {
	name: "FOCKUSTY",
	age: 15
}; // Object literal may only specify known properties, and 'age' does not exist in type 'Foo'



// Интерфейсы
interface IFoo {
	name: string
};

interface IBar extends IFoo {
	age: number
};

const foo: Foo = {
	name: "FOCKUSTY"
};
const bar: Bar = {
	name: "FOCKUSTY",
	age: 15
};
const errorFoo: Foo = {
	name: "FOCKUSTY",
	age: 15
}; // Object literal may only specify known properties, and 'age' does not exist in type 'Foo'
```
Итак, в `interface` наследование происходит только через `extends`, а в `type` только через `&`. К слову, можно наследовать `type` в `interface` и `interface` в `type`.
## "Утверждение" типов (Type Assertions)

```ts
const foo = document.getElementById("foo") as HTMLElement;
// (type) foo - HTMLElement;

const bar = <HTMLCanvasElement>document.getElementById("bar");
// (type) bar - HTMLElement
```
```ts
const foo = "string" as number;
// Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
const bar = "string" as unknown as number; // ok
```
## Строковые типы (литерал)

```ts
const someString = "someString";
// (type) someString - string

const otherString = "otherString" as const;
// (type) otherString - "otherString"
```
Тут мы "создаём" тип литерала, то есть говоря, что эта переменная может иметь можем иметь только данный строковой литерал.
```ts
type SomeStrings = 
	| "SomeString"
	| "OtherString"
	| "MyString"

const str1: SomeStrings = "SomeString";
const str2: SomeStrings = "OtherString";
const str3: SomeStrings = "MyString";

const str4: SomeStrings = "NewString";
// Type '"NewString"' is not assignable to type 'SomeStrings'.
```
## Дженерики (начало)

[см. Дженерики](./Дженерики%20(Generics).md).

## Работа с объектами

Здесь мы будем подробно разбирать, как работать с объектами в типах.
```ts
type AllKeysInObject<T extends {[key: string]: unknown}> = keyof T;

const MEMBERS = {
	FOCKUSTY: "ceo",
	"Valentin Bird": "teamlead",
	Adelya: "manager",
	beyz1k: "promoter",
	Omonillo: "promoter"
} as const;

type Members = AllKeysInObject<typeof MEMBERS>;
// type Members - "FOCKUSTY"|"Valentin Bird"|"Adelya"|"beyz1k"|"Omonillo"
```
Окей, `keyof` сам за себя говорит, что он принимает все ключи объекта, думаю, что тут нечего говорить. `typeof`, если Вы не видели, просто определяет тип переменной, а `as const` говорит, что данная переменная не можем измениться.
```ts
// type MEMBERS
const MEMBERS: {  
	readonly FOCKUSTY: "ceo";  
	readonly "Valentin Bird": "teamlead";  
	readonly Adelya: "manager";  
	readonly beyz1k: "promoter";  
	readonly Omonillo: "promoter";  
};
```