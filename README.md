# Glaffle
Glaffle is a livestreaming site I made because I wanted somewhere to stream games and I don't like Twitch or any of the popular alternatives.
The site is built with Next.js, Tailwind CSS, Prisma, tRPC, and uses Pusher for stream chat.
The actual stream goes through an nginx-rtmp server, which sends stream start/end events to [API endpoints](https://github.com/xkcdstickfigure/glaffle/tree/main/src/pages/api/streamController) that change the streaming state for the user.
Authentication is done with Google OAuth because it's the least inconvenient option.

This project is pretty unfinished and there were many other things I was planning to add, such as an onboarding flow and a better landing page, but I got bored so now it's open-source for you to look at :)

![screenshot of stream page](https://user-images.githubusercontent.com/97917457/234656921-01b18bb6-f3cc-4dc4-9f55-9d243663b1ff.png)
