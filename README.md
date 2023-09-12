# time-stamper

automatic time stamping in kenjo with playwright (for the previous month)

## Run

1. Enter your start and end of the working day in the **.env** file
2. Run `npx playwright test`
3. The script will pause because we will need to log in to a Google account
4. Login, go through two-factor authentication
5. Click **"Resume"** in the window that appears
6. That's all, waiting for the message in the terminal
