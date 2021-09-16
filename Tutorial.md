# The Hic et Nunc Metaverse Tutorial Series

**WORK IN PROGRESS - NOT COMPLETE YET**

Hi and welcome to this brand new series of tutorials. 

The **Metaverse** is a term that currently pops up everywhere. Some see it as a decentralized futuristic space linking Virtual / Augmented Realities and blockchains. Others claim that they are already buildig it (in which case there would be more than one Metaverse, and we probably would need a Meta-Meta-verse). And still others note that the origin of the concept is a [quite dystopic one](https://en.wikipedia.org/wiki/Metaverse) and therefore should be avoided. 

I use the term to describe a future web 3.0, imagine a decentralized VR / AR / NFT / smart contract / data layer built on the open web. The last point is crucial and therefore we will use [WebXR](https://www.w3.org/TR/webxr/)) throughout in these tutorials.

**Hic et Nunc** (HEN) is one of the fastest growing NFT platforms and at the same time a place for a diverse community of artists and collectors. HEN is [open source](https://github.com/hicetnunc2000/) and lives on [Tezos](https://tezos.com/), a "green" / [energy efficient](https://arxiv.org/abs/2109.03667) blockchain. You can read about the history of Hic et Nunc [here](https://github.com/i3games/hen-timeline/blob/main/timeline.md).

So we start with the tiny little atom of a Metaverse, possibly, and watch it grow in size and capacity. The main goal is to learn about and experiment with WebXR and green NFTs.

This is the roadmap:

**Tutorial 1: Setup, Virtual World, Data**.   
The tutorial you are reading right now is the first part of the series. Init, we set up our tools, create a tiny virtual world and interact with a blockchain service to display the balance of a Tezos address. 

**Tutorial 2: Wallets and Transactions**.     
In part 2 of the series we are going to buy a NFT from our virtual world by calling a smart contract. We will lern how to to iteract with a wallet which is to cofirmthe transaction

**Tutorial 3: Writing a Smart Contract for Interaction**.   
In part 3 we finally write our own smart contract in order to facilitate collector to collector interaction in Virtual Reality.

**Tutorial 4: ???**    
Like a certain movie franchise, part 4 is unknown yet but it might bring joy and resolution to the series. I recently was able to play with [Neural Cellular Automata](https://distill.pub/2020/growing-ca/), so maybe we can go in this direction. But first things first.

## Prerequisites

The tutorials assume that you know how to install software, create files and folders, use a code editor and run commands from a terminal (also called "command line" or "shell"). Experience in HTML, CSS and JavaScript (tutorial 1 and 2) and in Python (tutorial 3) are a plus, but not required. We will start from scratch and work all the way through towards blockchain programming. Therefore each individual part must cover a lot of ground. To pull this off, I keep implementation and tooling to a absolut minimum and rather provide pointers for those who want explore specific topics further. 

My goal is that everyone is able to follow. If something is still unclear or if you spot a mistake, please leave a bug report on the Github repository. Thereby you can help improve the tutorials for yourself and for others. 

Let's go. 
 
## 1. Preparation and Setup

You need the following set of tools to follow the first tutorial:  

1. A laptop or PC with an up to date web browser such as Chrome (recommended for VR) or Firefox.
2. A code editor. I use Visual Studio Code (VS Code).
3. A terminal (also called "command line" or "shell"). VS Code has a terminal built in `(Terminal -> New Terminal)`. 
3. A local web server. VS Code has an extension called "Live Server", which comes handy. Extensions are installed from the Extension panel `(View -> Extensions)` by entering their name in the search field and following the instructions. 
4. npm, the node.js package manager. 

These are the tools we will be using during this course. If you are just getting started, follow the links at the end of the article to install them. If you are advanced, feel free to use your favourite editor / server / package manager instead. 

5. I recommend for this tutorial to have your own Tezos wallet, and in the second tutorial you need one. I use the Temple wallet with Chrome. You also need a small amount of Tez (probably less than 1 Tez overall) in order to buy an NFT in tutorial 2 and for the interactions in tutorial 3.    
6. In tutorial 3 we will use SmartPy to write a smart contract. To test the contract you will need two Tezos addresses which both own an NFT on Hic et Nunc.

## 2. Create a minimal VR Scene with A-Frame  

Let's visit the A-Frame website and take the code from their [introduction tutorial](https://aframe.io/docs/1.2.0/introduction/):

```javascript
<html>
  <head>
    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
      <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
      <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene>
  </body>
</html>
```

Copy and paste this code into a file and save it as `index.html`. Now click on "Go Live" in the bottom bar in VS Code to start Live Server. Your web browser should pop up. Now you get a warning, because we are using `http:` instead of a secure connection over `https:`, which is ok for local development. Maybe you have to search a bit in the message that is displyed, but your browser will let you chose to display the page and you will see this:

![Initial Scene](assets/initial_scene.jpg)
 
This is our VR world. Impressed? Note the little VR button in the lower right corner. You can open this page in your favourite VR glasses or in your smartphone with a (cardboard VR viewer)[https://arvr.google.com/cardboard/], tap this button and you will be ... in the scene. 

Aside from the [Magic of VR](https://straeubig.medium.com/the-spaces-we-create-the-spaces-we-inhabit-d2e79563758e), this is a web page. The part between `<a-scene>` and `</a-scene>` describes the objects that you can see in the scene.  

For example, `<a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>` means: there is a box in the scene at position -1, 0.5, -3, rotated by 45 degrees with [this particular color](https://www.google.com/search?q=%234CC3D9). 

If you want you can study the other objects in the scene, change some of their parameters then save the scene to see what happens. If you run into errors, try to figure out what went wrong. When you are done, copy the original code from the A-Frame website again.  

## 3. Enter a wallet address 

A Tezos public wallet adress looks like this: "tz1imNpo5WeCoE5cziWsdpiaThT8YgvbTtJ9". You can view the artist page for this address on [Hic et Nunc](https://www.hicetnunc.xyz/tz1imNpo5WeCoE5cziWsdpiaThT8YgvbTtJ9/creations) to see that it is mikrosil, an illustrator. a Note that all transactions and balances for all adresses on the blockchain are public so we can look at the current balance with a blockchain explorer like [tzkt.io](https://tzkt.io/tz1imNpo5WeCoE5cziWsdpiaThT8YgvbTtJ9/operations/). 

Inside the 3D scene it would not be fun to enter a long string of characters like this, therefore we will add use a standard form field on top of the scene.

## 4. Install the Taquito frameworks and Parcel, a development tool

Before we can continue, we must get some libraries and frameworks. One is [Taquito](https://tezostaquito.io/), that will provide us with functions to talk to the blockchain data provider. The other one is [Parcel](https://parceljs.org/) that will build the final web app for us. To install these two, we will use `npm`.

In a terminal window, type `npm init --yes` and press Return. Make sure you are in the same folder where index.html is A file named `package.json` appears. It holds information about the project and the frameworks we use. You can study the file, but 

Type `npm install parcel` and press Return. You will see activity in the terminal and a folder named `node_modules` appears.

Type `npm install taquito` and press Return.

Make sure to wait between each step until it completes. `npm` will pull stuff from the web, therefore make sure you have a stable internet connection. 

## 5. Get blockchain data with Taquito

(tbd.)


## 6. Putting everything together: build the app, get the wallet balance

(tbd.)


## Next: Wallets and Transactions

That's it. In the next tutorial we go a step further. We will use Taquito again to interact directly with a wallet, call Hic et Nuc's smart contract to buy an NFT. 

I will iupdate this page with the link. 

See you.

## Links

### Introduction

[Imperfect VR](https://straeubig.medium.com/the-spaces-we-create-the-spaces-we-inhabit-d2e79563758e).   
[Raph Koster on the Metaverse](https://www.raphkoster.com/2021/09/02/online-world-or-metaverse/).   
[Hic et Nunc](https://www.hicetnunc.xyz/).   

### 1. Preparation and Setup

[Chrome](https://www.google.com/chrome/).   
[Visual Studio Code](https://code.visualstudio.com/).   
[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).  
[node.js/npm](https://nodejs.org/en/).   

[Temple Wallet](https://templewallet.com/).   

### 2. Create a minimal VR Scene with A-Frame  

[A-Frame](https://aframe.io/)
[A-Frame Introduction](https://aframe.io/docs/1.2.0/introduction/)

## 3. Enter a wallet address 


## 4. Install the Taquito frameworks and Parcel, a development tool

We install these frameworks via `npm`, these links are for reference.

[Parcel](https://parceljs.org/)    
[Taquito](https://tezostaquito.io/)    


## 5. Get blockchain data with Taquito


## 6. Putting everything together: get the balance of a wallet

