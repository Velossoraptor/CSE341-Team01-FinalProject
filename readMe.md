HTTP DELETE – Happiness Ncube

I will implement the DELETE routes for the API.

* For each collection (products, stores, employees, and users), I will write secure DELETE endpoints that check for proper authentication and authorization before removing records from the MongoDB database.
* I will also include error handling to ensure that attempts to delete non-existent or protected records return clear, meaningful responses.
* These routes will be thoroughly tested to confirm that only authorized admin or employee accounts can perform deletions.


 API Swagger Documentation for all API routes – Happiness Ncube

I will create and maintain the Swagger (OpenAPI) documentation for every API endpoint at the `/api-docs` route.

* This includes writing detailed specifications for request parameters, request bodies, authentication requirements, and expected responses.
* The documentation will clearly mark which endpoints are protected by OAuth and require authentication.
* This will make it easy for teammates, testers, and future developers to explore and understand how to use our Simple Marketplace API.

I hope it all makes sense.


Happiness part2

Team, I’ve updated the protected routes to use the new Google OAuth authentication middleware (verifyGoogleToken) instead of the old authenticate middleware.

Originally, I used the authenticate middleware because our project was set up for custom JWT authentication. Now that we’ve switched to Google OAuth, I’ve replaced all uses of authenticate with verifyGoogleToken to match our new authentication flow. The authorizeAdminOrEmployee middleware is still used for role-based access.

This make sure that our routes are consistent with the team’s agreed approach and that only users with valid Google tokens and the right roles can access protected endpoints.