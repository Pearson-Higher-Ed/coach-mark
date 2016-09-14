# Usage

This project supports [Node v4+](https://nodejs.org) and npm 2+ installed in your development toolchain.

Install and save in your package.json:

    npm install @pearson-components/[component-name] --save

## External Dependencies

React and ReactDOM (v0.14 or v15) are external dependencies required to use this component. They are npm-installable or 
available from a third-party [CDN](https://cdnjs.com/libraries/react/).

This component targets the styling in the [Pearson Elements SDK](https://www.npmjs.com/package/pearson-elements).

## Cross-browser Compatibility

The following [Polyfill.io](https://cdn.polyfill.io/v2/docs/examples) service is recommended for consuming this 
component cross-browser:

```html
<script src="https://cdn.polyfill.io/v2/polyfill.js?features=CustomEvent,Intl.~locale.en,Intl.~locale.fr"></script>
```

The CustomEvent polyfill is for Internet Explorer, and the Intl.js polyfill is for Safari. As you support more languages,
add them to the list of features requested.

If your browser already supports a feature, this service automatically optimizes and does not bring down unnecessary code.

## How to Consume in an Application

See the /demo directory for example usage.

The component's original source code and the transpiled bundle are available in the npm installation. The bundled version
 is exported as a UMD package supporting AMD, CommonJS2, or a global variable.
     
### Bundle (Simplest)

The transpiled, minified bundle will be available in /node_modules in the component /build directory.

Eventing example:

```js
[EXAMPLE GOES HERE]
```

### or Build

There are use cases where you might need to roll the component into your application's build process.

CommonJS example:

```js
[EXAMPLE GOES HERE]
```

Example webpack configuration (requires correct configuration and installation of loader dependencies):

```js
[EXAMPLE GOES HERE]
```
    
### Component Configuration

    [CONFIG EXAMPLE GOES HERE]

### Eventing

<table>
    <tr>
        <th>Event</th><th>detail</th>
    </tr
    <tr>
        <td></td><td></td>
    </tr>
</table>
