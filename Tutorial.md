# The Hic et Nunc Metaverse Tutorial Series

**WORK IN PROGRESS - NOT COMPLETE YET**

Hi and welcome to a brand new series of tutorials that are intended as an introduction into WebXR and NFTs. 

"**Metaverse**" is a term that currently pops up everywhere. Some see it as a decentralized futuristic space linking Virtual / Augmented Realities and blockchains. Others claim that they are already building it (in which case there must be more than one Metaverse, and we probably would need a Meta-Meta-verse). And still others note that the origin of the concept is a [quite dystopian one](https://en.wikipedia.org/wiki/Snow_Crash) and therefore it should rather be avoided.

I use **Metaverse** to describe a potential open and decentralized Web 3.0. Imagine various VR / AR / NFT / IoT / data / smart contract layers built on open web standards that we all use and build upon. Decentralized means that you, me and everyone else can run their own stuff and own their data, instead of the current, largely corporation-owned walled gardens ad socoal media conglomerates, a.k.a. the late Web 2.0. My tutorials therefore contain 100% open source, web-based ingredients such as [WebXR](https://www.w3.org/TR/webxr/).

**Hic et Nunc** (HEN, or H=N) is one of the fastest growing NFT platforms. At the same time it has established itself as a place for a diverse community of artists and collectors. HEN is [open source](https://github.com/hicetnunc2000/) and lives on [Tezos](https://tezos.com/), a "green"/[energy efficient](https://arxiv.org/abs/2109.03667) blockchain. You can read about the history of Hic et Nunc [here](https://github.com/i3games/hen-timeline/blob/main/timeline.md).

So we start with the tiny little atom of a Metaverse, possibly, and watch it grow in size and capacity. The main goal is to learn about WebXR and experiment with green NFTs.

Ready? This is the roadmap:

**Tutorial 1: Setup, Virtual World, Tezos**.  
The tutorial you are reading right now is the first part of the series. We set up some tools and create a tiny virtual world that contains a link to an NFT. It also has an object that responds to a click event (more on that below). By activating the object it calls a a blockchain service to display the balance of a Tezos address that we enter.

This is what we will see at the end:

![Tutorial 1 scene](/assets/placeholder.jpg)

**Tutorial 2: Wallets and Transactions**.  
In part 2 of the series we are going to buy a NFT from our virtual world by calling a smart contract. We will learn how to interact with a wallet to confirm the transaction.

**Tutorial 3: Writing a Smart Contract for Interaction**.  
In part 3 we finally write our own smart contract in order to facilitate an interaction between collectors in Virtual Reality.

**Tutorial 4: ???**  
Like a certain movie franchise, part 4 is unknown yet but it might bring joy and resolution to the series. I recently was invited to play with [Neural Cellular Automata](https://distill.pub/2020/growing-ca/), so maybe we can go in this direction. But first things first.

## Prerequisites

These tutorials assume that you know how to install software, create files and folders, use a code editor and run commands from the terminal (also called "command line" or "shell"). Experience in HTML, CSS and JavaScript (tutorial 1 and 2) and in Python (tutorial 3) are a plus, but not required. If you do not know how to code (yet) just follow along and learn more with the resources provided below.

We will start from scratch and work all the way through towards blockchain programming. Therefore each tutorial has to cover a lot of ground. To pull this off, I keep implementation and tooling minimal and provide additional material and optional parts for those who want to explore specific topics further.

My goal is to explain things so that everyone is able to follow, regardless of your background. If something is still unclear or if you spot a mistake, please leave a bug report on the Github repository. Thereby you can help improve the tutorials for yourself and for others.

Let's go.

## 1. Preparation and Setup

You need the following set of tools to follow the first tutorial:

1. A laptop or PC with an up to date web browser such as Chrome (recommended for VR) or Firefox.
2. A code editor. I use Visual Studio Code (VS Code).
3. A terminal (also called "command line" or "shell"). VS Code has a terminal built in `(Terminal -> New Terminal)`.
4. A local web server. VS Code has an extension called "Live Server", which comes handy. Extensions in VS Code are installed from the Extension panel `(View -> Extensions)` by entering their name in the search field and following the instructions.
5. npm, the node.js package manager.

These tools we will also be using during this course. If you are just getting started, follow the links at the end of the article to install them. If you are advanced, feel free to use your favourite editor / server / package manager instead.

5. I recommend for this tutorial to have your own Tezos wallet, and in the second tutorial you need one. I use the Temple wallet with Chrome. You also need a small amount of Tez (probably less than 1 Tez overall) in order to buy an NFT in tutorial 2 and for the interactions in tutorial 3.
6. In tutorial 3 we will use [SmartPy](https://smartpy.io/) to write a smart contract. To test the contract you will need two Tezos addresses which both own an NFT on Hic et Nunc.

## 2. Create a minimal VR Scene with A-Frame

First let us create a small VR scene to start with.

Everything starts with an empty folder. Create a folder for this project. Then open it in VS Code (To do that on my Mac, I drag the directory from the Finder window to the VS Code icon in the Dock). This allows you to work in the code editor, add files to the project and edit them. Visit the A-Frame website and take the code from their [introduction tutorial](https://aframe.io/docs/1.2.0/introduction/):

```html
<html>
  <head>
    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
      <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
      <a-cylinder
        position="1 0.75 -3"
        radius="0.5"
        height="1.5"
        color="#FFC65D"
      ></a-cylinder>
      <a-plane
        position="0 0 -4"
        rotation="-90 0 0"
        width="4"
        height="4"
        color="#7BC8A4"
      ></a-plane>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene>
  </body>
</html>
```

Then copy and paste the code into a file and save it as `index.html`. Open the directory inn VS Code. Now click on "Go Live" in the bottom bar to start Live Server. Your web browser should pop up. You will first get a warning, because we are using `http:` instead of a secure connection over `https:`, which is ok for local development. Maybe you have to search a bit in the message, but your browser will let you chose to display the page and you will see this:

![Initial Scene](assets/initial_scene.jpg)

This is our VR world. Impressed? You can move in the scene with the WASD-keys, click and drag the mouse to rotate. Note the little VR button in the lower right corner. You can open this page with your favourite VR glasses or in your smartphone with a [cardboard VR viewer](https://arvr.google.com/cardboard/), tap the button and you will be ... in the scene.

The scene lives inside a web page. The part between the opening tag `<a-scene>` and the closing tag `</a-scene>` describes the elements that you can see here. For example, `<a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>` means that there is a box in the scene at position -1 on the left-right axis, 0.5 on the up-down axis, -3 on the front-back axis, rotated by 45 degrees with [this particular color](https://www.google.com/search?q=%234CC3D9).

To get a feeling for this A-Frame scene, I recommend to study the other elements and change some of their attributes like the position, then save the file to see what happens. If you have Live Server installed, it will update the browser window instantaneously. When you run into errors, try to figure out what went wrong. When you are done, copy the original code from the A-Frame website again or keep working with you modified scene if you prefer.

## 3. Display an NFT and link to its page on HEN

In this step, we want to be able to click on the image of an NFT to open its page on Hic et Nunc.

Insert the following code right before the closing `</a-scene>` tag.

```html
<a-plane
  position="-3.5 1.85 -5"
  rotation="0 20 0"
  width="4.5"
  height="4.5"
  src="https://ipfs.io/ipfs/QmZEXZrnWcutQLZg1zmXFE5s9L2YfRcQSckMoyR68u7hBx"
  class="clickable"
  henlink="url: https://www.hicetnunc.xyz/objkt/181212; loc: frame"
>
</a-plane>
```

This adds a plane with the image of an NFT (that I made for these tutorials, please excuse the art). In the second tutorial we will be able to collect this NFT directly. For now, we display its image, which is stored on the "Interplanetary File System", or IPFS for short. The `src` attribute of the `<a-plane>` element points to its IPFS address: `https://ipfs.io/ipfs/QmZEXZrnWcutQLZg1zmXFE5s9L2YfRcQSckMoyR68u7hBx`. To get this adress, go to the NFT page on Hic and Nunc, in this case [https://www.hicetnunc.xyz/objkt/181212](https://www.hicetnunc.xyz/objkt/181212), and right-click on the image. In Chrome, there will be an entry named "Copy Image Link".

Other attributes such as `position`, `rotation`, `width` and `height` should be familiar by now. `class="clickable"` and `henlink="url: https://www.hicetnunc.xyz/objkt/181212; loc: frame"` will become clear in a moment.

To be able to click on that image and open its linked page on HEN, we need two more items: a kind of cursor to do the click and code that reacts to the click and opens the NFT page in a new tab or window.

First, add the following code to the scene. As before, insert it immediately before the closing `</a-scene>` tag.

```html
<a-entity position="0 0 0" rotation="0 -17 0">
  <a-camera id="player">
    <a-entity
      raycaster="objects: .clickable"
      id="cursor"
      cursor
      geometry="primitive: ring"
      material="color: green; shader: flat"
      position="0 0 -0.5"
      scale="0.01 0.01 0.01"
    >
    </a-entity>
  </a-camera>
</a-entity>
```

The three nested elements represent the player in the scene. The outer `a-entity` sets the initial position, the `a-camera` creates the "eyes" of the player and the inner `a-entity` a cursor that appears as a green ring and is able to click on elements whose `class` is `"clickable"`. Note that if we do not explicitely add a camera to the scene, A-Frame provides a default one.

Until now, we have described elements in the scene. Now we want to add code that is executed dynamically when something happens, in our case a click on the element. This code is written in [JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript), the main programming language of the web. In A-Frame, it is considered best practice to write [components](https://aframe.io/docs/1.2.0/introduction/writing-a-component.html), reusable pieces of code that provovide attributes for the elements. The `henlink` attribute on the `<a-plane>` element above points to the component that we arte going to write now.

Create a new file called `main.js` and put the following code in it.

```javascript
AFRAME.registerComponent('henlink', {
  schema: { url: { type: 'string' } },
  init: function () {
    console.log('registering component henlink');
  },
  update: function () {
    const url = this.data.url;
    this.el.addEventListener('click', function (evt) {
      window.open(url, '_blank');
    });
  },
});
```

Here you can see the name of the component, `henlink`, which matches the name of the attribute in the `<a-plane>` element above. This links the code in the component to the element. Furthermore, the component has three properties:

- `schema` describes the parameters of the component. We define a parameter of type `string` which is called `url`.
- `init` is a function that is called once when the component is initialized. I have added a line of code that writes a message to the web browser console, in order to check if the component has been added. In Chrome, `View -> Developer -> JavaScript console` displays the these messages and also errors, which is useful to check if things go wrong.
- `update` is another function that is called when the component is initialized and when a property of the component is updated. Our code gets the URL from the schema and registers an event listener that opens this URL in a new browser tab or window.

More about components and their properties can be found in the excellent [A-Frame documentation](https://aframe.io/docs/1.2.0/core/component.html).

The final step is to tell `index.html` about the code in `main.js`. Go back to index.html and add the line

```html
<script src="main.js"></script>
```

after the first `<script src...` and before the closing `</head>` tag. Save both files, and Live Server should update the scene in the browser window.

Now move the green cursor over the image and click on it. Its [Hic et Nunc page](https://www.hicetnunc.xyz/objkt/181212) opens in a new tab.

At this point, this is the complete `index.html`. I added two lines near the top to help the browser understanding the content:

```html
<!DOCTYPE html> <!-- I added this line for the browser -->
<html>
  <head>
    <meta charset="utf-8" /> <!-- I added this line for the browser -->
    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
    <script src="main.js"></script>
  </head>
  <body>
    <a-scene>
      <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
      <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
      <a-cylinder
        position="1 0.75 -3"
        radius="0.5"
        height="1.5"
        color="#FFC65D"
      ></a-cylinder>
      <a-plane
        position="0 0 -4"
        rotation="-90 0 0"
        width="4"
        height="4"
        color="#7BC8A4"
      ></a-plane>
      <a-sky color="#ECECEC"></a-sky>
      <a-plane
        position="-3.5 2.3 -5"
        rotation="0 20 0"
        width="4.5"
        height="4.5"
        src="https://ipfs.io/ipfs/QmZEXZrnWcutQLZg1zmXFE5s9L2YfRcQSckMoyR68u7hBx"
        class="clickable"
        henlink="url: https://www.hicetnunc.xyz/objkt/181212"
      >
      </a-plane>
      <a-entity position="0 0 0">
        <a-camera id="player">
          <a-entity
            raycaster="objects: .clickable"
            id="cursor"
            cursor
            geometry="primitive: ring"
            material="color: green; shader: flat"
            position="0 0 -0.5"
            scale="0.01 0.01 0.01"
          >
          </a-entity>
        </a-camera>
      </a-entity>
    </a-scene>
  </body>
</html>
```

This is the content of `main.js`:

```javascript
AFRAME.registerComponent('henlink', {
  schema: { url: { type: 'string' } },
  init: function () {
    console.log('registering component henlink');
  },
  update: function () {
    const url = this.data.url;
    this.el.addEventListener('click', function (evt) {
      window.open(url, '_blank');
    });
  },
});
```

If you want to go further, you could extend the mouse-triggered interaction to also work in VR. This can be done in two ways, either with a VR controller or with gaze-based interaction, for example on a smartphone with a cardboard VR viewer. The A-Frame documentation has [details](https://aframe.io/docs/1.2.0/introduction/interactions-and-controllers.html). 

Congratulations! We reached an important milestone: a VR scene that reacts to interaction. For example, you could now go on and build a VR gallery with your favourite NFTs. 

## 4. Prepare our development pipeline with Parcel and Taquito

During the next steps of this tutorial we will have a first look at the Tezos blockchain. Maybe the visitor of your NFT gallery wants to know if they have enough Tez (the currency of Tezos) in their account to buy an NFT that is on display? I tutorial 2 we will learn how to talk to their wallet directly, but for now I am using a service to look up the balance. For our visitor, the experience is as follows: they enter their Tezos address, then click on the yellow sphere in the scene, then the balance will pop up as 3D Text.

Before we can start coding, we need to install additional libraries and frameworks.  

One is [Taquito](https://tezostaquito.io/), the framework that will provide us with functions to talk to the blockchain. Taquito is written in [TypeScript](https://www.typescriptlang.org/), a superset of JavaScript that is popular. we will use a tool named [Parcel](https://parceljs.org/) that will To integrate it in our app build the web app for us. 

To install these dependecies, we will use `npm`.

Open a terminal window (`Terminal -> New Terminal` in VS Code), type `npm init --yes` and press Return. In case you are using a different terminal program, make sure to do this in the folder where `index.html` is located. A file named `package.json` appears. It holds various information about the project. We will turn to it in a moment.

Type `npm install taquito` and press Return. You will see activity in the terminal and a folder named `node_modules` appears.

Type `npm install --save-dev parcel` and press Return. Again the terminal will get busy for a while.

Wait between each step until the installations have completed. `npm` pulls stuff from repositories on the web, thus it is preferrable to have a stable internet connection.

Our project folder gets a little bit unwieldy as more files and folders appear. Before we go on, let us reorganize a bit. In the project folder, make a folder `src`. Move both `index.html` and `main.js` into this folder. Also in the project folder, make another folder `dist`. This one remains empty for the moment. 

Now, open `package.json` in VS Code. This is the mai configuration file for our project. Delete the line that says `"main": "index.js"`. Then add the following two lines right below the line that says `"scripts": {`

```json
"clean": "rm -rf dist",
```
and 
```json
"build": "parcel build src/index.html",
```

Save `package.json`. In the terminal window, type `npm run build` and press Return. Parcel builds the app  inside the `dist` folder we created earlier. The final step for now is to tell Live Server that it has to look into that folder. In VS Code, select `Preferences -> Settings -> Extensions -> Live Server Config`.
Scroll down until you see `Root -> Edit in settings.json`. Click on the link and in the file `settiings.json` that pops up, edit the line below. 

```json
 "liveServer.settings.root": "/dist", 
```

As usual, save the file. Then stop and restart Live Server in the VS Code status bar. You should see our 3D scene in the browser window again.  

On the surface it seems that we are back to the previous step, yet under the hood a lot has changed. We  have created a development pipeline that allows us to continue with the next steps.

## 5. Get blockchain data with Taquito

(tbd.)

## 6. Enter a Tezos address

Note that each transaction and each balance on the blockchain are public, so you can look them up with a blockchain explorer like [tzkt.io](https://tzkt.io/). A Tezos account address looks like this: "tz1imNpo5WeCoE5cziWsdpiaThT8YgvbTtJ9" which I picked as an example. On [Hic et Nunc] you can view the artist's page [for this address](https://www.hicetnunc.xyz/tz/tz1imNpo5WeCoE5cziWsdpiaThT8YgvbTtJ9/creations). It is mikrosil, an illustrator who uses strong colours to produce cheerful images and animations. 

Look up a few adresses on Hic et Nunc and tzkt.io. Found some rich artists? Poor artists? Use your own address if you already have a wallet. Remember in the second tutorial you will need a wallet in order to buy an NFT on Hic et Nunc. 

Because the address is along string of characters, it would not be fun to enter it inside our 3D scene. Instead, we will use a standard HTML text field so we can copy and paste an address. Let us prepare this now.

Insert the HTML for the text field before the `<a-scene>` tag. Make sure to isert it before the scene and not inside the `<a-scene>..</a-scene>` tags, as these elements are not part of the 3D environment.

```html
<div id="enteraddress">
  <h4>Tezos Address</h4>
  <p>
    Enter your Tezos wallet address and click on the sphere to see your
    balance. Click on the image to open it's H=N OBJKT page.
  </p>
  <input id="address" type="text" class="validate" />
  <label class="active" for="address">Tezos address</label>
  <a
    href="#!"
    id="enteradddress"
    >Enter</a
  >
</div>
```

If you look at the page now, you can see the HTML parts  we just added, but the 3D scene is gone. Actually, it is still there, but not shown. We will fix this in a moment. You can press the VR button to open the scene in fullscreen mode, but then the text field will go away (use the esc-Button to back out). 

The reason is that A-Frame by default assumes it is the only content inside a page. To display other elements, we must [embed the scene](https://aframe.io/docs/1.2.0/components/embedded.html).

To do this, replace the opening `<a-scene>` tag with 

```html
<a-scene embedded style="height: 600px; width: 1000px;">
```

Now the A-Frame scene is back, directly below the address entry. You can experiment with the `height` and `width` values to find something that fits your screen size. 

This is the minimal implementation. 

## 7 Put everything together: build the app and get the wallet balance

(tbd.)

## Next: Wallets and Transactions

In part 2 of the series we are going to buy a NFT from our virtual world by calling a smart contract. We will learn how to interact with a wallet to confirm the transaction.

That's it. In the next tutorial we will go a step further. We will use Taquito again to interact directly with a wallet and call Hic et Nuc's smart contract to buy an NFT. In part 3 we finally write our own smart contract in order to facilitate an interaction between collectors in Virtual Reality.

I will update this page with a link when it is ready.

See you.

## Links

### Introduction

[Hic et Nunc](https://www.hicetnunc.xyz/)

[Additional Resources: Metaverse](https://en.wikipedia.org/wiki/Snow_Crash)
[Additional Resources: Essay: Imperfect VR](https://straeubig.medium.com/the-spaces-we-create-the-spaces-we-inhabit-d2e79563758e)  
[Additional Resources: Essay: Raph Koster on the Metaverse](https://www.raphkoster.com/2021/09/02/online-world-or-metaverse/)  
[Additional Resources: Hic et Nunc history](https://github.com/i3games/hen-timeline/blob/main/timeline.md)  
[Additional Resources: Tezos](https://tezos.com/)  
[Additional Resources: Blockchain energy efficiency](https://arxiv.org/abs/2109.03667)    
[Additional Resources: WebXR](https://www.w3.org/TR/webxr/)

### 1. Preparation and Setup

[Chrome](https://www.google.com/chrome/)  
[Visual Studio Code](https://code.visualstudio.com/)  
[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)  
[npm / node.js](https://nodejs.org/en/)  
[Temple Wallet](https://templewallet.com/)

### 2. Create a minimal VR Scene with A-Frame

[A-Frame](https://aframe.io/)
[A-Frame Introduction](https://aframe.io/docs/1.2.0/introduction/)

[Additional Resources: Google Cardboard]([https://arvr.google.com/cardboard/)  
[Additional Resources: Learn HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML)

## 3. Display an NFT and link to its page on HEN

["1337 h4x0r" NFT on Hic et Nunc](https://www.hicetnunc.xyz/objkt/181212)

[Additional Resources: IPFS](https://ipfs.io/)  
[Additional Resources: A-Frame Interactions and Controllers](https://aframe.io/docs/1.2.0/introduction/interactions-and-controllers.html)  
[Additional Resources: A-Frame Entity-Component System](https://aframe.io/docs/1.2.0/introduction/entity-component-system.html)  
[Additional Resources: Write a Component](https://aframe.io/docs/1.2.0/introduction/writing-a-component.html)  
[Additional Resources: Component Details](https://aframe.io/docs/1.2.0/core/component.html)  
[Additional Resources: Learn JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)

## 4. Install the Taquito framework and the Parcel development tool

We install these frameworks via `npm`; the links below are for reference.

[Parcel](https://parceljs.org/)  
[Parcel v2 documentation](https://v2.parceljs.org/getting-started/webapp/)

[Additional Resources: TypeScript](https://www.typescriptlang.org/)
[Additional Resources: npm](https://docs.npmjs.com/cli/v7/commands/npm)

## 5. Enter a Tezos address

[tzkt.io](https://tzkt.io/)  

[Additional Resources: A-Frame embedded scene](https://aframe.io/docs/1.2.0/components/embedded.html)
[Additional Resources: Learn CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS)

## 6. Get blockchain data with Taquito

[Taquito](https://tezostaquito.io/)

## 7. Putting everything together: get the wallet balance  

[Additional Resources: HEN dev Resources](https://github.com/i3games/hen-dev-resources/blob/main/list.md)
