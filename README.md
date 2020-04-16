# Stats for English Premier League 2018/19 Season

A NodeJS + Typescript project to read, parse, analyse and make a report off a csv file of the English Premier League 2018/19 football (soccer) season.

Not sure yet if the report will be presented on a UI but we'll find out.

## First method - The Not So Good Approach

A naive approach is first employed and we consoled the number of matches (both
**Home** and **Away**) won by Chelsea FC in the season.

Here's a screenshot of the result:

![Number of matches won by Chelsea FC](https://res.cloudinary.com/waheedafolabi/image/upload/v1585664376/My%20Ps/chelseaNumberOfWins.png).

The very first commit of code does it well...bad though!

### A quick fix

```ts
...
if (match[1] === 'Chelsea' && match[5] === 'H') {
  checlseaWins += 1;
} else if (match[2] === 'Chelsea' && match[5] === 'A') {
  checlseaWins += 1;
}
...
```

The above lines of code would be hard for any other engineer to understand if they need to work in this project. Even we, ourselves, could forget what it really is after a while.
Unless, of course, we opened up the `csv` file to peek at what `H` and `A` stand for.

We could improve on this by making a clear declaration of what those means by adding:

```ts
const homeWin = 'H';
const awayWin = 'A';
```

This immediately informs of what comparison we are making and increase our understanding and helps others understand what we are doing as well. Clean.

We could even specify the possible third case of a draw...

```ts
...
const draw = 'D';
...
```

But we won't be using it anywhere in our code.

If we are not using it, why keep it? This is what would pop in the mind of some that comes later to the code base and most probably delete it.

This method is a bit worrying so we'll need to dig deeper for a much better one.

### Yet another improvement

So to avoid lost of data context, we employ the use of `enum` in Typescript.

`enum` is an _enumeration_. It's much close to objects in Javascript but it's a closely related dataset.

```ts
...
enum MatchResults {
  HomeWin = 'H',
  AwayWin = 'A',
  Draw = 'D'
}
...
```

For a match result there could only be three (3) outcomes - `win`, `lose` or `draw`. Or in our case, in terms of teams, there could be an `Home win`, `Away win` or a `Draw`.

This helps us prevent lost of data context which is a much better improvement.

## Second Method - A Better Approach

If we look at the status of our `index.ts` file closely, we'll notice our `csv` file is hardcoded and the method of reading from the file as well.

If we decide to get the data from within the `csv` file from an external source, say an API, we may have to delete about half of our hard-labored written code.

A quick solution to this is to extract the logic for reading the file into its own class say `CSVFIleReader` and then allow it to take any `csv` file.

Something in the line:

```ts
...
const reader = new CsvFileReader('epl_2018_19.csv');
...
```

and create it with some method, `read()` for reading into the `csv` file and then populating a some `data` variable for consumption.

```ts
...
const reader = new CsvFileReader('epl_2018_19.csv');
reader.read();
...
```

That's what this section of the commit does.

With this improvement, if we decide to use an external data, we could only comment out/delete just `2 lines of code` to implement an external query.

### A Look into our parsed data

When we look at the format of our data we'd notice that we have different data sets which currently we're parsing all as string.

`18/08/2018,Chelsea,Arsenal,3,2,H,M Atkinson`

The structure is as above. The first data is a `Date`, next 2 data sets are `strings` while the next two are `integers` and the next one is of type `MatchResult` that could either be `H`, `A` or `D` and the last data type is a `string`.

We should be able to parse these data sets (types) as they are for easy use and future relief against much work. Essense of a well designed software: solve users problem now and always with minimal work for extension.

So, we want a data set that's well represented. `Tuple` is the best data type we can employ in this scenario.

We can thus have something in the line:

```ts
const MatchData = [
  Date,
  string,
  string,
  number,
  number,
  Matchresult,
  string
]

```

Let's figure this out in this commit and make a `utility function` to help with date parsing.

With these refactor our `index.ts` file becomes more relieved and rasy to understand while we have been able to share responsibility across different departments in our project.

### CsvFileReader is No Longer Reusable

Did you notice that?

The `CsvFileReader` is no longer **reusable** at this stage with the present implementation. The current implementation assumes we know, before hand, the sstructure of the data we are reading (parsing) which makes it not so reusable but too custom to the situation at hand.

What if we have a file of movies?

The newly implemented `MatchData` _will not_ work for such a case...no match wins, home and away teams. Lol!

```ts
...
.map((row: string[]): MatchData => {
  return [
    dateStringToDate(row[0]),
    row[1],
    row[2],
    parseInt(row[3]),
    parseInt(row[4]),
    row[5] as MatchResults,
    row[6]
  ]
})
...
```

So, there's another problem that needs to be looked into.

### A way out

What we could do is to make `CsvFileReader` into an **abstract class** with a method `mapRow()` that implements the last customization. The actual implementation could then be extracted into isolation so that it's sole responsibility is to be aware of the structure of the data to be parsed.

This means `CsvFileReader` will not need to worry about that part of the implementation again! Ooops! Better. Think we are getting somewhere.

Let's work on that.

```ts
...
type MatchData = [
  Date,
  string,
  string,
  number,
  number,
  MatchResults,
  string
]

export abstract class CsvFileReader {
  data: MatchData[] = [];

  constructor(public filename: string) {}

  abstract mapRow(row: string[]): MatchData;

  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: 'utf-8',
      })
      .split('\n')
      .map((row: string): string[] => {
        return row.split(',');
      })
      .map(this.mapRow);
  }
}

```

After the modification and extract of the `mapRow` method into its own class that extends the abstract `CsvFileReader`, we've done a great deal of work and could stay at this...

### But, there's another problem

If you take a close look at the abstract `CsvFileReader` you will notice the type annotation of data is `MatchData[]` which makes the class not so reusable.

Why?

If we want to, say, read a data of Movies for instance, you'd agree the `tuple` `MatchData` will not be a match for the data set. The structure of the data will definitely be different.

This makes it a big need for us to look for a way to represent data type with a type in Typescript called `Generics`.

We need to implement this to make `CsvFileReader` really **REUSABLE**.

Let's get to work.

### After using Generics

Now we have a fully **reusable** `CsvFileReader` class.

So, when making any form of `Reader` like `MatchReader` in this scenario...we need then provide the kind of data context we intend to pass into `CsvFileReader` when extending it in such `Reader`.

`CsvFileReader` class now holds the status below 👇👇👇

```ts
import fs from 'fs';

export abstract class CsvFileReader<T> {
  data: T[] = [];

  constructor(public filename: string) {}

  abstract mapRow(row: string[]): T;

  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: 'utf-8',
      })
      .split('\n')
      .map((row: string): string[] => {
        return row.split(',');
      })
      .map(this.mapRow);
  }
}

```

The whole of the abstract method is using **Inheritance**.

## Just another approach - Interface Based (Composition)

The `CsvFileReader.ts` and `MatchReader.ts` has been moved into a new directory named `inheritance` - why not? That's the name of the approach used.

We want to journey into yet another approach. It involves using `interfaces`. An approach called **Composition** as opposed to **Inheritance**. There's no time to get into the debate, we just want to learn to see for ourselves which is better in _this_ our scenario.

Our earlier `CsvFileReader` that was made a backup (`.bak`) file is going to be our starting point for this refactor.

After a quick little refactor of `CsvFileReader.ts` (the old .bak file), we got this generic _reusable_ `CsvFileReader` that neither has nothing to do with the file we are reading from nor all of its conversion.

```ts
import fs from 'fs';

export class CsvFileReader {
  data: string[][] = [];

  constructor(public filename: string) {}

  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: 'utf-8',
      })
      .split('\n')
      .map((row: string): string[] => {
        return row.split(',');
      })
  }
}

```

Now we have a `MatchReader` that expects its argument to satisfy an interface, `DataReader`, which in this case is a `CsvFileReader` and could be any other type of reader say `APIReader`. It only need satisfy the inerface `DataReader` for it to work with the `MatchReader`.

This is **Object Composition**.

The `MatchReader` now looks...

```ts
...
interface DataReader {
  read(): void;
  data: string[][];
}

export class MatchReader {
  matches: MatchData[] = [];

  constructor(public reader: DataReader) {}

  load(): void {
    this.reader.read();
    this.matches = this.reader.data.map((row: string[]): MatchData => {
      return [
        dateStringToDate(row[0]),
        row[1],
        row[2],
        parseInt(row[3]),
        parseInt(row[4]),
        row[5] as MatchResults,
        row[6],
      ];
    })
  }
}

```

And now we simply do the following in `index.ts` to get to use our data again:

```ts
...
// Create an object that satisfies the DataReader interface
const csvFileReader = new CsvFileReader('epl_2018_19.csv');

// Create an instance of MatchReader and pass in something satisfying
// the DataReader interface
const matchReader = new MatchReader(csvFileReader);

// Call the load method to populate the matches property of the reader
matchReader.load();
...
```

We've done a great deal of refactor and now we still have some problem on our hands.

Our analysis is static. Can only read **Chelsea FC** win records...may be because I am a Chelsea fan 😎. But honestly, if we need get data for other clubs, we'll need repeat the lines in the `index.ts` several times to achieve this and we may need deleting some when our file gets cluttered that it may now be too clumsy to manage.

So, we are going to employ **Object Composition** to achieve our aim.

After adding analyzers and outputTargets as delegates for summary to delegate function to, we have been able to fully implement **Object Composition**.

The `index.ts` file now add the following lines of code:

```ts
...

const summary = new Summary(
  new WinsAnalysis('Chelsea'),
  new HTMLReport('analysisReport.html')
);

summary.buildAndPrintReport(matchReader.matches);

```

Well. This is a better implementation and of course a scalable implementation that could add more analyses and output targets.

### One more gotcha

With the current way of instantiation, we could implement **static** methods that could help conceal the hassles of having to create an instatiation each time and then calling on needed methods.

The following snippet is added to `Summary.ts` to enable generating an HTML report with having to use the `new` keyword and direct call of the method without instatiation.

```ts
...
static winsAnalysisWithHtmlReport(team: string): Summary {
  return new Summary(
    new WinsAnalysis(team),
    new HTMLReport('analysisReport.html'),
  );
}
...
```

and this for `Console` report:

```ts
...
static winsAnalysisWithConsoleReport(team: string): Summary {
  return new Summary(
    new WinsAnalysis(team),
    new ConsoleReport()
  )
}
...
```

This is going to make a whole lot of improvement on our `index.ts` file as you'd see in a sec.

And our `MatchReader` adds this static method as well:

```ts
...
static fromSource(fileName: string): MatchReader {
  return new MatchReader(new CsvFileReader(fileName));
}
...
```

So, our new `index.ts` looks:

```ts
import { MatchReader } from './MatchReader';
import { Summary } from './Summary';

const matchReader = MatchReader.fromSource('epl_2018_19.csv');
const summary = Summary.winsAnalysisWithConsoleReport('Arsenal');
// const summary = Summary.winsAnalysisWithHtmlReport('Man United');

// Call the load method to populate the matches property of the reader
matchReader.load();
summary.buildAndPrintReport(matchReader.matches);

```

Pretty. Right?

Well...thanks for coming along on this journey. It's been a great learning journey. Learning some cool stuff using **Typescript** - **Inheritance**, **abstract classes**, **interfaces**, **Composition** and some other **OOP** practices, even though they seem subtle in implementation.

## Credits

This is a great journey with [Stephen Grider](https://github.com/StephenGrider) a great teacher. You can tweet at him [here](https://twitter.com/ste_grider?lang=en). This is my understanding of this part of the training on Typescript.
