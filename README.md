# @zestia/ember-twitter-entities

<p>
  <!--
  <a href="https://github.com/zestia/ember-twitter-entities/actions/workflows/ci.yml">
    <img src="https://github.com/zestia/ember-twitter-entities/actions/workflows/ci.yml/badge.svg">
  </a>
  -->

  <a href="https://david-dm.org/zestia/ember-twitter-entities#badge-embed">
    <img src="https://david-dm.org/zestia/ember-twitter-entities.svg">
  </a>

  <a href="https://david-dm.org/zestia/ember-twitter-entities#dev-badge-embed">
    <img src="https://david-dm.org/zestia/ember-twitter-entities/dev-status.svg">
  </a>

  <a href="https://emberobserver.com/addons/@zestia/ember-twitter-entities">
    <img src="https://emberobserver.com/badges/-zestia-ember-twitter-entities.svg">
  </a>

  <img src="https://img.shields.io/badge/Ember-%3E%3D%203.16-brightgreen">
</p>

This Ember CLI addon parses [Twitter Entities](https://dev.twitter.com/overview/api/entities-in-twitter-objects) from the Twitter API and renders a them as Ember Components.

## Installation

```
ember install @zestia/ember-twitter-entities
```

## Demo

https://zestia.github.io/ember-twitter-entities/

## Notes

- Supported entity types are: `hashtags`, `media`, `urls`, `user_mentions`, `symbols`. Basically any entity which has an `indices` property and occurs in the tweet text. So this excludes `polls`.

- This addon requires the [Babel Polyfill](https://github.com/babel/ember-cli-babel#polyfill) to correctly handle emojis.

## Example

Given the following:

```javascript
entities: {
  urls: [{
    url: 'https://t.co/emberjs',
    display_url: 'emberjs.com',
    indices: [6, 17]
  }],
  hashtags: [],
  user_mentions: [],
  media: [],
  symbols: []
}
```

```handlebars
<TwitterEntities
  @text="visit emberjs.com"
  @entities={{this.entities}}
/>
```

The addon will render:

```html
visit <a href="http://t.co/emberjs">emberjs.com</a>
```

...using the built in components for each entity type.

## Customising

You can customise what components are used to render each type of entity:

```handlebars
<TwitterEntities
  @text={{this.tweet}}
  @entities={{this.entities}}
  @Url={{component "hyperlink" target="_blank"}}
  @Hashtag={{component "hash-tag"}}
  @UserMention={{component "user-mention"}}
  @Media={{component "gallery/image"}}
  @Symbol={{component "stock"}}
/>
```

## HTML in tweets

If the tweet you are rendering is already encoded, flag it as html-safe to prevent double encoding.

```javascript
const tweet = 'This tweet contains &lt;br&gt; HTML';
this.text = htmlSafe(tweet);
```

```handlebars
<TwitterEntities @text={{this.text}} />
```

```
Outputs:    This tweet contains <br> HTML
Instead of: This tweet contains &lt;br&gt; HTML
```
