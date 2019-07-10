const puppeteer = require('puppeteer');




class instagrambot {
    constructor(){
        this.page =null,
        this.browser= null
    }

    async login (id, password,headless) {
        const a = await puppeteer.launch({
            headless : headless
            
        });
        const x = await a.newPage();
        this.browser = a
        this.page = x 
        await this.page.goto('https://www.instagram.com/accounts/login');
        await this.page.waitFor(()=> document.querySelectorAll("input").length)
        await this.page.type("[type=text]",id, {delay: 50}); // id here
        await this.page.type("[type=password]",password, {delay: 50});// password here  
        const loginForm = await this.page.$('.HmktE'); 
        await loginForm.press('Enter')
        console.log(id + "Did Login ")
        
    }

    async likehashtag (hashtag, likenum,speed) {
        // wait for a sec
        await this.page.waitFor(()=> document.querySelectorAll("[placeholder=Search]").length)
        // Go to Hashtag
        await this.page.goto(`https://www.instagram.com/explore/tags/${hashtag}/`);
        // get the first post
        const post = await this.page.$$('._9AhH0')
        console.log(post.length, "Post Found")
        // open the post 
        await post[0].click()
        await this.page.waitFor(speed)
        const arrow = await this.page.$('.coreSpriteRightPaginationArrow')
        let i = 1
        console.log(id + "Start Like")
        do { 
            console.log(`${id} You Did Like ${i} Times`)
            await this.page.$eval("[aria-label=Like]",el => el.click()).catch( async res =>{
                if (res) await arrow.click().catch( async ndres => {
                    if (ndres) this.browser.Close()
                })
            })
            await arrow.click()
            await this.page.waitFor(speed)
            i++
        } while (i < likenum);
        console.log(`Done ${id} liked ${i} Time `)
        /// all done 
        if (headless) browser.close();
    }
    async Close() {
        this.browser.close();
    }
 }

 


 let id = ''
 let password = '!'
 let hashtag = 'japan'
 let likenum = 5
 let speed = 3000
 let headless = false



 async function accounts () {
    let account1 = new instagrambot()

    await account1.login(id, password,headless)
    await account1.likehashtag(hashtag, likenum,speed)
    await account1.Close()
 }

 accounts()
 accounts()
