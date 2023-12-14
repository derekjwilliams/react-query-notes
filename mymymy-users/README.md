## Example queries

### Users with Audiences

```
http://localhost:3000/users?select=display_name,family_name,email,employee_id,given_name,audiences(display_name,active,visible)
```

### Users with Sites

http://localhost:3000/users?select=display_name,family_name,sites(display_name)

### Users with Classifications

http://localhost:3000/users?select=display_name,family_name,classifications(display_name,short_name,active)

### Classifications with resource_links

http://localhost:3000/classifications?select=display_name,short_name,active,resource_links(type,destination_url)