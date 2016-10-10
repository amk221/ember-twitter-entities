import Ember from 'ember';
import Component from 'ember-component';
import layout from '../templates/components/twitter-entities';
import { htmlSafe } from 'ember-string';

const { keys } = Object;
const { compare, getWithDefault } = Ember;
const { slice } = window.unicodeStringUtils;

export default Component.extend({
  layout: layout,

  init() {
    this._super(...arguments);

    let text     = this.getAttr('text');
    let entities = this.getAttr('entities');
    let parts    = [];

    parts = this._entitiesToArray(entities);
    parts = this._textToArray(text, parts);

    if (this._isHTMLSafe(text)) {
      parts = this._makeSafe(parts);
    }

    this.set('parts', parts);
  },

  _entitiesToArray(entities = {}) {
    let parts = [];

    keys(entities).forEach((key) => {
      let typeEntities = getWithDefault(entities, key, []);

      typeEntities.forEach((entity) => {
        let component = this._componentForType(key);
        parts.push({ component, entity });
      });
    });

    parts.sort((a, b) => {
      return compare(a.entity.indices[0], b.entity.indices[0]);
    });

    return parts;
  },

  _textToArray(tweet = '', entityParts = []) {
    let text  = '';
    let parts = [];
    let index = 0;

    tweet = tweet.toString();

    entityParts.forEach((part) => {
      let [start, end] = part.entity.indices;
      text = slice(tweet, index, start);

      if (text) { parts.push({ text }); }

      parts.push(part);
      index = end;
    });

    text = slice(tweet, index);
    if (text) { parts.push({ text }); }

    return parts;
  },

  _makeSafe(parts) {
    return parts.map(part => {
      if (part.text) {
        part.text = htmlSafe(part.text);
      }
      return part;
    });
  },

  _isHTMLSafe(string) {
    return string && typeof string.toHTML === 'function';
  },

  _componentForType(type) {
    let types = {
      urls: 'url',
      hashtags: 'hashtag',
      user_mentions: 'user-mention',
      media: 'media'
    };

    let name = types[type];

    return this.getAttr(`${name}-component`) || `twitter-entity/${name}`;
  }
});
