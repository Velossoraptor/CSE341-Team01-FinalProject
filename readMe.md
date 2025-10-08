HTTP DELETE – Happiness Ncube

I will implement the DELETE routes for the API.

For each collection (products, stores, employees, and users), I will write secure DELETE endpoints that check for proper authentication and authorization before removing records from the MongoDB database.
I will also include error handling to ensure that attempts to delete non-existent or protected records return clear, meaningful responses.
These routes will be thoroughly tested to confirm that only authorized admin or employee accounts can perform deletions.


 API Swagger Documentation for all API routes – Happiness Ncube

I will create and maintain the Swagger (OpenAPI) documentation for every API endpoint at the `/api-docs` route.

This includes writing detailed specifications for request parameters, request bodies, authentication requirements, and expected responses.
The documentation will clearly mark which endpoints are protected by OAuth and require authentication.
This will make it easy for teammates, testers, and future developers to explore and understand how to use our Simple Marketplace API.

I hope it all makes sense.


Happiness part2

Team, I’ve updated the protected routes to use the new Google OAuth authentication middleware (verifyGoogleToken) instead of the old authenticate middleware.

Originally, I used the authenticate middleware because our project was set up for custom JWT authentication. Now that we’ve switched to Google OAuth, I’ve replaced all uses of authenticate with verifyGoogleToken to match our new authentication flow. The authorizeAdminOrEmployee middleware is still used for role-based access.

This make sure that our routes are consistent with the team’s agreed approach and that only users with valid Google tokens and the right roles can access protected endpoints.

RENDER: https://marketplaceapi-xx5z.onrender
YOUTUBE: https://youtu.be/rCkzrvHLIyo
GITHUB: https://github.com/Velossoraptor/CSE341-Team01-FinalProject.git

Hey guys

I wanted to integrate Jest testing for our project, but to do that properly I needed to make sure all our endpoints and validation were working correctly first. So I ended up implementing several Week 6 requirements:

my main Goal was Jest Testing Integration

I have created complete test suite for all GET endpoints and alos I have installed Jest and Supertest frameworks.
I updated package.json with test scripts and configuration
This ia what I Had to Fix/Add to Support Testing:

Data Validation - Tests needed consistent validation across all collections:

Created employeeValidation.js, storeValidation.js, userValidation.js
Products already had validation 
All POST/PUT routes now returns 400/500 errors for testing
Swagger Documentation - Fixed swagger.js to include ALL route files so tests could verify endpoint structure

OAuth Protection - Ensured consistent authentication for testing protected routes:

Fixed file casing issues with verifyGoogleToken imports
Added authorizeAdminOnly for user routes (as Tyler requested)
For Route Structure i made sure all CRUD operations were properly implemented for comprehensive testing

And the results are that, Now we can run npm test and have full test coverage for our GET endpoints, plus all Week 6 rubric requirements are met!

This eddit is open to merging all that workwell with our project.
The Jest integration drove everything else which was included in this weeks learning activity.