#Find Hobby by Personality Type
A responsive Javascript app to that finds local meetups based on your personality type.

![Screenshots](http://gabrielbravo.net/hobby-app/img/hobby-app-screenshots.png)

##Introduction
The Hobby app takes a persons zipcode, then asks them a set of personality typing question based on the Myers-Briggs test;
and once the personality type is found, the app corresponds the personality type to a relevant hobby based on charecteristics
and returns a list of local meetups for that hobby that are returned in a response via the Meetup api.

##Use Case
The typical user could be anyone who is looking for a new hobby or that may be interested in learning more about their personality type.

##UX
The app will scale fully across mobile, tablet and desktop using the same layout design. 
Invalid zipcodes prompt a CSS gradient overlay that the user can interact with to enter the correct zip.

##Live Site
You can access Password Vault at http://gabrielbravo.net/hobby-app/index.html

##Technical
* The front-end is built using HTML5, CSS3 Flexbox and jQuery and Javascript.
* The app is fully responsive, adapting for mobile, table and desktop viewports.
* All routing is through the Meetup public api.
* Form validation and error handling is demonstrated on the homepage of the app where the zipcode is collected.
* Ajax is used to make request and handle server responses.
* The Javascript module design pattern known as the Revealing pattern is used to encapsulate data, and as client-side api for browser updating and rendering.


