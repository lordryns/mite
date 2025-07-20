# mite
Check the status of mihon/tachiyomi repositories easily with Mite.

## Application

Remote - fetches data from a remote source

Local - Uses the default index.min.json 

Even when source is set to remote, if server fails to fetch from remote source, it fallsback to the local source.

## API

Find api at: 
```bash
<base-url>/api/
```

Routes 
/fetch_all/

Returns a list of extensions in paginated format, defaults to 10 per page.

**queries**

- page
 specify which page to display, defaults to 1.

- per_page
  specifies how many extensions to be returned per page, defaults to 10.

- search
search for any extension, defaults to "".

- is_local
use this to determine which source to fetch data from, defaults to remote, if remote times out, fallsback to local.



### How does the API work?

when you run a /fetch_all, the server filters based on your queries before sending get requests to each extension source, after this, it injects the response data into the json in memory before returning it to the user.


## Conclusion 

This is a hobby project, if you have any recommendations, feature ideas or you just want to contribute, hit me up @lordryns on X or Discord or just submit an issue.
