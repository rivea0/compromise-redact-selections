# compromise-redact-selections

> Extend the selections of the `redact` method from [`compromise/three`](https://compromise.cool/three/redact)

### Why?

[`compromise`](https://github.com/spencermountain/compromise) is a simple and handy natural language processing package that includes functionality to redact parts of text.

By default, [`redact`](https://github.com/spencermountain/compromise/blob/master/src/3-three/redact/plugin.js) only hides identifiable information (`people`, `emails`, `phoneNumbers` and `places`). 
This is the `defaults` option:

```js
const defaults = {
  people: true,
  emails: true,
  phoneNumbers: true,
  places: true,
}
```

While the purpose of `redact` is clear, there are other handy selections available in the package like `honorifics` (such as "Dr."), `atMentions` (such as "@you"). `plugin-modified.js` modifies the `redact` function so you can easily redact selections like those.

For example, with normal usage, this won't work:

```js
const doc = nlp('you should know @coolCucumber').redact({ atMentions: true });

doc.text();
// -> you should know @coolCucumber
```

With `plugin-modify.js`:

```js
const doc = nlp('you should know @coolCucumber').redact({ atMentions: true });

doc.text();
// -> you should know ██████████
```

### Setting up

Inside the root directory of your project that has `compromise` as a dependency, navigate to `node_modules/compromise/src/3-three/redact/plugin.js` and replace it with `plugin-modified.js`.

#### From the command line

Clone the repository:

```
git clone git@github.com:rivea0/compromise-redact-selections.git
```

`cd` into it:

```
cd compromise-redact-selections
```

Run the `modify-redact` script, providing it the path to the root directory of your project that has `compromise` as a dependency:

```
./modify-redact.sh <path-to-your-project>
```

> [!NOTE]  
> Path string shouldn't have a trailing slash.

### Selections

Available selections are:

- `abbreviations`
- `acronyms`
- `adjectives`
- `adverbs`
- `atMentions`
- `conjunctions`
- `contractions`
- `emails`
- `emoji`
- `emoticons`
- `fractions`
- `hashTags`
- `honorifics`
- `hyphenated`
- `money`
- `nouns`
- `numbers`
- `organizations`
- `people`
- `percentages`
- `phoneNumbers`
- `places`
- `possessives`
- `prepositions`
- `pronouns`
- `questions`
- `sentences`
- `terms`
- `topics`
- `urls`
- `verbs`

### Using only the defaults

The usage is the same as the original if you want to use `redact` without modification:

```js
const doc = nlp(
  "Another England there I saw\nAnother London with its Tower",
).redact();

doc.text();
// Another ██████████ there I saw
// Another ██████████ with its Tower
```

If you want to opt out of some of the defaults, it's also the same usage:

```js
const doc = nlp(
  "Another England there I saw\nAnother London with its Tower",
).redact({ places: false });

doc.text();
// Another England there I saw
// Another London with its Tower
```

### A note about `sentences` and `terms`

There isn't any point in redacting the whole document, but if you ever want to do it using `compromise`, there are two simple options that this modified version offers: `sentences` and `terms`.

Using `sentences`:

```js
const text = 'Folly is an endless maze,\nTangled roots perplex her ways.';

const doc = nlp(text).redact({ sentences: true });

doc.text();
// -> ██████████, ██████████.
```

Using `terms`:

```js
const text = 'Folly is an endless maze,\nTangled roots perplex her ways.';

const doc = nlp(text).redact({ terms: true });

doc.text();
// -> ██████████ ██████████ ██████████ ██████████ ██████████, ██████████ ██████████ ██████████ ██████████ ██████████.
```

### Test
`test.js` can be run in the root directory of your project that depends on `compromise`.
It uses Node.js' [built-in test runner](https://nodejs.org/docs/latest-v20.x/api/test.html) which became [stable in version 20](https://nodejs.org/en/blog/announcements/v20-release-announce#stable-test-runner).

### License
MIT
