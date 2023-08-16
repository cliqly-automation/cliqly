import { launch } from 'puppeteer';
import dotenv from 'dotenv';
import { uniqueNamesGenerator, names, colors } from 'unique-names-generator';

const fromName = uniqueNamesGenerator({
  dictionaries: [names, colors],
  separator:    ' ',
  length:       2,
  style:        'capital',
});

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

(async () => {

  dotenv.config();

  const LOGIN = process.env.LOGIN,
    PASSWORD  = process.env.PASSWORD;

  const browser = await launch(),
    page        = await browser.newPage();

  await page.goto( 'https://system.cliqly.com/member/login', {
    waitUntil: 'networkidle2',
  });

  console.log( 'LOGIN PAGE LOADED!' );

  await page.type( '#loginEmail', LOGIN );
  await page.type( '#floatingPassword', PASSWORD );

  await Promise.all([
    page.click( '#userLoginBtn' ),
    page.waitForNavigation(),
  ]);

  console.log( 'LOGGED IN!' );


  await Promise.all([
    page.goto('https://system.cliqly.com/member/sendmailpro3/schedule'),
    page.waitForNavigation(),
  ]);

  // 2 times to get to the right page
  await Promise.all([
    page.goto('https://system.cliqly.com/member/sendmailpro3/schedule'),
    page.waitForNavigation(),
  ]);


  console.log( 'FORM SELCT PAGE' );

  await page.waitForSelector( '#subsTypeBtn' )
  await page.click( '#subsTypeBtn') ;

  const rand  = random( 1, 235 ),
    template  = `#creativeBox_${rand} > div:nth-child(4) > button`,
    input     = `#formid${rand} > input.form-control.mt-4`,
    submitBtn = `#emailAdSubmitformid${rand}`;

  console.log( `SELECTED TEMPLATE: ${rand}, FROM NAME: ${fromName}` );

  await page.waitForSelector( template, {
    visible: true,
  });
  await page.click( template );

  console.log( 'TEMPLATE SELECTED' );


  await page.waitForSelector( input, {
    visible: true,
  });
  await page.type( input, fromName );

  console.log( 'TYPED FROM' );


  await page.waitForSelector( submitBtn, {
    visible: true,
  });
  await page.click( submitBtn );

  console.log( 'SUBMIT CLICKED' );

  await page.waitForSelector( '#formSubmitBtn', {
    visible: true,
  });
  await page.click( '#formSubmitBtn' );

  console.log( 'MAIL SENT!' );

  await browser.close();

})().catch( ( err ) => {
  console.error( err );
  process.exit( 1 );
});
