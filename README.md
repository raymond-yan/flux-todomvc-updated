##简介
<br>
***<font color="red">Github: https://github.com/raymond-yan/flux-todomvc-updated</font>***
<br>
*[React](https://facebook.github.io/react/)* 是2014年 facebook 开放的一个javascript lib，负责管理 MVC 中的 View。 使用 React 写的 View，当View上的资料发生变动时， React 会生成一个 virtual DOM 和当前的 DOM 比较，当DOM不一样时才替换掉。这样对于频繁更换 资料 的Web app 来讲，是非常实用的一个功能。
<br>
*[Flux](https://facebook.github.io/flux/)* 是一个开发模式，类似于MVC，也是 facebook 提出与react 共同实用的模式。详细可以参看官方的介绍。
<br>
在学习的过程中，发现很难找到一个完整的开发套件来实做FLUX+React。 因 Flux 将模组分为很多块，需要用 `node.js` 的语法将每一个模块`export`出来，然后在使用到的地方用 `require()` 来引用。那么为了方便这种模式的开发与编译，本人参考了 facebook 官方flux上的例子：*[flux-todomvc](https://github.com/facebook/flux/tree/master/examples/flux-todomvc)*，修改并生成一个方便新手入门 React+Flux 的模组。

##来源
基本这个project都是根据 [flux-todomvc](https://github.com/facebook/flux/tree/master/examples/flux-todomvc)来生成的，只是更改了 package.json 以及添加了 gulpfile.js 文件。**所以要理解React+flux的理念并以此开发自己的project，请务必参考 [flux-todomvc](https://github.com/facebook/flux/tree/master/examples/flux-todomvc) 的文档**。 其中主要的变动有：

 1. 修改 `package.json`, 将 react 由原来的 0.12.0 更新到最新版 15.1.0， 并且修改了 `app.js` 适应新的语法。
 2. 增加 `gulp` 功能方便编译，将 `../app/` 下的 html, img, css 和 js 文件编译到 `../build/` 文件夹下，方便测试以及最终使用。 原本 flux-todomvc 编译的结果夹杂在整个文件夹中，不方便测试以及最终出版。

##使用方法
 1. 安装：<br>
    <font color="red">`npm install`</font>
 2. 启动: <br>
    <font color="red">`npm run start`</font>
 3. 最终build（ 使用 *[gulp-uglify](https://www.npmjs.com/package/gulp-uglify)* 是编译出的js文件体积变小):<br>
    <font color="red">`npm run build`</font>

在开发的时候，使用 `npm run start` 即可， gulp 会实时根据用户修改的源码(任何`app`目录下的文件修改)来重新编译出新的版本。

##优势
运行启动或者编译后，编译的文件会在 `./build` 文件夹下。使用者可以很方便在 `./app` 目录下按照 react+flux 规则来编写自己的 web app, 在 `npm run start` 后， `gulp` 会自动根据 `./app` 目录更改的文件自动重新编译到 `./build` 文件夹, 这是使用 gulp watch 的优势。

##参考资料
* [flux-todomvc](https://github.com/facebook/flux/tree/master/examples/flux-todomvc)*: 本文主要的code来源，关于`../app/js/` 中的React+flux code的解释以及结构请参考这个 github 的README。
* [react-meetup-1](https://github.com/coodoo/react-meetup-1): gulp文件的编写主要参考了这个project。这个project也是一个可以单独运行的 React+flux入门模块，推荐可以参考使用这个。
