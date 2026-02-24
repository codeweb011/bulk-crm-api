## Bulk CRM API Layer

This is the API layer for the bulk CRM system.

### Endpoints

- `POST /bulk-actions` - Create a new bulk action
- `GET /bulk-actions/:id` - Get a bulk action by ID
- `GET /bulk-actions` - List all bulk actions
- `GET /bulk-actions/:id/logs` - Get logs for a bulk action

To run this application:

```bash
cd api
npm install
npm run start:dev
```