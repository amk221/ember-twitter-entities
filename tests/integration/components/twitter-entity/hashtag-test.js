import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('twitter-entity/hashtag', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    this.hashtagEntity = {
      text: 'foo'
    };

    await render(
      hbs`<TwitterEntity::Hashtag @entity={{this.hashtagEntity}} />`
    );

    assert.equal(
      this.element.innerHTML,
      '<a href="https://twitter.com/search?q=%23foo">#foo</a>'
    );
  });
});
