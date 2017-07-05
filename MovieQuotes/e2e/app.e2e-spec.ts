import { MovieQuotesPage } from './app.po';

describe('movie-quotes App', () => {
  let page: MovieQuotesPage;

  beforeEach(() => {
    page = new MovieQuotesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
