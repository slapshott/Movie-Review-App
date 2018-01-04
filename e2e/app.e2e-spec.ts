import { Angular2MovieReviewTestPage } from './app.po';

describe('angular2-movie-review-test App', function() {
  let page: Angular2MovieReviewTestPage;

  beforeEach(() => {
    page = new Angular2MovieReviewTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
