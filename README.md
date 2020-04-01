# Stats for English Premier League 2018/19 Season

A NodeJS + Typescript project to read, parse, analyse and make a report of a csv file of the EPL 2018/19 football (soccer) season.

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
