const puppeteer = require('puppeteer');

(async () => {
    let id = ''
    let password = ''
    let hashtag = 'japan'
    let likenum = 5
    let speed = 3000
    let headless = false


    const browser = await puppeteer.launch({
        headless
        
    });
    const page = await browser.newPage();
//     await page.setViewport({
//     width: 1800,
//     height: 1000
// });

  // Open page.
    await page.goto('https://www.instagram.com/accounts/login');
    
    // wait for a sec
    await page.waitFor(()=> document.querySelectorAll("input").length)
    await page.type("[type=text]",id, {delay: 50}); // id here
    await page.type("[type=password]",password, {delay: 50});// password here  
    const loginForm = await page.$('.HmktE'); 
    await loginForm.press('Enter')
    console.log("Login ")
    // here if we gonna watch same img and relax
    // if (!headless) {
        //     console.log('headless', headless)
        //     const Notifications = await page.$('.HoLwm');
        //     await page.waitFor(speed)
        //     await Notifications.click()
        // }
    // wait for a sec
    await page.waitFor(()=> document.querySelectorAll("[placeholder=Search]").length)
    // Go to Hashtag
    await page.goto(`https://www.instagram.com/explore/tags/${hashtag}/`);
    // get the first post
    const post = await page.$$('._9AhH0')
    console.log(post.length, "found")
    // open the post 
    await post[0].click()
    await page.waitFor(speed)
    const arrow = await page.$('.coreSpriteRightPaginationArrow')
    let i = 1
    console.log("start like")
    do { 
        console.log("you like "+ i)
        await page.$eval("[aria-label=Like]",el => el.click())
        await arrow.click()
        await page.waitFor(speed)
        i++
    } while (i < likenum);
    console.log("donnnnnnnnnnnnnnnnnnnnnnnnnne")
    /// all done 
    if (headless) browser.close();
})();



