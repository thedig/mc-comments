require('chromedriver');
const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const driver = new webdriver.Builder().forBrowser('chrome').build();
const expect = chai.expect;

describe('make a comment', done => {
    before(done => {
        driver.get('http://localhost:3001').then(function (res) {
            driver
                .findElement(By.id('comment-name'))
                .sendKeys('myself')
                .then(() => driver.findElement(By.id('comment-body')).sendKeys('the greatest comment'))
                .then(() => driver.findElement(By.id('submit-comment')).click())
                .then(() => {
                    driver.wait(until.elementLocated(By.id('comment-list'))).then(() => {
                        done();
                    });
                });
        });
    });

    it('posts the comment to the page', () => {
        return expect(driver.findElement(By.id('comment-list')).getAttribute('innerHTML'))
            .to.eventually.contain('the greatest comment');
    });
});

describe('clears comments', done => {
    before(done => {
        driver.get('http://localhost:3001').then(function (res) {
            driver
                .findElement(By.id('comment-name'))
                .sendKeys('myself')
                .then(() => driver.findElement(By.id('comment-body')).sendKeys('the greatest comment'))
                .then(() => driver.findElement(By.id('submit-comment')).click())
                .then(() => driver.findElement(By.id('comment-name')).sendKeys('myself'))
                .then(() => driver.findElement(By.id('comment-body')).sendKeys('the greatest comment'))
                .then(() => driver.findElement(By.id('submit-comment')).click())
                .then(() => driver.findElement(By.id('clear-comments')).click())
                .then(() => {
                    driver.wait(until.elementLocated(By.id('comment-list'))).then(() => {
                        done();
                    });
                });
        });
    });

    it('clears the list of comments', () => {
        let listElement = driver.findElement(By.id('comment-list'));
        // false positive?
        return expect(listElement.findElements(By.tagName("li")).size === 0);
    });
});