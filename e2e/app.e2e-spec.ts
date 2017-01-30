import { GoodmovesFrontendPage } from './app.po';

describe('goodmoves-frontend App', function() {
  let page: GoodmovesFrontendPage;

  beforeEach(() => {
    page = new GoodmovesFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
