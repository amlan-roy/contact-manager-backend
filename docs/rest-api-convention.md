# The REST api convention for this project

| CRUD Action                  | HTTP Method | Endpoint              |
| ---------------------------- | ----------- | --------------------- |
| `Contacts Route`             |             |                       |
| Get all contacts             | GET         | `/api/contacts`       |
| Get a contact                | GET         | `/api/contacts/:id`   |
| Create a contact             | POST        | `/api/contacts`       |
| Update a contact             | PUT         | `/api/contacts/:id`   |
| Delete a contact             | DELETE      | `/api/contacts/:id`   |
| `User Route`                 |             |                       |
| Register the user            | POST        | `/api/users/register` |
| Login the user               | POST        | `/api/users/login`    |
| Get current user information | GET         | `/api/users/current`  |
