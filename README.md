# Captcha Game (aka I Am Not a Robot)

## IMPORTANT:
The demo and live versions of the website feature different captchas, since browsers don't like giving webcam and microphone access to websites without SSL certificate (which we didn't have time to acquire during the hackathon). To switch between these versions, **go to Window.tsx and change IS_DEMO to either true or false. If you are locally hosting, we recommend using the demo version**.

Also, in TouchGrass.tsx, you need to supply your own Claude API key.

## Summary
"I Am Not a Robot" is a parody game that starts with simple, tradition captcha puzzles and evolves into increasingly unique challenges. It integrates visual recognition, speech analysis, and interactive gameplay designed to stump humans and AI. Responding to "human-like" queries and challenging your patience, the game pushes you to go to great lengths to prove that you're a human.

The front end was developed using React and TypeScript. For the backend, we used Flask to handle API communication and Terraform to manage our infrastructure. Terraform allowed us to automate deployment processes and have a history version for the cloud, helping us maintain an efficient backend.

## What's next for Captcha Game

We still need to improve the login process to accurately update users and account for special cases (handle login fail, incorrect/reset password). We can also look into adding more complex and creative levels. We are also considering UI design approaches to be more visually appealing and engaging.

## Credit
 - Checkmark icon: https://icons8.com/icon/zSZ4mlKW8DSR/done
