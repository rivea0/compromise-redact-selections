/**
 * This test file can be run in the root directory of your project that depends on compromise.
 *
 * Uses Node.js' built-in test runner.
 * https://nodejs.org/en/learn/test-runner/introduction
 */

import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';
import nlp from 'compromise';

describe('plugin-modify.js', () => {
  let doc;

  it('should work as default for places', () => {
    doc = nlp(
      'Another England there I saw\nAnother London with its Tower'
    ).redact();
    assert.deepStrictEqual(
      doc.text(),
      'Another ██████████ there I saw\nAnother ██████████ with its Tower'
    );
  });

  it('should work as default for people', () => {
    doc = nlp('Hey there, Ray Gebstadter!').redact();
    assert.deepStrictEqual(doc.text(), 'Hey there, ██████████!');
  });

  it('should work as default for emails', () => {
    doc = nlp('example@whatisit.com').redact();
    assert.deepStrictEqual(doc.text(), '██████████');
  });

  it('should work as default for phone numbers', () => {
    doc = nlp("That's right. I'm a surgeon. (800) 555-0000.").redact();
    assert.deepStrictEqual(
      doc.text(),
      "That's right. I'm a surgeon. ██████████."
    );
  });

  it('should work as default when opting out of places', () => {
    doc = nlp(
      'Another England there I saw\nAnother London with its Tower'
    ).redact({ places: false });
    assert.deepStrictEqual(
      doc.text(),
      'Another England there I saw\nAnother London with its Tower'
    );
  });

  it('should work as default when opting out of people', () => {
    doc = nlp('Hey there, Ray Gebstadter!').redact({ people: false });
    assert.deepStrictEqual(doc.text(), 'Hey there, Ray Gebstadter!');
  });

  it('should work as default when opting out of emails', () => {
    doc = nlp('example@whatisit.com').redact({ emails: false });
    assert.deepStrictEqual(doc.text(), 'example@whatisit.com');
  });

  it('should work as default when opting out of phone numbers', () => {
    doc = nlp("That's right. I'm a surgeon. (800) 555-0000.").redact({
      phoneNumbers: false,
    });
    assert.deepStrictEqual(
      doc.text(),
      "That's right. I'm a surgeon. (800) 555-0000."
    );
  });

  it('should hide abbreviations', () => {
    doc = nlp('Thank you, Mr. Gebstadter').redact({
      abbreviations: true,
      people: false,
    });
    assert.deepStrictEqual(doc.text(), 'Thank you, ██████████. Gebstadter');
  });

  it('should hide acronyms', () => {
    doc = nlp('Even the FBI says so').redact({ acronyms: true });
    assert.deepStrictEqual(doc.text(), 'Even the ██████████ says so');
  });

  it('should hide adjectives', () => {
    doc = nlp('colorless green ideas sleep furiously').redact({
      adjectives: true,
    });
    assert.deepStrictEqual(
      doc.text(),
      '██████████ ██████████ ideas sleep furiously'
    );
  });

  it('should hide adverbs', () => {
    doc = nlp('colorless green ideas sleep furiously').redact({
      adverbs: true,
    });
    assert.deepStrictEqual(
      doc.text(),
      'colorless green ideas sleep ██████████'
    );
  });

  it('should hide atMentions', () => {
    doc = nlp('Thank you, @coolCucumber').redact({ atMentions: true });
    assert.deepStrictEqual(doc.text(), 'Thank you, ██████████');
  });

  it('should hide conjunctions', () => {
    doc = nlp('fall and winter and spring and summer').redact({
      conjunctions: true,
    });
    assert.deepStrictEqual(
      doc.text(),
      'fall ██████████ winter ██████████ spring ██████████ summer'
    );
  });

  it('should hide contractions', () => {
    doc = nlp("I didn't know").redact({ contractions: true });
    assert.deepStrictEqual(doc.text(), 'I ██████████ know');
  });

  it('should hide emojis', () => {
    doc = nlp('Yet another AI magic ✨').redact({ emoji: true });
    assert.deepStrictEqual(doc.text(), 'Yet another AI magic ██████████');
  });

  it('should hide emoticons', () => {
    doc = nlp('yeah, sure :) absolutely').redact({ emoticons: true });
    assert.deepStrictEqual(doc.text(), 'yeah, sure ██████████ absolutely');
  });

  it('should hide fractions', () => {
    doc = nlp('1/3rd of the Earth').redact({ fractions: true });
    assert.deepStrictEqual(doc.text(), '██████████ of the Earth');
  });

  it('should hide hashTags', () => {
    doc = nlp('the machine that is the new #divine').redact({ hashTags: true });
    assert.deepStrictEqual(
      doc.text(),
      'the machine that is the new ██████████'
    );
  });

  it('should hide honorifics', () => {
    doc = nlp('This is Dr. Felton').redact({ honorifics: true, people: false });
    assert.deepStrictEqual(doc.text(), 'This is ██████████. Felton');
  });

  it('should hide hyphenated', () => {
    doc = nlp('super-cool').redact({ hyphenated: true });
    assert.deepStrictEqual(doc.text(), '██████████');
  });

  it('should hide money', () => {
    doc = nlp('$4.09CAD').redact({ money: true });
    assert.deepStrictEqual(doc.text(), '██████████');
  });

  it('should hide nouns', () => {
    doc = nlp('This is the table').redact({ nouns: true });
    assert.deepStrictEqual(doc.text(), 'This is ██████████');
  });

  it('should hide numbers', () => {
    doc = nlp('one two 3 four').redact({ numbers: true });
    assert.deepStrictEqual(
      doc.text(),
      '██████████ ██████████ ██████████ ██████████'
    );
  });

  it('should hide organizations', () => {
    doc = nlp('Google, Inc').redact({ organizations: true });
    assert.deepStrictEqual(doc.text(), '██████████');
  });

  it('should hide percentages', () => {
    doc = nlp('like 99% right?').redact({ percentages: true });
    assert.deepStrictEqual(doc.text(), 'like ██████████ right?');
  });

  it('should hide possessives', () => {
    doc = nlp("I'm not going to take his crown, or anyone's").redact({
      possessives: true,
    });
    assert.deepStrictEqual(
      doc.text(),
      "I'm not going to take ██████████ crown, or ██████████"
    );
  });

  it('should hide prepositions', () => {
    doc = nlp('ace of spades').redact({ prepositions: true });
    assert.deepStrictEqual(doc.text(), 'ace ██████████ spades');
  });

  it('should hide pronouns', () => {
    doc = nlp('he, she, it, they, and many more').redact({ pronouns: true });
    assert.deepStrictEqual(
      doc.text(),
      '██████████, ██████████, ██████████, ██████████, and many more'
    );
  });

  it('should hide questions', () => {
    doc = nlp("I can't hear you\nAre you talking to me?").redact({
      questions: true,
    });
    assert.deepStrictEqual(doc.text(), "I can't hear you\n██████████?");
  });

  it('should hide sentences', () => {
    doc = nlp(
      'Folly is an endless maze,\nTangled roots perplex her ways.'
    ).redact({ sentences: true });
    assert.deepStrictEqual(doc.text(), '██████████, ██████████.');
  });

  it('should hide terms', () => {
    doc = nlp(
      'Folly is an endless maze,\nTangled roots perplex her ways.'
    ).redact({ terms: true });
    assert.deepStrictEqual(
      doc.text(),
      '██████████ ██████████ ██████████ ██████████ ██████████, ██████████ ██████████ ██████████ ██████████ ██████████.'
    );
  });

  it('should hide topics', () => {
    doc = nlp('Google Inc, Alan Turing, London').redact({ topics: true });
    assert.deepStrictEqual(doc.text(), '██████████, ██████████, ██████████');
  });

  it('should hide urls', () => {
    doc = nlp('nodejs.org').redact({ urls: true });
    assert.deepStrictEqual(doc.text(), '██████████');
  });

  it('should hide verbs', () => {
    doc = nlp('Folly is an endless maze').redact({ verbs: true });
    assert.deepStrictEqual(doc.text(), 'Folly ██████████ an endless maze');
  });
});
