# wasm-bellman-circuit

Here is workspace to build the circuit for anonymous transactions for unitoken  and js bindings.

* zunitoken _primitives - crate for utils and crypto function
* zunitoken _circuit - crate for circuits
* zunitoken _wasm - crate for wasm bindings
* js - example, how to use js bindings

First, we need to install the dependencies (`cargo` and `npm` should be already installed):

```
cargo install wasm-pack
cd js && npm install
```

To run tests

```bash
cargo test
```


To build

``` bash
wasm-pack build zunitoken _wasm
``` 


To view web page with wasm in browser.

```
cd js && npm run start
```
