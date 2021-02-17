# Deployment 

## Bugs

On deployment I discovered two bugs:

## The flip transition didn't work on Safari...
** images **
I fixed this by checking the CSS as I knew that I probably needed a prefix vendor on one/a few of the class styles that involved the 'flipcard' transition. 
I solved this by searching on [Can I Use](https://caniuse.com/) **image/screenshot and searching through the styles relevant to the flip transition, specifically:
- transform
- transform-style
- transition
- backface-visibility

I then added some vendor prefixes to the transform and backface-visibility. 
After waiting for the git commit and push to process, the flip transition worked fine on all browsers.

## Restart game button breaks at larger screen size...
When re-sizing the browser window, I found an area on the site that wasn't responsive, that I hadn't previously picked up on. 
At screen width 1025 - 1142 (1143px and up was fine), the restart button breaks in half because of the margin added earlier to center the button.
** images **
I solved this by creating a media query for the specified screen width, removing the margins from the re-start button. 
In hindsight, I didn't need the margins on the restart button, I had initially used it to center the button, however, I later wrapped the button in a Footer and 
styled with center alignment (at this point I should have removed the margins).





## How I felt about Javascript
The design of the site was created by myself. I started the Javascript code by following an online tutorial by [Marina Frerreira](https://www.youtube.com/watch?v=eMhiMsEC9Uk&list=PLLX1I3KXZ-YH-woTgiCfONMya39-Ty8qw).
Further research included watching a series of tutorials and reading through many different resources, game code examples and tutorials with my Mentor. 
This helped to familiarise me with Javascript code, functions and the syntax, which I found very challenging in this project and required a lot of additional research before I started to feel comfortable with the code.
It's a language that I found rewarding to learn and I'm exctied to continue to improve my skills in. 