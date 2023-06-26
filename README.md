# Balance Financial Report

## How to run

Built with React + Typescript + Material UI.
 
This project uses json-server to mock the API, so you can run the project locally without any other dependencies.

To run, type:

``yarn install``

``yarn dev``

In another terminal/tab, type to run the mock API:

``yarn start-server``

Then you can open in your browser:

`http://localhost:3000/`

To use with npm, delete `yarn.lock` use `npm install`, `npm run dev` and `npm run start-server` instead.

## Description

`db.json` contains the mock data for the API. It contains the transactions and the categories.

`src/api` contains the API calls which creates the reports and move the transaction between categories.

I chose to use json-server instead of just mocking an object to make it more realistic, since it's a real API call.

The tradeoff is that I needed to create the logic to get the report and move the transactions between categories. 
That took some extra time.

Overall, given more time, I'd focus on improving the performance, since the report is being calculated on the frontend and there's room for improvement in both the API calls and the front-end data handling.

I'd also make some improvements to the UI: make the period header sticky, add a loading indicator and add the ability to scroll the transactions when the right panel is open.
