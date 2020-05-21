# bootstrap-animation-queue
An open source library for queuing up bootstrap animations  to run in series without needing content developers to write any Javascript code. Makes heavy use of JQuery Tree Traversal and MDB animation-end callbacks.

Currently, in order to have animations run one after the other, you have the following choices:

---------------
use MD Bootstrap's built in .delay classes | these are limited to exact delay of 1 second, 2 second, ... 5 seconds, which seems like their use is very limited
create your own delay classes with more granular delays | this is a fine approach, but you could run into timing issues
use a bunch of callbacks yourself | this is time consuming


## Getting Started

As this project is just starting up, you only need to download bootstrap-animation-queue.js to your project directory and include it in your html file's script tag (must be at the bottom of the body for the time being).

### Prerequisites

- [JQuery](https://jquery.com/download/)
- [Bootstrap](https://getbootstrap.com/docs/4.4/getting-started/download/)
- [MD Bootstrap](https://mdbootstrap.com/md-bootstrap-cdn/)

Include links to the above in the head of your html.
```html
<head>
  <!-- JQuery -->
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"
    integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <!--Bootstrap stuff-->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
    integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
    crossorigin="anonymous"></script>
  <!-- Material Design Bootstrap -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.18.0/css/mdb.min.css" rel="stylesheet">
  <!-- MDB core JavaScript -->
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.18.0/js/mdb.min.js"></script>
</head>
```
### Installing 

Download bootstrap-animation-queue.js to your project directory and link to it from your body's script tag as follows:

```html
<script type="text/JavaScript" src="bootstrap-animation-queue.js"></script>
```

## Running the tests

* More comprehensive documentation to come *

The structure of the html should be something like this:

```xml
<animation-queue-parent>
  <animation-queue-child-0>
    <animation-queue-child-0>
  </animation-queue-child-0>
  <animation-queue-child-1>
  <animation-queue-child-1>
  <animation-queue-child-2>
    <animation-queue-child-0>
    <animation-queue-child-1>
    <animation-queue-child-2>
    <animation-queue-child-3>
  </animation-queue-child-2>
</animation-queue-parent>
```

At each step, every element that needs an animation, needs to have a css class name of animation-queue-effect-{effect} where {effect} is one of the animation classes described on [MD Bootstrap's animation list](https://mdbootstrap.com/docs/jquery/css/animations/).