# ChatGPT Utilities by Zach Champeau
This project was made for TylerTech's MI-24 2023 challenge. It is far from complete and there are bugs.

## TODO
- OpenAI Login, it currently uses Zach's API Key.

## FIRST STEPS (IMPORTANT)
I am aware this method is not secure whatsoever, but I ran out of time during the 24 hour challenge. An OpenAI login will be implemented at some point.
- Create an API key: https://platform.openai.com/account/api-keys
- Open up the chat-gpt.service.ts file and replace the existing API Key.

## Running the project
- Use a command prompt and run `ng serve` in the project's root directory.
- It'll give you a localhost url.

## Code Masker (C# Only)
- Enter a word prompt, give a nice description of what you want ChatGPT to do.
- Enter your c# code in questions, include comments if necessary.
- Hit auto mask if you want to mask your code.
- Hit submit to generate the prompt and send it to ChatGPT.
- On the rightmost card, you will see its' response and will be able to Auto Unmask it.
