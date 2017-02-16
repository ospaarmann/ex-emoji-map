import { EmojiMapPage } from './app.po';

describe('emoji-map App', function() {
  let page: EmojiMapPage;

  beforeEach(() => {
    page = new EmojiMapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
