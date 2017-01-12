/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* Test to make sure that the allFeeds variable has been
         * defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL is not empty.
         */
        it('url defined', function() {
            //'feed' is equivalent to 'allFeeds[i]' in a for loop
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        /* Test that loops through each feed in the allFeeds
         * object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined', function() {
            allFeeds.forEach(function(feed) {
                //toBeTruthy() covers both tests
                expect(feed.name).toBeTruthy();
            });
        });
    });


    /* Wrote a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('ensure menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('ensure menu changes visibility', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /* Wrote a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        //when testing an asyncronous function your 'expect' may get called before the functions completed.
        //you can use before each and run the initial function as 'done' to make sure its completed.
        //then you can ask your 'it' request.
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        //we add done here to the function and then call it so the tester knows this
        //is the async function we're testing
        it('.feed should contain at least one .entry element', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
    /* Wrote a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var initialFeed,
            nextFeed;
        beforeEach(function(done) {
            //loadFeed is like ordering the pizza
            loadFeed(0, function() {
                //initial values are like putting pizza on the plates...don't put them after done() function
                initialFeed = $('.feed').html();
                console.log(initialFeed);

                loadFeed(1, function() {
                    nextFeed = $('.feed').html();
                    console.log(nextFeed);
                    //done is like telling everyone dinner is served
                    done();
                });
            });
        });

        it('ensure feed content changes', function() {
            expect(nextFeed).not.toBe(initialFeed);
        });
    });

}());