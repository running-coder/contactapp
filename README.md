# API

Built with [Actionhero](http://www.actionherojs.com/), the REST Api allows to GET, POST, PUT, PATCH and DELETE a user's contact book.

To install Actionhero, assuming you have npm installed, browse the `contactapp/api` folder and do `npm install`.
Once completed launch the Actionhero server using `npm start`.

Routes are located inside `contactapp/api/config/routes.js`.
Actions are located inside `contactapp/api/actions/v1/contacts.js`. At this location, more validation could be added
over the received params to ensure valida data.
Initializers are located inside `contactapp/api/initializers/contact.js` and allows the contacts to be requested / saved inside Redis.

## Run the API Tests

The tests are located inside `contactapp/api/tests/contact.js`.

To run the tests, browse `contactapp/api/` folder and execute `npm test`

*NOTE* Inside `package.json`, change the command according to your OS:

Windows test command `"SET NODE_ENV=test & mocha"`
Linux test command `"NODE_ENV=test mocha"`

- Took 3h to complete the API
- Took 1h to complete the tests


# App

Built with [Angular1.5](https://angularjs.org/), the SPA allows to Create, Read, Update and Delete contacts per `userId`.
The Facebook App is configured to run on `http://contactapp.local/` so please point this Url to `contactapp/app/index.html`.

*IMPORTANT* [Configure your vhost](https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode)
where the `server_name` would be `contactapp.local`. All of the `/assets/**` files are also configured to use the `app` folder as the root.

On windows system, remember to add `127.0.0.1 contactapp.local` inside `C:\Windows\System32\drivers\etc\hosts`.

`Bower` is used to retrieve the required Javascript libraries
`Gulp` is used to compile scss files located inside `contactapp/app/assets/src/scss`. With a fresh install,
remember to `npm install` from `contactapp/app/utils/gulp/` folder before executing the gulp commands.

`contactapp\app\api\services\ApiService.js` interfaces the `$http` angular service
`contactapp\app\modules\services\ContactsService.js` bundles the Contacts API requests into re-usable promises for the ContactsControllers

Inside `contactapp/app/app.config.js`, `appConfig.loadingDelay = 250;` is used to configure the loading animation
while the data is being retrieved over the API and can be set to 0 once everything is configured.

- Took 8h to complete the SPA