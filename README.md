# <p align="center">Livre List</p>

<div align="center"><i>In Progress</i><br/>This app will allow users to inventory and grow their personal book collections & reading lists with the help of the GoogleBooks API.

See the backend repo [here](https://github.com/odellmac4/livre-list-be)!

</div>

### <p align="center">Contributors</p>
<div align="center">
  
  [Odell McFarland IV](https://github.com/odellmac4), [Tayla Phillips](https://github.com/tednaphil)

</div>

## Preview:
<div align="center">
  <img src=".github/LivreList Demo_beta2.gif" alt="LivreList demo">

</div>
<p align="center">Technologies Used</p>
<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge" alt="typescript badge">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=fff&style=for-the-badge" alt="html badge">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff&style=for-the-badge" alt="css badge">
  <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge" alt="react badge">
  <img src="https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=fff&style=for-the-badge" alt="router badge">
  <img src="https://img.shields.io/badge/Cypress-69D3A7?logo=cypress&logoColor=fff&style=for-the-badge" alt="cypress badge">
  <img src="https://img.shields.io/badge/Chakra%20UI-319795?logo=chakraui&logoColor=fff&style=for-the-badge" alt="chakra badge">
  <!-- <img src="https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=fff&style=for-the-badge" alt="figma badge"> -->
  <!-- <img src="https://img.shields.io/badge/Lighthouse-F44B21?logo=lighthouse&logoColor=fff&style=for-the-badge" alt="lighthouse badge"> -->
  <img src="https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=fff&style=for-the-badge" alt="vercel badge">
</div>

## Installation Instructions:
- Run the following on the command line to clone the repo and run the app locally in development mode
    ```
    git clone git@github.com:tednaphil/livre-list.git
    cd livre-list
    npm install
    npm start
    ```
### Run Tests:
- Ensure you're running the app locally (see Installation Instructions above)
- Run the following on command line to open Cypress: `npm run cypress`
- Click `E2E Testing`, then `Start E2E Testing` in desired browser
- Select `App_spec` to run general user story tests
- Select `User_Dashboard_spec` to logged in user story tests
- Select `Error_spec` to run error handling tests

## Context:
<!-- wins, challenges, time spent, goals, approaches etc -->
An explicit typing approach was adopted in this project for the benefits that self-documenting code provides for almost 100% asynchronous collaboration.

### Goals

<details close>
  
  ```
  - Consume GoogleBooks API
  - Implement OAuth authentication protocol
  - Self teach and use a new component library [(ChakraUI)](https://v2.chakra-ui.com/)
  
  ```
  
</details>
  
### Wins
  
<details close>
  
  ```
  - Use of custom Github Actions to establish continuous integration pipeline
  
  ```
  
</details>
  
### Challenges
  
<details close>
  
  ```
  - Variance in data received from an extremely large database posed a challenge when referring to certain `Book` properties (e.g. no thumbnail available, no authors listed, null rating, etc). This was addressed by using serializers in the BE application and data-cleaning functions in the FE application (e.g. providing a default thumbnail) to polish the user experience.
  
  ```
  
</details>