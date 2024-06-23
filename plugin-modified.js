const SELECTIONS = [
  'abbreviations',
  'acronyms',
  'adjectives',
  'adverbs',
  'atMentions',
  'conjunctions',
  'contractions',
  'emails',
  'emoji',
  'emoticons',
  'fractions',
  'hashTags',
  'honorifics',
  'hyphenated',
  'money',
  'nouns',
  'numbers',
  'organizations',
  'people',
  'percentages',
  'phoneNumbers',
  'places',
  'possessives',
  'prepositions',
  'pronouns',
  'questions',
  'sentences',
  'terms',
  'topics',
  'urls',
  'verbs',
];

const defaults = {
  people: true,
  emails: true,
  phoneNumbers: true,
  places: true,
};

const redact = function (opts = {}, keepDefaults = true) {
  opts = keepDefaults
    ? Object.assign({}, defaults, opts)
    : Object.assign({}, opts);
  for (const opt of Object.keys(opts)) {
    if (!SELECTIONS.includes(opt)) {
      throw new Error(`Not a valid selection: ${opt}`);
    }
    if (opts[opt] !== false) {
      this[opt]().replaceWith('██████████');
    }
  }

  return this;
};

const plugin = {
  api: function (View) {
    View.prototype.redact = redact;
  },
};
export default plugin;
