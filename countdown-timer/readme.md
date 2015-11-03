# Timer

## Example markup:

```
<time
    class="js-timer"
    style="visibility: hidden"
    data-end="Oct(ober) 31 2015 ( 01:17:42 GMT )"
    data-utc-offset="-8"
  ( data-end-message="Happy Halloween" )>

    [ Display Text ]

</time>
```

`( )` - Optional parameters


- Available sitewide - initiated with `.js-timer` class


- `visibility` set inline to avoid tags being displayed prior to js populating them, while still occupying the space it otherwise would


- `end` - Allows all valid dates per [JS Date.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Examples)


- `end-message` - Text to display when timer 0 or past due (defaults to nothing)


- `utc-offset` - Set a common timezone to calibrate client time to ( Defaults to -8 PST )


- Will replace `{ DAYS }`, `{ HOURS }`, `{ MINUTES }`, `{ SECONDS }`, `{ MS }`, `{ DATE }`