# time-stamper

Automatic time stamping in kenjo with playwright (for the previous month) using login via Google account  
Сhrome is used

## Run

1. You must be logged into your Google account in your browser
2. Fill **.env** file. To find out your **EXECUTABLE** and **PROFILE** paths enter `chrome://version/` into your browser URL. And add your email to YOUR_EMAIL env var.
3. Run `npm i`
4. Run `npx playwright install`
5. Run `npx playwright test`
6. That's all, waiting for the message in the terminal
7. If something went wrong, it pauses so you can check the page
