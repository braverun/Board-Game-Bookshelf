define("bgb/adapters/game",["exports","ic-ajax","ember"],function(e,t,a){"use strict";e["default"]=a["default"].Object.extend({find:function(e,a){return t["default"]("https://api.parse.com/1/classes/Game/"+a).then(function(e){return e.id=e.objectId,delete e.objectId,e})},findAll:function(){return t["default"]("https://api.parse.com/1/classes/Game").then(function(e){return e.results.map(function(e){return e.id=e.objectId,delete e.objectId,e})})},findQuery:function(e,n){return t["default"]("https://api.parse.com/1/classes/Game",{data:a["default"].$.param({where:JSON.stringify(n)})}).then(function(e){return e.results.map(function(e){return e.id=e.objectId,delete e.objectId,e})})},destroy:function(e,a){return t["default"]({url:"https://api.parse.com/1/classes/Game/"+a.id,type:"DELETE"})},save:function(e,a){return a.id?t["default"]({url:"https://api.parse.com/1/classes/Game/"+a.id,type:"PUT",data:JSON.stringify(a.toJSON())}).then(function(e){return a.updatedAt=e.updatedAt,a}):t["default"]({url:"https://api.parse.com/1/classes/Game",type:"POST",data:JSON.stringify(a.toJSON())}).then(function(e){return a.id=e.objectId,a.createdAt=e.createdAt,a})}})}),define("bgb/app",["exports","ember","ember/resolver","ember/load-initializers","bgb/config/environment"],function(e,t,a,n,r){"use strict";t["default"].MODEL_FACTORY_INJECTIONS=!0;var d=t["default"].Application.extend({modulePrefix:r["default"].modulePrefix,podModulePrefix:r["default"].podModulePrefix,Resolver:a["default"]});n["default"](d,r["default"].modulePrefix),e["default"]=d}),define("bgb/controllers/add-games",["exports","ember","ic-ajax"],function(e,t,a){"use strict";e["default"]=t["default"].Controller.extend({searching:!1,actions:{search:function(){var e=this.get("searchBar");this.findQuery(e),this.set("searching",!0)}},findQuery:function(e){var t="https://board-game-bookshelf.herokuapp.com/search/",n=t+e,r=this;return a["default"](n).then(function(e){var t=e.map(function(e){return e.bggId=e.id,delete e.id,e});r.set("searchResults",t).then(r.set("searching",!1))})}})}),define("bgb/controllers/game-details",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller.extend({isEditing:!1,actions:{destroy:function(){this.get("model").destroy().then(function(){this.transitionToRoute("index")}.bind(this))},edit:function(){this.set("isEditing",!0)},save:function(){this.get("model").save(),this.set("isEditing",!1)}}})}),define("bgb/controllers/game",["exports","ember","ic-ajax"],function(e,t,a){"use strict";e["default"]=t["default"].Controller.extend({isAdded:!1,actions:{addGame:function(){var e=this.get("model");return console.log(e),this.set("isAdded",!0),a["default"]({url:"https://api.parse.com/1/classes/Game/",type:"POST",data:JSON.stringify(e)})}}})}),define("bgb/controllers/index",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller.extend({sortBy:"nameString",sortedGames:function(){var e=this.get("sortBy");return this.get("model").sortBy(e)}.property("model.@each","sortBy")})}),define("bgb/helpers/fa-icon",["exports","ember"],function(e,t){"use strict";var a=/^fa\-.+/,n=t["default"].Logger.warn,r=function(e,r){if("string"!==t["default"].typeOf(e)){var d="fa-icon: no icon specified";return n(d),t["default"].String.htmlSafe(d)}var i=r.hash,c=[],s="";c.push("fa"),e.match(a)||(e="fa-"+e),c.push(e),i.spin&&c.push("fa-spin"),i.flip&&c.push("fa-flip-"+i.flip),i.rotate&&c.push("fa-rotate-"+i.rotate),i.lg&&(n("fa-icon: the 'lg' parameter is deprecated. Use 'size' instead. I.e. {{fa-icon size=\"lg\"}}"),c.push("fa-lg")),i.x&&(n("fa-icon: the 'x' parameter is deprecated. Use 'size' instead. I.e. {{fa-icon size=\""+i.x+'"}}'),c.push("fa-"+i.x+"x")),i.size&&("string"===t["default"].typeOf(i.size)&&i.size.match(/\d+/)&&(i.size=Number(i.size)),c.push("number"===t["default"].typeOf(i.size)?"fa-"+i.size+"x":"fa-"+i.size)),i.fixedWidth&&c.push("fa-fw"),i.listItem&&c.push("fa-li"),i.pull&&c.push("pull-"+i.pull),i.border&&c.push("fa-border"),i.classNames&&!t["default"].isArray(i.classNames)&&(i.classNames=[i.classNames]),t["default"].isEmpty(i.classNames)||Array.prototype.push.apply(c,i.classNames),s+="<";var l=i.tagName||"i";return s+=l,s+=" class='"+c.join(" ")+"'",i.title&&(s+=" title='"+i.title+"'"),(void 0===i.ariaHidden||i.ariaHidden)&&(s+=' aria-hidden="true"'),s+="></"+l+">",t["default"].String.htmlSafe(s)};e["default"]=t["default"].Handlebars.makeBoundHelper(r),e.faIcon=r}),define("bgb/initializers/app-version",["exports","bgb/config/environment","ember"],function(e,t,a){"use strict";var n=a["default"].String.classify;e["default"]={name:"App Version",initialize:function(e,r){var d=n(r.toString());a["default"].libraries.register(d,t["default"].APP.version)}}}),define("bgb/initializers/ember-magic-man",["exports","ember-magic-man/store"],function(e,t){"use strict";function a(e,a){a.register("store:main",t["default"]),a.inject("route","store","store:main"),a.inject("controller","store","store:main"),a.inject("model","store","store:main")}e.initialize=a,e["default"]={name:"ember-magic-man",initialize:a}}),define("bgb/initializers/export-application-global",["exports","ember","bgb/config/environment"],function(e,t,a){"use strict";function n(e,n){var r=t["default"].String.classify(a["default"].modulePrefix);a["default"].exportApplicationGlobal&&!window[r]&&(window[r]=n)}e.initialize=n,e["default"]={name:"export-application-global",initialize:n}}),define("bgb/initializers/parse-tokens",["exports","ember"],function(e,t){"use strict";function a(){t["default"].$.ajaxSetup({headers:{"X-Parse-Application-Id":"D79LREfrKhwYb7VQZkivDUqymZKDCYWwzxGMKWzQ","X-Parse-REST-API-Key":"QXmLRZJdjwEMeaWgeS2VFWLVq8hDVgekS8ynssAv"}})}e.initialize=a,e["default"]={name:"parse-tokens",initialize:a}}),define("bgb/models/game",["exports","ember","ember-magic-man/model"],function(e,t,a){"use strict";e["default"]=a["default"].extend({nameString:t["default"].computed.alias("name.0.value")})}),define("bgb/router",["exports","ember","bgb/config/environment"],function(e,t,a){"use strict";var n=t["default"].Router.extend({location:a["default"].locationType});n.map(function(){this.route("add-games"),this.route("game-details",{path:"/game/:game_id"})}),e["default"]=n}),define("bgb/routes/add-games",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({})}),define("bgb/routes/game-details",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(e){return this.store.find("game",e.game_id)}})}),define("bgb/routes/index",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(){return this.store.findAll("game")}})}),define("bgb/templates/add-games",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("        ");e.appendChild(t,a);var a=e.createElement("p");e.setAttribute(a,"class","searching-text");var n=e.createTextNode("Searching... This may take a minute.");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode(" ");e.appendChild(t,a);var a=e.createElement("img");e.setAttribute(a,"src","assets/images/ajax-loader-9bbac2a3169e8c37d30a4bc90a65d1bd.gif"),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom;n.detectNamespace(a);var r;return t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(r=this.build(n),this.hasRendered?this.cachedFragment=r:this.hasRendered=!0),this.cachedFragment&&(r=n.cloneNode(this.cachedFragment,!0))):r=this.build(n),r}}}(),t=function(){return{isHTMLBars:!0,blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createTextNode("\n");return t},render:function(e,t,a){var n=t.dom;n.detectNamespace(a);var r;return t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(r=this.build(n),this.hasRendered?this.cachedFragment=r:this.hasRendered=!0),this.cachedFragment&&(r=n.cloneNode(this.cachedFragment,!0))):r=this.build(n),r}}}(),a=function(){var e=function(){return{isHTMLBars:!0,blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("            ");e.appendChild(t,a);var a=e.createElement("p");e.setAttribute(a,"class","added");var n=e.createTextNode("added");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom;n.detectNamespace(a);var r;return t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(r=this.build(n),this.hasRendered?this.cachedFragment=r:this.hasRendered=!0),this.cachedFragment&&(r=n.cloneNode(this.cachedFragment,!0))):r=this.build(n),r}}}(),t=function(){return{isHTMLBars:!0,blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("            ");e.appendChild(t,a);var a=e.createElement("button");e.setAttribute(a,"class","add-game-button");var n=e.createTextNode("add game");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom,r=t.hooks,d=r.element;n.detectNamespace(a);var i;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(i=this.build(n),this.hasRendered?this.cachedFragment=i:this.hasRendered=!0),this.cachedFragment&&(i=n.cloneNode(this.cachedFragment,!0))):i=this.build(n);var c=n.childAt(i,[1]);return d(t,c,e,"action",["addGame"],{on:"click"}),i}}}();return{isHTMLBars:!0,blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("        ");e.appendChild(t,a);var a=e.createElement("li");e.setAttribute(a,"class","result");var n=e.createTextNode("\n\n          ");e.appendChild(a,n);var n=e.createElement("img");e.setAttribute(n,"class","result-image"),e.appendChild(a,n);var n=e.createTextNode("\n\n          ");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","result-text");var r=e.createTextNode("\n            ");e.appendChild(n,r);var r=e.createElement("h3");e.setAttribute(r,"class","result-title"),e.appendChild(n,r);var r=e.createTextNode("\n            ");e.appendChild(n,r);var r=e.createElement("p");e.setAttribute(r,"class","result-description"),e.appendChild(n,r);var r=e.createTextNode("\n          ");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n\n");e.appendChild(a,n);var n=e.createTextNode("\n          ");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(a,n,r){var d=n.dom,i=n.hooks,c=i.get,s=i.element,l=i.content,o=i.block;d.detectNamespace(r);var h;n.useFragmentCache&&d.canClone?(null===this.cachedFragment&&(h=this.build(d),this.hasRendered?this.cachedFragment=h:this.hasRendered=!0),this.cachedFragment&&(h=d.cloneNode(this.cachedFragment,!0))):h=this.build(d);var u=d.childAt(h,[1]),p=d.childAt(u,[1]),m=d.childAt(u,[3]),f=d.createMorphAt(d.childAt(m,[1]),-1,-1),g=d.createUnsafeMorphAt(d.childAt(m,[3]),-1,-1),v=d.createMorphAt(u,4,5);return s(n,p,a,"bind-attr",[],{src:c(n,a,"game.model.thumbnail.0")}),l(n,f,a,"game.model.name.0.value"),l(n,g,a,"game.model.description.0"),o(n,v,a,"if",[c(n,a,"game.isAdded")],{},e,t),h}}}();return{isHTMLBars:!0,blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createElement("div");e.setAttribute(a,"class","main-content");var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("h2");e.setAttribute(n,"class","content-heading");var r=e.createTextNode("Add Games");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n\n    ");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","search-container");var r=e.createTextNode("\n      ");e.appendChild(n,r);var r=e.createElement("form");e.setAttribute(r,"method","post");var d=e.createTextNode("\n        ");e.appendChild(r,d);var d=e.createElement("button");e.setAttribute(d,"class","fa fa-search search-button"),e.appendChild(r,d);var d=e.createTextNode("\n        ");e.appendChild(r,d);var d=e.createTextNode("\n      ");e.appendChild(r,d),e.appendChild(n,r);var r=e.createTextNode("\n\n");e.appendChild(n,r);var r=e.createTextNode("    ");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n\n      ");e.appendChild(a,n);var n=e.createElement("ul");e.setAttribute(n,"class","results");var r=e.createTextNode("\n\n");e.appendChild(n,r);var r=e.createTextNode("\n      ");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n\n  ");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n\n\n");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(n,r,d){var i=r.dom,c=r.hooks,s=c.element,l=c.get,o=c.inline,h=c.block,u=c.content;i.detectNamespace(d);var p;r.useFragmentCache&&i.canClone?(null===this.cachedFragment&&(p=this.build(i),this.hasRendered?this.cachedFragment=p:this.hasRendered=!0),this.cachedFragment&&(p=i.cloneNode(this.cachedFragment,!0))):p=this.build(i);var m=i.childAt(p,[0]),f=i.childAt(m,[3]),g=i.childAt(f,[1]),v=i.createMorphAt(g,2,3),b=i.createMorphAt(f,2,3),C=i.createMorphAt(i.childAt(m,[5]),0,1),x=i.createMorphAt(p,1,2,d);return s(r,g,n,"action",["search"],{on:"submit"}),o(r,v,n,"input",[],{"class":"fa search-bar",value:l(r,n,"searchBar"),placeholder:"Search games"}),h(r,b,n,"if",[l(r,n,"searching")],{},e,t),h(r,C,n,"each",[l(r,n,"searchResults")],{itemController:"game",keyword:"game"},a,null),u(r,x,n,"outlet"),p}}}())}),define("bgb/templates/application",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createTextNode("My Bookshelf");return t},render:function(e,t,a){var n=t.dom;n.detectNamespace(a);var r;return t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(r=this.build(n),this.hasRendered?this.cachedFragment=r:this.hasRendered=!0),this.cachedFragment&&(r=n.cloneNode(this.cachedFragment,!0))):r=this.build(n),r}}}(),t=function(){return{isHTMLBars:!0,blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createTextNode("Add Games");return t},render:function(e,t,a){var n=t.dom;n.detectNamespace(a);var r;return t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(r=this.build(n),this.hasRendered?this.cachedFragment=r:this.hasRendered=!0),this.cachedFragment&&(r=n.cloneNode(this.cachedFragment,!0))):r=this.build(n),r}}}();return{isHTMLBars:!0,blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createElement("header"),n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("img");e.setAttribute(n,"class","logo"),e.setAttribute(n,"src","assets/images/meeple-white-39e3f82f54359e54302fe6a1efb7763c.png"),e.appendChild(a,n);var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("h1");e.setAttribute(n,"class","app-title");var r=e.createTextNode("Board Game Bookshelf");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","top-nav");var r=e.createTextNode("\n      ");e.appendChild(n,r);var r=e.createComment(' <span class="user-name">Welcome!</span> ');e.appendChild(n,r);var r=e.createTextNode("\n      ");e.appendChild(n,r);var r=e.createComment(' <i class="fa fa-cog settings-icon"></i> ');e.appendChild(n,r);var r=e.createTextNode("\n      ");e.appendChild(n,r);var r=e.createComment(' <a href="logged-out.html" class="log-out">Log Out</a> ');e.appendChild(n,r);var r=e.createTextNode("\n    ");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n  ");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n\n  ");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","left-nav");var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("ul");e.setAttribute(n,"class","left-nav-ul");var r=e.createTextNode("\n      ");e.appendChild(n,r);var r=e.createElement("li");e.setAttribute(r,"class","left-nav-link"),e.appendChild(n,r);var r=e.createTextNode("\n      ");e.appendChild(n,r);var r=e.createElement("li");e.setAttribute(r,"class","left-nav-link"),e.appendChild(n,r);var r=e.createTextNode("\n    ");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n  ");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(a,n,r){var d=n.dom,i=n.hooks,c=i.block,s=i.content;d.detectNamespace(r);var l;n.useFragmentCache&&d.canClone?(null===this.cachedFragment&&(l=this.build(d),this.hasRendered?this.cachedFragment=l:this.hasRendered=!0),this.cachedFragment&&(l=d.cloneNode(this.cachedFragment,!0))):l=this.build(d);var o=d.childAt(l,[2,1]),h=d.createMorphAt(d.childAt(o,[1]),-1,-1),u=d.createMorphAt(d.childAt(o,[3]),-1,-1),p=d.createMorphAt(l,3,4,r);return c(n,h,a,"link-to",["index"],{},e,null),c(n,u,a,"link-to",["add-games"],{},t,null),s(n,p,a,"outlet"),l}}}())}),define("bgb/templates/game-details",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("          ");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom,r=t.hooks,d=r.get,i=r.inline;n.detectNamespace(a);var c;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(c=this.build(n),this.hasRendered?this.cachedFragment=c:this.hasRendered=!0),this.cachedFragment&&(c=n.cloneNode(this.cachedFragment,!0))):c=this.build(n);var s=n.createMorphAt(c,0,1,a);return i(t,s,e,"textarea",[],{placeholder:"Notes","class":"user-notes js-user-notes",value:d(t,e,"model.userNotes")}),c}}}(),t=function(){return{isHTMLBars:!0,blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("          ");e.appendChild(t,a);var a=e.createElement("p");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom,r=t.hooks,d=r.content;n.detectNamespace(a);var i;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(i=this.build(n),this.hasRendered?this.cachedFragment=i:this.hasRendered=!0),this.cachedFragment&&(i=n.cloneNode(this.cachedFragment,!0))):i=this.build(n);var c=n.createMorphAt(n.childAt(i,[1]),-1,-1);return d(t,c,e,"model.userNotes"),i}}}();return{isHTMLBars:!0,blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("  ");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","main-content");var n=e.createTextNode("\n\n\n    ");e.appendChild(a,n);var n=e.createElement("h2");e.setAttribute(n,"class","content-heading"),e.appendChild(a,n);var n=e.createTextNode("\n\n    ");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","game-details-container");var r=e.createTextNode("\n\n      ");e.appendChild(n,r);var r=e.createElement("div");e.setAttribute(r,"class","game-details-left");var d=e.createTextNode("\n        ");e.appendChild(r,d);var d=e.createElement("img");e.setAttribute(d,"class","game-details-image"),e.appendChild(r,d);var d=e.createTextNode("\n        ");e.appendChild(r,d);var d=e.createElement("button");e.setAttribute(d,"class","remove-game");var i=e.createTextNode("remove from bookshelf");e.appendChild(d,i),e.appendChild(r,d);var d=e.createTextNode("\n      ");e.appendChild(r,d),e.appendChild(n,r);var r=e.createTextNode("\n\n      ");e.appendChild(n,r);var r=e.createElement("div");e.setAttribute(r,"class","game-info");var d=e.createTextNode("\n        ");e.appendChild(r,d);var d=e.createElement("span");e.setAttribute(d,"class","player-count");var i=e.createTextNode("Players: ");e.appendChild(d,i);var i=e.createTextNode(" - ");e.appendChild(d,i),e.appendChild(r,d);var d=e.createTextNode("\n        ");e.appendChild(r,d);var d=e.createElement("br");e.appendChild(r,d);var d=e.createTextNode("\n        ");e.appendChild(r,d);var d=e.createElement("span");e.setAttribute(d,"class","play-time");var i=e.createTextNode("Play time: ");e.appendChild(d,i);var i=e.createTextNode("min");e.appendChild(d,i),e.appendChild(r,d);var d=e.createTextNode("\n        ");e.appendChild(r,d);var d=e.createElement("h4"),i=e.createTextNode("Description:");e.appendChild(d,i),e.appendChild(r,d);var d=e.createTextNode("\n        ");e.appendChild(r,d);var d=e.createElement("p");e.setAttribute(d,"class","game-description"),e.appendChild(r,d);var d=e.createTextNode("\n        ");e.appendChild(r,d);var d=e.createElement("h4"),i=e.createTextNode("My Notes:");e.appendChild(d,i),e.appendChild(r,d);var d=e.createTextNode("\n\n");e.appendChild(r,d);var d=e.createTextNode("\n        ");e.appendChild(r,d);var d=e.createElement("button");e.setAttribute(d,"class","edit-notes notes-buttons");var i=e.createTextNode("edit notes");e.appendChild(d,i),e.appendChild(r,d);var d=e.createTextNode("\n        ");e.appendChild(r,d);var d=e.createElement("button");e.setAttribute(d,"class","save-notes notes-buttons");var i=e.createTextNode("save");e.appendChild(d,i),e.appendChild(r,d);var d=e.createTextNode("\n      ");e.appendChild(r,d),e.appendChild(n,r);var r=e.createTextNode("\n\n    ");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n\n\n  ");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n\n\n\n\n\n");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(a,n,r){var d=n.dom,i=n.hooks,c=i.content,s=i.get,l=i.element,o=i.block;d.detectNamespace(r);var h;n.useFragmentCache&&d.canClone?(null===this.cachedFragment&&(h=this.build(d),this.hasRendered?this.cachedFragment=h:this.hasRendered=!0),this.cachedFragment&&(h=d.cloneNode(this.cachedFragment,!0))):h=this.build(d);var u=d.childAt(h,[1]),p=d.childAt(u,[3]),m=d.childAt(p,[1]),f=d.childAt(m,[1]),g=d.childAt(m,[3]),v=d.childAt(p,[3]),b=d.childAt(v,[1]),C=d.childAt(v,[14]),x=d.childAt(v,[16]),N=d.createMorphAt(d.childAt(u,[1]),-1,-1),T=d.createMorphAt(b,0,1),A=d.createMorphAt(b,1,-1),F=d.createMorphAt(d.childAt(v,[5]),0,1),E=d.createUnsafeMorphAt(d.childAt(v,[9]),-1,-1),R=d.createMorphAt(v,12,13),k=d.createMorphAt(h,2,3,r);return c(n,N,a,"model.name.0.value"),l(n,f,a,"bind-attr",[],{src:s(n,a,"model.image.0")}),l(n,g,a,"action",["destroy"],{on:"click"}),c(n,T,a,"model.minplayers.0.value"),c(n,A,a,"model.maxplayers.0.value"),c(n,F,a,"model.playingtime.0.value"),c(n,E,a,"model.description.0"),o(n,R,a,"if",[s(n,a,"isEditing")],{},e,t),l(n,C,a,"action",["edit"],{on:"click"}),l(n,x,a,"action",["save"],{on:"click"}),c(n,k,a,"outlet"),h}}}())}),define("bgb/templates/index",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){var e=function(){return{isHTMLBars:!0,blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("\n       ");e.appendChild(t,a);var a=e.createElement("img");e.setAttribute(a,"class","game-image"),e.appendChild(t,a);var a=e.createTextNode("\n\n       ");e.appendChild(t,a);var a=e.createElement("h3");e.setAttribute(a,"class","game-title"),e.appendChild(t,a);var a=e.createTextNode("\n\n");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom,r=t.hooks,d=r.get,i=r.element,c=r.content;n.detectNamespace(a);var s;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(s=this.build(n),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=n.cloneNode(this.cachedFragment,!0))):s=this.build(n);var l=n.childAt(s,[1]),o=n.createMorphAt(n.childAt(s,[3]),-1,-1);return i(t,l,e,"bind-attr",[],{src:d(t,e,"game.image.0")}),c(t,o,e,"game.nameString"),s}}}();return{isHTMLBars:!0,blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(t,a,n){var r=a.dom,d=a.hooks,i=d.get,c=d.block;r.detectNamespace(n);var s;a.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(s=this.build(r),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=r.cloneNode(this.cachedFragment,!0))):s=this.build(r);var l=r.createMorphAt(s,0,1,n);return c(a,l,t,"link-to",["game-details",i(a,t,"game")],{"class":"game"},e,null),s}}}();return{isHTMLBars:!0,blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createElement("div");e.setAttribute(a,"class","main-content");var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("h2");e.setAttribute(n,"class","content-heading");var r=e.createTextNode("My Bookshelf");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","games");var r=e.createTextNode("\n\n");e.appendChild(n,r);var r=e.createTextNode("\n    ");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n  ");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(t,a,n){var r=a.dom,d=a.hooks,i=d.get,c=d.block,s=d.content;r.detectNamespace(n);var l;a.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(l=this.build(r),this.hasRendered?this.cachedFragment=l:this.hasRendered=!0),this.cachedFragment&&(l=r.cloneNode(this.cachedFragment,!0))):l=this.build(r);var o=r.createMorphAt(r.childAt(l,[0,3]),0,1),h=r.createMorphAt(l,1,2,n);return c(a,o,t,"each",[i(a,t,"sortedGames")],{keyword:"game"},e,null),s(a,h,t,"outlet"),l}}}())}),define("bgb/config/environment",["ember"],function(e){var t="bgb";try{var a=t+"/config/environment",n=e["default"].$('meta[name="'+a+'"]').attr("content"),r=JSON.parse(unescape(n));return{"default":r}}catch(d){throw new Error('Could not read config from meta tag with name "'+a+'".')}}),runningTests?require("bgb/tests/test-helper"):require("bgb/app")["default"].create({name:"bgb",version:"0.0.0.93938bc9"});