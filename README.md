# mite
Check the status of mihon/tachiyomi repositories and install them easily with Mite.

## Application

- **Remote** - fetches data from a remote source
- **Local** - uses the default `index.min.json`

Even when source is set to remote, if server fails to fetch from remote source, it falls back to the local source.

## API

Find API at:

`<base-url>/api/`

### Routes

#### `/fetch_all/`

Returns a list of extensions in paginated format, defaults to 10 per page.

**queries**

- `page`  
  Specify which page to display, defaults to 1.

- `per_page`  
  Specifies how many extensions to be returned per page, defaults to 10.

- `search`  
  Search for any extension, defaults to "".

- `is_local`  
  Use this to determine which source to fetch data from, defaults to remote. If remote times out, falls back to local.

### How does the API work?

When you run a `/fetch_all`, the server filters based on your queries before sending GET requests to each extension source. After this, it injects the response data into the JSON in memory before returning it to the user.

## Conclusion

This is a hobby project, if you have any recommendations, feature ideas or you just want to contribute, hit me up @lordryns on X or Discord or just submit an issue.
