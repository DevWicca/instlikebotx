const puppeteer = require('puppeteer');

(async () => {
    let id = ''
    let password = ''
    let hashtag = 'japan'
    let likenum = 0
    let speed = 3000
    let headless = false


    const browser = await puppeteer.launch({
        headless
        
    });
    const page = await browser.newPage();
    await page.setViewport({
    width: 1800,
    height: 1000
});

  // Open page.
  //   await page.goto('https://tutorialzine.com');

    await page.goto('https://www.instagram.com/accounts/login');
    
    await page.waitFor(speed)
    await page.type("[type=\"text\"]",id, {delay: 100}); // id here
    await page.type("[type=\"password\"]",password, {delay: 100});// password here  
    const loginForm = await page.$('.HmktE'); 
    await loginForm.press('Enter')
    await page.waitFor(speed)
    console.log("login ")
    if (!headless) {
        console.log('headless', headless)
        const Notifications = await page.$('.HoLwm');
        await page.waitFor(speed)
        await Notifications.click()
    }
    await page.goto(`https://www.instagram.com/explore/tags/${hashtag}/`);
    const post = await page.$('._9AhH0');
    await page.waitFor(speed)
    // console.log(post, "this is posts")
    await post.click()
    await page.waitFor(speed)
    const arrow = await page.$('.coreSpriteRightPaginationArrow')
    let i = 0
    console.log("start like")
    do { 
        console.log("you like "+ i)
        await page.$eval("[aria-label=\"Like\"]",el => el.click())
        await arrow.click()
        await page.waitFor(speed)
        i++
    } while (i < likenum);
    console.log("donnnnnnnnnnnnnnnnnnnnnnnnnne")
    /// all done 
    if (headless) browser.close();
})();